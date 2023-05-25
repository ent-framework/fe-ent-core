import { withInstall } from 'fe-ent-core/es/utils';
import codeEditor from './components/code-mirror/index.vue';
import jsonPreview from './components/json-preview/index.vue';
import './components/index.less';
import type { App } from 'vue';

export const CodeEditor = withInstall(codeEditor);
export const JsonPreview = withInstall(jsonPreview);

export * from './components/typing';

export const install = function (app: App) {
  app.use(CodeEditor);
  app.use(JsonPreview);
  return app;
};

export default install;
