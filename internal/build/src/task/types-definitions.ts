import path from 'path';
import fs from 'fs/promises';
import * as vueCompiler from 'vue/compiler-sfc';
import consola from 'consola';
import { Project } from 'ts-morph';
import glob from 'fast-glob';
import chalk from 'chalk';

import { buildOutput, epRoot, pkgRoot, projRoot } from '@ent-build/build-utils';

import { excludeFiles, pathRewriter } from '../utils';
import type { SourceFile } from 'ts-morph';

const TSCONFIG_PATH = path.resolve(projRoot, 'tsconfig.web.json');
const outDir = path.resolve(buildOutput, 'types');

/**
 * fork = require( https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */
export const generateTypesDefinitions = async () => {
  console.log(`Run in dir: ${process.cwd()}`);

  const project = new Project({
    compilerOptions: {
      emitDeclarationOnly: true,
      outDir,
      baseUrl: projRoot,
      skipLibCheck: true,
      preserveSymlinks: true,
      noImplicitAny: false,
    },
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  });

  const sourceFiles = await addSourceFiles(project);

  const diagnostics = project.getPreEmitDiagnostics();
  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));
  consola.error(`Diagnostics count: ${chalk.bold(diagnostics.length)}`);

  await project.emit({
    emitOnlyDtsFiles: true,
  });

  const tasks = sourceFiles.map(async (sourceFile) => {
    const relativePath = path.relative(pkgRoot, sourceFile.getFilePath());
    chalk.yellow(`Generating definition for file: ${chalk.bold(relativePath)}`);

    const emitOutput = sourceFile.getEmitOutput();
    const emitFiles = emitOutput.getOutputFiles();
    if (emitFiles.length === 0) {
      consola.warn(`Emit no file: ${chalk.bold(relativePath)}`);
    }

    const tasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath();
      await fs.mkdir(path.dirname(filepath), {
        recursive: true,
      });

      await fs.writeFile(filepath, pathRewriter('esm')(outputFile.getText()), 'utf8');

      chalk.green(`Definition for file: ${chalk.bold(relativePath)} generated`);
    });

    await Promise.all(tasks);
  });

  await Promise.all(tasks);
};

async function addSourceFiles(project: Project) {
  project.addSourceFileAtPath(path.resolve(projRoot, 'typings/support.d.ts'));

  const filePaths = excludeFiles(
    await glob(['**/*.{tsx,ts,vue}', '!fe-ent-core/**/*'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    }),
  );
  const epPaths = excludeFiles(
    await glob('**/*.{tsx,ts,vue}', {
      cwd: epRoot,
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
          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx',
            });
            content += compiled.content;
            if (scriptSetup.lang === 'ts') isTS = true;
            if (scriptSetup.lang === 'tsx') isTSX = true;
          } else if (script && script.content) {
            content += script.content;
            if (script.lang === 'ts') isTS = true;
            if (script.lang === 'tsx') isTSX = true;
          }
          if (content.length == 0) {
            consola.error(`Error Get Content : ${chalk.bold(file)}`);
          } else {
            const sourceFile = project.createSourceFile(
              path.relative(process.cwd(), file) + (isTS ? '.ts' : isTSX ? '.tsx' : '.js'),
              content,
            );
            sourceFiles.push(sourceFile);
          }
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file);
        sourceFiles.push(sourceFile);
      }
    }),
    ...epPaths.map(async (file) => {
      const content = await fs.readFile(path.resolve(epRoot, file), 'utf-8');
      sourceFiles.push(project.createSourceFile(path.resolve(pkgRoot, file), content));
    }),
  ]);
  return sourceFiles;
}
