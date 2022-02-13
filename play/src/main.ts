import 'fe-ent-core/design/index.less';
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
// Register icon sprite
import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from 'fe-ent-core/logics/initAppConfig';
import { setupErrorHandle } from 'fe-ent-core/logics/error-handle';
import { router, setupRouter } from 'fe-ent-core/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from 'fe-ent-core/store';
import { setupGlobDirectives } from 'fe-ent-core/directives';
import { registerGlobComp } from 'fe-ent-core/components/registerGlobComp';
import { setupI18n } from 'fe-ent-core/locales/setupI18n';
// Importing on demand in local development will increase the number of browser requests by around 20%.
// This may slow down the browser refresh speed.
// Therefore, only enable on-demand importing in production environments .
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // Initialize internal system configuration
  initAppConfigStore();

  // Register global components
  registerGlobComp(app);

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  // Configure routing
  setupRouter(app);

  // router-guard
  setupRouterGuard(router);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}

bootstrap();
