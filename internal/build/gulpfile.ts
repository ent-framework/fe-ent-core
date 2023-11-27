import { parallel, series } from 'gulp';
import { run, withTaskName } from './utils';

export default series(
  withTaskName('clean', () => run('pnpm -w run clean')),
  withTaskName('buildSupport', () => run('pnpm build:support')),

  parallel(
    withTaskName('buildCoreComponent', () =>
      run('pnpm run -C packages/fe-ent-core build:component'),
    ),
    withTaskName('buildCoreStyle', () => run('pnpm run -C packages/fe-ent-core build:style')),
    withTaskName('buildCoreTypesDefinitions', () => run('pnpm run -C packages/fe-ent-core dtsgen')),
    withTaskName('buildJsonFiles', () => run('pnpm run -C packages/fe-ent-core jsongen')),
  ),
  parallel(
    withTaskName('buildExtensions', () => run('pnpm -w run build:extensions')),
    withTaskName('buildLogin', () => run('pnpm run -C apps/login build')),
    withTaskName('buildLayout', () => run('pnpm run -C apps/layout build')),
  ),
);
