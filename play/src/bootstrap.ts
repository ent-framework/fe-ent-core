import 'uno.css';
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
import { getBasicRoutes } from 'fe-ent-core/lib/router/routes';
import { initApplication } from '/@/init-application';
import EntCore from 'fe-ent-core';
import { QrCode } from '@fe-ent-extension/qrcode';

import 'ant-design-vue/dist/antd.css';
import 'fe-ent-core/lib/theme/index.less';

export async function bootstrap(needLogin: boolean) {
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

  //const layoutMgt = useLayout();

  //initial layout
  //layoutMgt.use('LAYOUT', LAYOUT);
  //layoutMgt.use('IFRAME', IFRAME);

  if (needLogin) {
    // Configure routing
    router.addBasicRoutes(getBasicRoutes());
    router.addBizRoutes(import.meta.globEager(`/src/routes/modules/**/*.ts`));
  } else {
    router.addBasicRoutes([LoginRoute]);
  }

  setupRouter(app);

  //importMenuModules(import.meta.globEager('./modules/**/*.ts'));

  // router-guard
  setupRouterGuard(router, needLogin);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}
