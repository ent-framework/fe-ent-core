import 'uno.css';
// Register icon sprite
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import EntCore, {
  entRouter,
  initAppConfigStore,
  registerGlobComp,
  setupErrorHandle,
  setupGlobDirectives,
  setupI18n,
  setupRouterGuard,
  setupStore,
} from 'fe-ent-core';
import { initApplication } from '/@/init-application';

import 'ant-design-vue/dist/antd.less';

import { getBasicRoutes, initRouteAndLayout } from 'fe-ent-layout';
import { LoginRoute } from 'fe-ent-login';

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
