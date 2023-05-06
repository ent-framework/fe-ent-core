import 'uno.css';
// Register icon sprite
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import { initAppConfigStore } from 'fe-ent-core/lib/logics/init-app-config';
import { setupErrorHandle } from 'fe-ent-core/lib/logics/error-handle';
import { setupRouter, router } from 'fe-ent-core/lib/router';
import { setupRouterGuard } from 'fe-ent-core/lib/router/guard';
import { setupStore } from 'fe-ent-core/lib/store';
import { setupGlobDirectives } from 'fe-ent-core/lib/directives';
import { setupI18n } from 'fe-ent-core/lib/locales/setup-i18n';
import { registerGlobComp } from 'fe-ent-core/lib/components/register-glob-comp';
import { initApplication } from '/@/init-application';

import 'ant-design-vue/dist/antd.css';
import 'fe-ent-core/lib/theme/index.less';

import { LoginRoute } from '@fe-ent-app/login';
import { setupPages } from '@fe-ent-app/page';

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

  setupPages();

  router.addBasicRoutes([LoginRoute]);

  setupRouter(app);

  // router-guard
  setupRouterGuard(router, false);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}

bootstrap();
