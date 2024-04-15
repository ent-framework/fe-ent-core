import { withInstall } from 'fe-ent-core/es/utils';
import tinymce from './components/index.vue';
import './components/index.less';
import type { App } from 'vue';

export const Tinymce = withInstall(tinymce);

export const install = function (app: App) {
  app.use(Tinymce);
  return app;
};

export default install;
