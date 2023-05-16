import path from 'path';
import fs from 'fs/promises';
import * as vueCompiler from 'vue/compiler-sfc';
import consola from 'consola';
import { rimraf } from 'rimraf';
import { Project } from 'ts-morph';
import glob from 'fast-glob';
import { copySync, ensureDirSync, rmSync } from 'fs-extra';
import chalk from 'chalk';
import { searchForWorkspaceRoot } from 'vite';
import { excludeFiles } from '../../utils/exclude-files';
import type { SourceFile } from 'ts-morph';

/**
 * fork = require( https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */

export const pathRewriter = () => {
  return (id: string) => {
    //id = id.replaceAll(`${EP_PREFIX}/theme`, 'fe-ent-core/theme');
    id = id.replaceAll(`@ent-core/`, `fe-ent-core/es/`);
    return id;
  };
};

const cwd = process.cwd();
const projRoot = searchForWorkspaceRoot(cwd);
const TSCONFIG_PATH = path.resolve(cwd, 'tsconfig.json');
const outDir = path.resolve(cwd, 'dist', 'types');

const build = async () => {
  consola.log(`Run in dir: ${process.cwd()}`);
  const project = new Project({
    compilerOptions: {
      emitDeclarationOnly: true,
      outDir,
      baseUrl: cwd,
      rootDir: cwd,
      skipLibCheck: true,
      preserveSymlinks: true,
      noImplicitAny: false,
    },
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  });

  const sourceFiles = await addSourceFiles(project);
  consola.success('Added source files');
  typeCheck(project);
  consola.success('Type check passed!');
  await project.emit({
    emitOnlyDtsFiles: true,
  });

  const tasks = sourceFiles.map(async (sourceFile) => {
    const relativePath = path.relative(cwd, sourceFile.getFilePath());
    consola.log(chalk.yellow(`Generating definition for file: ${chalk.bold(relativePath)}`));

    const emitOutput = sourceFile.getEmitOutput();
    const emitFiles = emitOutput.getOutputFiles();
    if (emitFiles.length === 0) {
      consola.warn(`Emit no file: ${chalk.bold(relativePath)}`);
    }

    const subTasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath();
      await fs.mkdir(path.dirname(filepath), {
        recursive: true,
      });
      await fs.writeFile(filepath, pathRewriter()(outputFile.getText()), 'utf8');

      consola.log(chalk.green(`Definition for file: ${chalk.bold(relativePath)} generated`));
    });

    await Promise.all(subTasks);
  });

  await Promise.all(tasks);
};

async function addSourceFiles(project: Project) {
  project.addSourceFileAtPath(path.resolve(projRoot, 'typings/support.d.ts'));

  const filePaths = excludeFiles(
    await glob(['**/*.{tsx,ts,vue}'], {
      cwd,
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
  ]);
  return sourceFiles;
}

function typeCheck(project: Project) {
  const diagnostics = project.getPreEmitDiagnostics();
  if (diagnostics.length > 0) {
    consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics));
    const err = new Error('Failed to generate dts.');
    consola.error(err);
    throw err;
  }
}

export default async function () {
  await build();
  rmSync(path.resolve(outDir, 'tsconfig.tsbuildinfo'));
  ensureDirSync(path.resolve(cwd, 'es'));
  copySync(outDir, path.resolve(cwd, 'es'), {
    recursive: true,
  });
  ensureDirSync(path.resolve(cwd, 'lib'));
  copySync(outDir, path.resolve(cwd, 'lib'), {
    recursive: true,
  });
  rimraf.sync(outDir);
}
