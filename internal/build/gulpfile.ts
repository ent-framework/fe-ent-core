import { parallel, series } from 'gulp';
import { run, withTaskName } from './utils';

export default series(
  withTaskName('clean', () => run('pnpm -w run clean')),
  withTaskName('buildSupport', () => run('pnpm build:support')),
  withTaskName('buildCoreComponent', () => run('pnpm run -C packages/ent-core build')),
  parallel(
    withTaskName('buildExtensions', () => run('pnpm -w run build:extensions')),
    withTaskName('buildLogin', () => run('pnpm run -C apps/login build')),
    withTaskName('buildLayout', () => run('pnpm run -C apps/layout build')),
  ),
);
