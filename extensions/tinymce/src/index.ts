import { withInstall } from 'fe-ent-core/es/utils';
import tinymce from './components/index.vue';
import type { App } from 'vue';
import './index.less';

export const Tinymce = withInstall(tinymce);

export const install = function (app: App) {
  app.use(Tinymce);
  return app;
};

export default install;
