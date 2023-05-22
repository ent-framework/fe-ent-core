import { withInstall } from 'fe-ent-core/lib/utils';
import markDown from './components/index.vue';
import markDownViewer from './components/viewer.vue';
import './components/index.less';
import type { App } from 'vue';

export const EntMarkDown = withInstall(markDown);
export const EntMarkdownViewer = withInstall(markDownViewer);
export * from './components/typing';

export const install = function (app: App) {
  app.use(EntMarkDown);
  app.use(EntMarkdownViewer);
  return app;
};

export default install;
