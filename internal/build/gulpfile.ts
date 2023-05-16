import path from 'path';
import { mkdir } from 'fs/promises';
import { copy, copyFile } from 'fs-extra';
import { parallel, series } from 'gulp';
import { buildOutput, epOutput, epRoot, projRoot, run } from '@ent-build/build-utils';
import { runTask, withTaskName } from './src/utils';
import { buildConfig } from './src/build-info';
import type { TaskFunction } from 'gulp';
import type { Module } from './src/build-info';

export const copyFiles: TaskFunction = (done) => {
  const copyReadmeFile = () =>
    Promise.all([
      copyFile(path.resolve(projRoot, 'README.md'), path.resolve(epOutput, 'README.md')),
      copyFile(path.resolve(epRoot, 'package.json'), path.resolve(epOutput, 'package.json')),
    ]);
  return parallel(copyReadmeFile)(done);
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
  withTaskName('buildSupport', () => run('pnpm build:support')),

  parallel(
    withTaskName('buildCoreComponent', () =>
      run('pnpm run -C packages/fe-ent-core build:component'),
    ),
    withTaskName('buildCoreStyle', () => run('pnpm run -C packages/fe-ent-core build:style')),
    withTaskName('buildCoreTypesDefinitions', () => run('pnpm run -C packages/fe-ent-core dtsgen')),
    withTaskName('buildExtensions', () => run('pnpm -w run build:extensions')),
    withTaskName('buildApps', () => run('pnpm -w run build:apps')),
  ),
);

export * from './src/task/types-definitions';
export * from './src/task/modules';
export * from './src/task/full-bundle';
export * from './src/task/helper';
export * from './src/task/extensions';
export * from './src/task/theme';
