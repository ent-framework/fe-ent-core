import path from 'path';
import { mkdir } from 'fs/promises';
import { copy, copyFile } from 'fs-extra';
import { src, dest, series, parallel } from 'gulp';
import { run } from './src/utils';
import { runTask, withTaskName } from './src/utils';
import { buildOutput, epOutput, epRoot, pkgRoot, projRoot } from '@ent-core/build-utils';
import { buildConfig } from './src/build-info';
import type { TaskFunction } from 'gulp';
import type { Module } from './src/build-info';

const copyReadmeFile = () =>
  Promise.all([
    copyFile(path.resolve(projRoot, 'README.md'), path.resolve(epOutput, 'README.md')),
    copyFile(path.resolve(epRoot, 'package.json'), path.resolve(epOutput, 'package.json')),
  ]);

export const copyFiles: TaskFunction = (done) => {
  const assetSrc = path.resolve(pkgRoot, 'assets');
  const assetDest = path.resolve(epOutput, 'assets');
  const copyAssets = () =>
    withTaskName('copyAssets', () => {
      return src(`${assetSrc}/**/*.{jpg,svg,png}`).pipe(dest(assetDest));
    });

  return parallel(copyReadmeFile, copyAssets())(done);
};

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types', 'packages');
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

  const copySupport = () =>
    withTaskName('copySupport', () =>
      copyFile(
        path.resolve(projRoot, 'typings/support.d.ts'),
        path.resolve(epOutput, 'support.d.ts'),
      ),
    );

  return parallel(copyTypes('esm'), copyTypes('cjs'), copyGlobal(), copySupport())(done);
};

export const copyFullStyle = async () => {
  await mkdir(path.resolve(epOutput, 'dist'), { recursive: true });
};

export default series(
  withTaskName('clean', () => run('pnpm -w run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),

  parallel(runTask('buildModules'), runTask('buildFullBundle')),
  parallel(
    runTask('buildFullExtensions'),
    runTask('generateTypesDefinitions'),
    runTask('buildHelper'),
    series(copyFullStyle, runTask('buildTheme')),
  ),

  parallel(copyTypesDefinitions, copyFiles),
);

export * from './src/task/types-definitions';
export * from './src/task/modules';
export * from './src/task/full-bundle';
export * from './src/task/helper';
export * from './src/task/extensions';
export * from './src/task/theme';
