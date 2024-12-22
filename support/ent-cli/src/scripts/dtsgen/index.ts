import path from 'path';
import * as vueCompiler from 'vue/compiler-sfc';
import consola from 'consola';
import { ModuleResolutionKind, Project, ScriptTarget } from 'ts-morph';
import glob from 'fast-glob';
import fs from 'fs-extra';
import chalk from 'chalk';
import { excludeFiles } from '../../utils/exclude-files';
import type { SourceFile } from 'ts-morph';

const cwd = process.cwd();
const outDir = path.resolve(cwd, 'es');

const build = async (base: string, tsconfig: string) => {
  let tsconfigFile = tsconfig;
  if (!tsconfig.endsWith('.json')) {
    tsconfigFile = `${tsconfig}.json`;
  }
  const TSCONFIG_PATH = path.resolve(cwd, tsconfigFile);

  consola.log(`Run in dir: ${process.cwd()}, base: ${base}`);
  const project = new Project({
    compilerOptions: {
      // allowJs: true,
      // declaration: true,
      // emitDeclarationOnly: true,
      // strict: true,
      outDir,
      baseUrl: `${cwd}`,
      rootDir: `${cwd}`,
      // target: ScriptTarget.ES2015,
      // moduleResolution: ModuleResolutionKind.Node10,
      // isolatedModules: true,
      // esModuleInterop: true,
      // skipLibCheck: true,
      preserveSymlinks: true
      // noImplicitAny: false,
      // removeComments: false
    },
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true
    // skipFileDependencyResolution: true,
  });

  const sourceFiles = await addSourceFiles(project, cwd, base);
  consola.success(`Added source files, count: ${sourceFiles.length}`);
  typeCheck(project);
  consola.success('Type check passed!');

  project.emitToMemory({ emitOnlyDtsFiles: true });

  const basePathPrefix = path.relative(cwd, base);
  const tasks = sourceFiles.map(async (sourceFile) => {
    const emitOutput = sourceFile.getEmitOutput();
    const emitFiles = emitOutput.getOutputFiles();
    if (emitFiles.length === 0) {
      const relativePath = path.relative(outDir, sourceFile.getFilePath());
      consola.error(`Emit no file: ${chalk.bold(relativePath)} \n`);
    }

    const subTasks = emitFiles.map(async (outputFile) => {
      ['lib', 'es'].forEach((d) => {
        const filePath = outputFile.getFilePath();
        const relativePath = path.relative(outDir, filePath);
        const targetPath = `${basePathPrefix && basePathPrefix.length > 0 ? `${cwd}/${d}/${relativePath.replace(`${basePathPrefix}/`, '')}` : `${cwd}/${d}/${relativePath}`}`;
        fs.ensureDirSync(path.dirname(targetPath));
        fs.writeFileSync(targetPath, outputFile.getText(), 'utf8');
      });
    });

    await Promise.all(subTasks);
  });

  await Promise.all(tasks);
};

async function addSourceFiles(project: Project, cwd: string, base: string) {
  //project.addSourceFileAtPath(path.resolve(projRoot, 'typings/support.d.ts'));

  const filePaths = excludeFiles(
    await glob(['**/*.{tsx,ts,vue}'], {
      cwd: base,
      absolute: true,
      onlyFiles: true
    })
  );

  const sourceFiles: SourceFile[] = [];
  fs.removeSync(`${cwd}/build`);
  fs.ensureDirSync(`${cwd}/build`);
  await Promise.all([
    ...filePaths.map(async (file) => {
      const content = await fs.promises.readFile(file, 'utf8');
      if (file.endsWith('.vue')) {
        const content = await fs.readFile(file, 'utf-8');
        const sfc = vueCompiler.parse(content);
        const { script, scriptSetup } = sfc.descriptor;
        if (script || scriptSetup) {
          let content = '';
          let isTSX = false;
          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx'
            });
            content += compiled.content;
            if (scriptSetup.lang === 'tsx') isTSX = true;
          } else if (script && script.content) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx'
            });
            content += compiled.content;
            if (script.lang === 'tsx') isTSX = true;
          }
          if (content.length == 0) {
            consola.error(`Error Get Content : ${chalk.bold(file)}`);
          } else {
            const sourceFile = project.createSourceFile(
              path.relative(cwd, file).replace('.vue', isTSX ? '.tsx' : '.ts'),
              content
            );
            if (sourceFile) {
              removeVueSpecifier(sourceFile);
              const fileName = `${cwd}/build/${sourceFile.getFilePath().replace(base, '')}`;
              fs.mkdirpSync(fileName.slice(0, Math.max(0, fileName.lastIndexOf('/'))));
              fs.writeFileSync(fileName, sourceFile.getFullText(), { flag: 'w' });
              sourceFiles.push(sourceFile);
            }
          }
        }
      } else {
        const sourceFile = project.createSourceFile(file, content, {
          overwrite: true
        });
        if (sourceFile) {
          removeVueSpecifier(sourceFile);
          sourceFiles.push(sourceFile);
        }
      }
    })
  ]);
  return sourceFiles;
}

function typeCheck(project: Project) {
  const diagnostics = project.getPreEmitDiagnostics();
  if (diagnostics.length > 0) {
    // diagnostics.forEach((diagnostic) => {
    //   consola.error(diagnostic.getCode());
    //   consola.error(diagnostic.getSourceFile()?.getText(false));
    // });
    consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics));
    // const err = new Error('Failed to generate dts.');
    // consola.error(err);
    // throw err;
  }
}

const removeVueSpecifier = (sourceFile: SourceFile) => {
  const imports = sourceFile.getImportDeclarations();
  imports.forEach((item) => {
    const specifier = item.getModuleSpecifierValue();
    const ext = path.extname(specifier);
    if (ext === '.vue') {
      item.setModuleSpecifier(specifier.replace('.vue', ''));
    }
  });
};

export default async function (base: string, tsconfig: string) {
  if (base) {
    if (fs.existsSync(path.resolve(cwd, base))) {
      await build(path.resolve(cwd, base), tsconfig);
    } else {
      consola.error(`${base} don't exist in current dir: ${cwd}`);
    }
  } else {
    await build(cwd, tsconfig);
  }
}
