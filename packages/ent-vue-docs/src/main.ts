import 'uno.css';
// Register icon sprite
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import { Button, PageHeader, Tooltip } from 'ant-design-vue';
import { initAppConfigStore } from '@ent-core/logics/init-app-config';
import { setupErrorHandle } from '@ent-core/logics/error-handle';
import { entRouter, transformRouteToMenu } from '@ent-core/router';
import { setupRouterGuard } from '@ent-core/router/guard';
import { setupStore } from '@ent-core/store';
import { setupGlobDirectives } from '@ent-core/directives';
import { setupI18n } from '@ent-core/locales/setup-i18n';
import { registerGlobComp } from '@ent-core/components/register-glob-comp';
import EntCore from '@ent-core/index';
import { usePermissionStoreWithOut } from '@ent-core/store/modules/permission';
import { useLocale } from '@ent-core/locales';
import getRoutes from './router';
import { initApplication } from './init-application';
import locales from './locale';

import 'ant-design-vue/dist/antd.less';
import '@ent-core/theme/index.less';
import 'prismjs/themes/prism.css';

import { initRouteAndLayout } from 'fe-ent-page';

import ArcoArticle from './components/article/index.vue';
import AnchorHead from './components/anchor-head/index.vue';
import CodeBlock from './components/code-block/index.vue';
import CellDemo from './components/cell-demo/index.vue';
import CellCode from './components/cell-code/index.vue';

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

  initRouteAndLayout(app);

  app.use(EntCore);

  app.component(CodeBlock.name, CodeBlock);
  app.component(CellDemo.name, CellDemo);
  app.component(CellCode.name, CellCode);
  app.component(AnchorHead.name, AnchorHead);
  app.component(ArcoArticle.name, ArcoArticle);

  app.use(PageHeader);
  app.use(Button);
  app.use(Tooltip);

  const { getLocale, addMessages, setLocalePicker } = useLocale();
  setLocalePicker(false);
  addMessages('en', locales.en);
  addMessages('zh_CN', locales.zh_CN);
  const docsRoutes = getRoutes(getLocale.value);
  entRouter.addBasicRoutes(docsRoutes);

  const permissionStore = usePermissionStoreWithOut();
  permissionStore.setFrontMenuList(transformRouteToMenu(docsRoutes));
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
