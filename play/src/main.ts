import 'uno.css';
// Register icon sprite
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import { initAppConfigStore } from '@ent-core/logics/init-app-config';
import { setupErrorHandle } from '@ent-core/logics/error-handle';
import { entRouter } from '@ent-core/router';
import { setupRouterGuard } from '@ent-core/router/guard';
import { setupStore } from '@ent-core/store';
import { setupGlobDirectives } from '@ent-core/directives';
import { setupI18n } from '@ent-core/locales/setup-i18n';
import { registerGlobComp } from '@ent-core/components/register-glob-comp';
import { initApplication } from '/@/init-application';
import EntCore from '@ent-core/index';

import 'ant-design-vue/dist/antd.less';
import '@ent-core/theme/index.less';

import { getBasicRoutes, initRouteAndLayout } from '@fe-ent-app/page';
import { LoginRoute } from '@fe-ent-app/login';

import App from './App.vue';
async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // Initialize internal system configuration
  await initAppConfigStore();

  //初始化全局变量
  await initApplication();

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  // Register global components
  registerGlobComp(app);

  initRouteAndLayout(app, entRouter);

  app.use(EntCore);

  entRouter.addBasicRoutes([LoginRoute]);
  entRouter.addBasicRoutes(getBasicRoutes());
  entRouter.addAuthRoutes(import.meta.globEager(`/src/routes/modules/**/*.ts`));

  app.use(entRouter);

  // router-guard
  setupRouterGuard(entRouter);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}

bootstrap();
