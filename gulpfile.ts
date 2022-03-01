import path from 'path';
import { mkdir, copyFile } from 'fs/promises';
import { copy } from 'fs-extra';
import { series, parallel } from 'gulp';
import { run } from './build/utils/process';
import { runTask, withTaskName } from './build/utils/gulp';
import { buildOutput, epOutput, epPackage, projRoot } from './build/utils';
import { buildConfig } from './build/build-info';
import type { TaskFunction } from 'gulp';
import type { Module } from './build/build-info';

export const copyFiles = () =>
  Promise.all([
    copyFile(epPackage, path.join(epOutput, 'package.json')),
    copyFile(path.resolve(projRoot, 'README.md'), path.resolve(epOutput, 'README.md')),
    copyFile(path.resolve(projRoot, 'typings/global.d.ts'), path.resolve(epOutput, 'global.d.ts')),
  ]);

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types');
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path, { recursive: true }),
    );

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done);
};

export const copyFullStyle = async () => {
  await mkdir(path.resolve(epOutput, 'dist'), { recursive: true });
  await copyFile(
    path.resolve(epOutput, 'theme-chalk/index.css'),
    path.resolve(epOutput, 'dist/index.css'),
  );
};

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),

  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
   // runTask('generateTypesDefinitions'),
  //  runTask('buildHelper'),
/*    series(
      runTask('buildTheme'),
      copyFullStyle,
    ),*/
  ),

  //parallel(copyTypesDefinitions, copyFiles),
);

export * from './build/types-definitions';
export * from './build/modules';
export * from './build/full-bundle';
export * from './build/helper';
export * from './build/theme';
