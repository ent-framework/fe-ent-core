import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
// Register icon sprite
import 'virtual:svg-icons-register';
import App from './app.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from 'fe-ent-core/lib/logics/init-app-config';
import { setupErrorHandle } from 'fe-ent-core/lib/logics/error-handle';
import { setupRouter, router } from 'fe-ent-core/lib/router';
import { setupRouterGuard } from 'fe-ent-core/lib/router/guard';
import { setupStore } from 'fe-ent-core/lib/store';
import { setupGlobDirectives } from 'fe-ent-core/lib/directives';
import { setupI18n } from 'fe-ent-core/lib/locales/setup-i18n';
import { registerGlobComp } from 'fe-ent-core/lib/components/register-glob-comp';
import { useLayout } from 'fe-ent-core/lib/router/helper/layout-helper';
//import { importMenuModules } from 'fe-ent-core/lib/router/menus';
import { LoginRoute } from 'fe-ent-core/lib/router/routes';
import { initApplication } from '/@/init-application';
import EntCore from 'fe-ent-core';
//import AntD from 'ant-design-vue';

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

async function bootstrap() {
  const app = createApp(App);

  //初始化全局变量
  await initApplication();

  // Configure store
  setupStore(app);

  // Initialize internal system configuration
  initAppConfigStore();

  // Register global components
  registerGlobComp(app);

  //register components
  //app.use(AntD);
  app.use(EntCore);
  //app.use(QrCode);

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  const layoutMgt = useLayout();

  //initial layout
  layoutMgt.use('LAYOUT', LAYOUT);
  layoutMgt.use('IFRAME', IFRAME);

  // Configure routing
  router.addBasicRoutes([LoginRoute]);

  setupRouter(app);
  //router.addExtraRoutes(import.meta.globEager(`/src/routes/modules/**/*.ts`));

  //importMenuModules(import.meta.globEager('./modules/**/*.ts'));

  // router-guard
  setupRouterGuard(router, true);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#login');
}

bootstrap();
