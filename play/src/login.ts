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

import 'ant-design-vue/dist/antd.css';
import '@ent-core/theme/index.less';

import { LoginRoute } from '@fe-ent-app/login';
import { initRouteAndLayout } from '@fe-ent-app/page';

import App from './App.vue';

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  //初始化全局变量
  await initApplication();

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  // Register global components
  registerGlobComp(app);

  // Initialize internal system configuration
  await initAppConfigStore();

  initRouteAndLayout(app);
  entRouter.addBasicRoutes([LoginRoute]);

  app.use(entRouter);

  // router-guard
  setupRouterGuard(entRouter, false);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}

bootstrap();
