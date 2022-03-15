import path from 'path';
import fs from 'fs/promises';
import * as vueCompiler from 'vue/compiler-sfc';
import { Project } from 'ts-morph';
import glob from 'fast-glob';
import { bold } from 'chalk';

import { errorAndExit, green, yellow, error } from './utils/log';
import { buildOutput, epRoot, pkgRoot, projRoot } from './utils';

import { excludeFiles, pathRewriter } from './utils/pkg';
import type { SourceFile } from 'ts-morph';

const TSCONFIG_PATH = path.resolve(process.cwd(), 'tsconfig.tds.json');
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
      paths: {
        '@ent-core/*': [`packages/*`],
      },
    },
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  });

  const filePaths = excludeFiles(
    await glob(['**/*.{tsx,ts,vue}', '!fe-ent-core/!**/!*'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    }),
  );
  //const filePaths = ['/Volumes/workspace/code/projects/coe/fe-core/packages/components/Dropdown/index.ts'];
  const epPaths = excludeFiles(
    await glob('**/*.{tsx,ts,vue}', {
      cwd: epRoot,
      onlyFiles: true,
    }),
  );

  const typingPaths = excludeFiles(
    await glob('**/*.{tsx,ts}', {
      cwd: `${projRoot}/typings/`,
      onlyFiles: true,
      absolute: true,
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
            console.log(error(`Error Get Content : ${bold(file)}`));
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

    ...typingPaths.map(async (file) => {
      const sourceFile = project.addSourceFileAtPath(file);
      sourceFiles.push(sourceFile);
    }),
  ]);

  const diagnostics = project.getPreEmitDiagnostics();
  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));
  console.log(error(`Diagnostics count: ${bold(diagnostics.length)}`));

  await project.emit({
    emitOnlyDtsFiles: true,
  });

  const tasks = sourceFiles.map(async (sourceFile) => {
    const relativePath = path.relative(pkgRoot, sourceFile.getFilePath());
    yellow(`Generating definition for file: ${bold(relativePath)}`);

    const emitOutput = sourceFile.getEmitOutput();
    const emitFiles = emitOutput.getOutputFiles();
    if (emitFiles.length === 0) {
      //errorAndExit(new Error(`Emit no file: ${bold(relativePath)}`));
      error(`Emit no file: ${bold(relativePath)}`);
    }

    const tasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath();
      await fs.mkdir(path.dirname(filepath), {
        recursive: true,
      });

      await fs.writeFile(filepath, pathRewriter('esm')(outputFile.getText()), 'utf8');

      green(`Definition for file: ${bold(relativePath)} generated`);
    });

    await Promise.all(tasks);
  });

  await Promise.all(tasks);
};
