import path from 'path';
import { mkdir } from 'fs/promises';
import { copy, copyFile } from 'fs-extra';
import { src, dest, series, parallel } from 'gulp';
import { run } from './utils/process';
import { runTask, withTaskName } from './utils/gulp';
import { buildOutput, epOutput, pkgRoot, projRoot } from './utils';
import { buildConfig } from './build-info';
import type { TaskFunction } from 'gulp';
import type { Module } from './build-info';

export const copyFiles: TaskFunction = (done) => {
  const copyReadmeFile = () =>
    withTaskName('copyReadmeFile', () =>
      copyFile(path.resolve(projRoot, 'README.md'), path.resolve(epOutput, 'README.md')),
    );

  const assetSrc = path.resolve(pkgRoot, 'assets');
  const assetDest = path.resolve(epOutput, 'assets');
  const copyAssets = () =>
    withTaskName('copyAssets', () => {
      return src(`${assetSrc}/**/*.{jpg,svg,png}`).pipe(dest(assetDest));
    });

  return parallel(copyReadmeFile(), copyAssets())(done);
};

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types');
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path, { recursive: true }),
    );

  const copyGlobal = () =>
    withTaskName('copyGlobal', () =>
      copyFile(
        path.resolve(projRoot, 'typings/global.d.ts'),
        path.resolve(epOutput, 'global.d.ts'),
      ),
    );

  return parallel(copyTypes('esm'), copyTypes('cjs'), copyGlobal())(done);
};

export const copyFullStyle = async () => {
  await mkdir(path.resolve(epOutput, 'dist'), { recursive: true });
};

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),

  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
    runTask('generateTypesDefinitions'),
    runTask('buildHelper'),
    series(runTask('buildTheme'), copyFullStyle),
  ),

  parallel(copyTypesDefinitions, copyFiles),
);

export * from './types-definitions';
export * from './modules';
export * from './full-bundle';
export * from './helper';
export * from './theme';