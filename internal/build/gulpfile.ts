import { parallel, series } from 'gulp';
import { run, withTaskName } from './utils';

export default series(
  withTaskName('clean', () => run('pnpm -w run clean')),
  withTaskName('buildSupport', () => run('pnpm build:support')),
  withTaskName('buildCoreComponent', () => run('pnpm run -C packages/ent-core build')),
  withTaskName('buildCodeEditor', () => run('pnpm -C extensions/code-editor build')),
  parallel(
    withTaskName('buildEcharts', () => run('pnpm -C extensions/echarts build')),
    withTaskName('buildExcel', () => run('pnpm -C extensions/excel build')),
    withTaskName('buildFlowChart', () => run('pnpm -C extensions/flow-chart build')),
    withTaskName('buildMarkdown', () => run('pnpm -C extensions/markdown build')),
    withTaskName('buildTinymce', () => run('pnpm -C extensions/tinymce build')),
    withTaskName('buildTiptap', () => run('pnpm -C extensions/tiptap build')),
    withTaskName('buildLogin', () => run('pnpm run -C apps/login build')),
    withTaskName('buildLayout', () => run('pnpm run -C apps/layout build')),
  ),
);
