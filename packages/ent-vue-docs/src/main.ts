import 'uno.css';
// Register icon sprite
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import { Button, PageHeader, Table, Tooltip } from 'ant-design-vue';

import { initLayout } from 'fe-ent-layout';
import { setupErrorHandle } from '@ent-core/logics/error-handle';
import { entRouter, transformRouteToMenu } from '@ent-core/router';
import { setupRouterGuard } from '@ent-core/router/guard';
import { setupStore } from '@ent-core/store';
import { setupGlobDirectives } from '@ent-core/directives';
import { setupI18n } from '@ent-core/locales/setup-i18n';
import EntCore, { registerAntGlobComp } from '@ent-core/index';
import { usePermissionStore } from '@ent-core/store/modules/permission';
import { useLocale } from '@ent-core/locales';
import getRoutes from './router';
import { initApplication } from './init-application';
import locales from './locale';

import '@ent-core/theme/index.less';
import 'prismjs/themes/prism.css';

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
  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);
  //初始化全局变量
  await initApplication();
  // Register ant global components
  registerAntGlobComp(app);

  initLayout(app, entRouter);

  const { getLocale, addMessages, setLocalePicker } = useLocale();
  setLocalePicker(false);
  addMessages('en', locales.en);
  addMessages('zh_CN', locales.zh_CN);

  app.use(EntCore);

  app.component(CodeBlock.name, CodeBlock);
  app.component(CellDemo.name, CellDemo);
  app.component(CellCode.name, CellCode);
  app.component(AnchorHead.name, AnchorHead);
  app.component(ArcoArticle.name, ArcoArticle);

  app.use(PageHeader);
  app.use(Button);
  app.use(Tooltip);
  app.use(Table);

  const docsRoutes = getRoutes(getLocale.value);
  entRouter.addPublicRoutes(docsRoutes);

  const permissionStore = usePermissionStore();
  permissionStore.setFrontMenuList(transformRouteToMenu(docsRoutes, true));
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
