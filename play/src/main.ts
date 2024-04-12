import 'uno.css';
// Register icon sprite
//import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import EntCore, { registerAntGlobComp } from 'fe-ent-core';
import { setupErrorHandle } from 'fe-ent-core/es/logics';
import { setupGlobDirectives } from 'fe-ent-core/es/directives';
import { setupStore } from 'fe-ent-core/es/store';
import { entRouter, setupRouterGuard } from 'fe-ent-core/es/router';
import { setupI18n } from 'fe-ent-core/es/locales';
import { initApplication } from '/@/init-application';

import 'fe-ent-core/es/theme/index.less';

import { initLayout } from 'fe-ent-layout';
import { initLogin } from 'fe-ent-login';
import naive from 'naive-ui';

import App from './App.vue';
async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);
  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);
  //初始化全局变量
  await initApplication();

  // Register ant global components
  registerAntGlobComp(app);

  app.use(EntCore);

  initLayout(app, entRouter);
  initLogin(app, entRouter);

  entRouter.importAuthRoutes(import.meta.glob(`/src/routes/modules/**/*.ts`, { eager: true }));

  app.use(entRouter);

  app.use(naive);

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
