import { parallel, series } from 'gulp';
import { run, withTaskName } from './utils';

export default series(
  withTaskName('clean', () => run('pnpm -w run clean')),
  withTaskName('buildSupport', () => run('pnpm build:support')),

  parallel(
    withTaskName('buildCoreComponent', () => run('pnpm run build:lib')),
    withTaskName('buildCoreStyle', () => run('pnpm run lib:build:style')),
    withTaskName('buildCoreTypesDefinitions', () => run('pnpm run lib:dtsgen')),
    withTaskName('buildJsonFiles', () => run('pnpm run lib:jsongen')),
  ),
  parallel(
    withTaskName('buildExtensions', () => run('pnpm -w run build:extensions')),
    withTaskName('buildLogin', () => run('pnpm run -C apps/login build')),
    withTaskName('buildLayout', () => run('pnpm run -C apps/layout build')),
  ),
);
