import path from 'path';
import fs from 'fs/promises';
import * as vueCompiler from 'vue/compiler-sfc';
import { Project } from 'ts-morph';
import glob from 'fast-glob';
import { bold } from 'chalk';

import { errorAndExit, green, yellow } from '../../utils';
import {
  buildOutput,
  epRoot,
  pkgRoot,
  findWorkspaceRoot,
  FE_PKG,
  OUTPUT_DIR,
} from '../../utils';

import { excludeFiles } from '../../utils';
import type { SourceFile } from 'ts-morph';
import { Plugin } from 'vite';

/**
 * fork = require( https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */
export const generateTypesDefinitions = async () => {
  const projectRoot = process.cwd();
  const workspaceRoot = findWorkspaceRoot();
  const outDir = path.resolve(workspaceRoot, `${OUTPUT_DIR}/${FE_PKG}`);
  const tsConfigPath = path.resolve(workspaceRoot, 'tsconfig.json');
  const project = new Project({
    compilerOptions: {
      emitDeclarationOnly: true,
      outDir,
      baseUrl: workspaceRoot,
    },
    tsConfigFilePath: tsConfigPath,
    skipAddingFilesFromTsConfig: true,
  });

  const filePaths = excludeFiles(
    await glob(['**/*.{js,ts,vue}', '!vite.config.ts'], {
      cwd: projectRoot,
      absolute: true,
      onlyFiles: true,
    }),
  );

  const sourceFiles: SourceFile[] = [];
  await Promise.all([
    ...filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = await fs.readFile(file, 'utf-8');
        const sfc = vueCompiler.parse(content);
        const { script, scriptSetup } = sfc.descriptor;
        if (script || scriptSetup) {
          let content = '';
          let isTS = false;
          let isTSX = false;
          if (script && script.content) {
            content += script.content;
            if (script.lang === 'ts') isTS = true;
            if (script.lang === 'tsx') isTSX = true;
          }
          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx',
            });
            content += compiled.content;
            if (scriptSetup.lang === 'ts') isTS = true;
            if (scriptSetup.lang === 'tsx') isTSX = true;
          }
          const sourceFile = project.createSourceFile(
            path.relative(process.cwd(), file) + (isTS ? '.ts' : isTSX ? '.tsx' : '.js'),
            content,
          );
          sourceFiles.push(sourceFile);
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file);
        sourceFiles.push(sourceFile);
      }
    }),
    /*    ...epPaths.map(async (file) => {
      const content = await fs.readFile(path.resolve(epRoot, file), 'utf-8');
      sourceFiles.push(project.createSourceFile(path.resolve(pkgRoot, file), content));
    }),*/
  ]);

  const diagnostics = project.getPreEmitDiagnostics();
  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));

  await project.emit({
    emitOnlyDtsFiles: true,
  });

  const tasks = sourceFiles.map(async (sourceFile) => {
    const relativePath = path.relative(pkgRoot, sourceFile.getFilePath());
    yellow(`Generating definition for file: ${bold(relativePath)}`);

    const emitOutput = sourceFile.getEmitOutput();
    const emitFiles = emitOutput.getOutputFiles();
    if (emitFiles.length === 0) {
      errorAndExit(new Error(`Emit no file: ${bold(relativePath)}`));
    }

    const tasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath();
      await fs.mkdir(path.dirname(filepath), {
        recursive: true,
      });

      console.log(filepath);

      // await fs.writeFile(filepath, pathRewriter('esm')(outputFile.getText()), 'utf8');

      green(`Definition for file: ${bold(relativePath)} generated`);
    });

    await Promise.all(tasks);
  });

  await Promise.all(tasks);
};

export default function dtsPlugin(): Plugin {
  return {
    name: 'vite:dts',

    apply: 'build',

    enforce: 'pre',

    async closeBundle() {
      await generateTypesDefinitions();
    },
  };
}
