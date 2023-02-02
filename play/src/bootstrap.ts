import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
// Register icon sprite
import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from 'fe-ent-core/lib/logics/init-app-config';
import { setupErrorHandle } from 'fe-ent-core/lib/logics/error-handle';
import { setupRouter, router } from 'fe-ent-core/lib/router';
import { LoginRoute } from 'fe-ent-core/lib/router/routes';
import { setupRouterGuard } from 'fe-ent-core/lib/router/guard';
import { setupStore } from 'fe-ent-core/lib/store';
import { setupGlobDirectives } from 'fe-ent-core/lib/directives';
import { setupI18n } from 'fe-ent-core/lib/locales/setup-i18n';
import { registerGlobComp } from 'fe-ent-core/lib/components/register-glob-comp';
import { useLayout } from 'fe-ent-core/lib/router/helper/layout-helper';
import { getBasicRoutes } from 'fe-ent-core/lib/router/routes';
import { initApplication } from '/@/init-application';
import EntCore from 'fe-ent-core';
import { QrCode } from '@fe-ent-extension/qrcode';

// Importing on demand in local development will increase the number of browser requests by around 20%.
// This may slow down the browser refresh speed.
// Therefore, only enable on-demand importing in production environments .
if (import.meta.env.DEV) {
  // bug of import order;
  //import('ant-design-vue/dist/antd.less');
}
import 'ant-design-vue/dist/antd.less';
import 'fe-ent-core/lib/theme/index.less';

import { default as LAYOUT } from 'fe-ent-core/lib/layouts/default';
import { default as IFRAME } from 'fe-ent-core/lib/views/sys/iframe/frame-blank';

export async function bootstrap(login: boolean) {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  //初始化全局变量
  await initApplication();

  // Register global components
  registerGlobComp(app);

  //register components
  app.use(EntCore);
  app.use(QrCode);

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  // Initialize internal system configuration
  await initAppConfigStore();

  const layoutMgt = useLayout();

  //initial layout
  //layoutMgt.use('LAYOUT', LAYOUT);
  //layoutMgt.use('IFRAME', IFRAME);

  if (login) {
    router.addBasicRoutes([LoginRoute]);
  } else {
    // Configure routing
    router.addBasicRoutes(getBasicRoutes());
    router.addBizRoutes(import.meta.globEager(`/src/routes/modules/**/*.ts`));
  }

  setupRouter(app);

  //importMenuModules(import.meta.globEager('./modules/**/*.ts'));

  // router-guard
  setupRouterGuard(router, login);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}
