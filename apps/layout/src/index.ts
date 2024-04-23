import { withInstall } from 'fe-ent-core/es/utils';
import {
  COMPONENT_EXCEPTION_NAME,
  COMPONENT_IFRAME_NAME,
  COMPONENT_LAYOUT_NAME
} from 'fe-ent-core/es/router';
import { useGlobSetting } from 'fe-ent-core/es/hooks';
import { useLocale } from 'fe-ent-core/es/locales';
import { default as DefaultLayout } from './components/layouts/default/index.vue';
import { default as IFRAME } from './components/views/iframe/frame-blank.vue';
import { default as ExceptionPage } from './components/views/exception/exception.vue';
import { default as LayoutFeature } from './components/layouts/default/feature/index.vue';
import { default as LayoutHeader } from './components/layouts/default/header/index.vue';
import { useMultipleTabStore } from './store/multiple-tab';
import {
  getErrorLogRoute,
  getPageNotFoundRoute,
  getRedirectRoute,
  getRootRoute
} from './components/routes/basic';
import localeEn from './locales/en';
import localeZh from './locales/zh-CN';
import { mainOutRoute } from './components/routes/main-out';
import { useLayoutStore } from './store/layout';
import type { App } from 'vue';
import type { AppRouteRecordRaw, EntRouter } from 'fe-ent-core/es/router';

import './components/index.less';

// 导入基础路由，与业务无关
function getPublicRoutes(): AppRouteRecordRaw[] {
  return [mainOutRoute, getRedirectRoute(), getErrorLogRoute(), getRootRoute()];
}
const initLayout = function (app: App, entRouter?: EntRouter) {
  //initial layout
  app.use(withInstall(DefaultLayout, COMPONENT_LAYOUT_NAME));
  app.use(withInstall(IFRAME, COMPONENT_IFRAME_NAME));
  app.use(withInstall(ExceptionPage, COMPONENT_EXCEPTION_NAME));
  const { addMessages } = useLocale();
  addMessages('en', localeEn);
  addMessages('zh_CN', localeZh);

  if (entRouter) {
    entRouter.setPageNotFoundRoute(getPageNotFoundRoute());
    const globSetting = useGlobSetting();
    entRouter.addPublicRoutes(getPublicRoutes());
    entRouter.afterEach((to) => {
      // Just enter the login page and clear the authentication information
      if (to.path === globSetting.loginUrl) {
        const tabStore = useMultipleTabStore();
        tabStore.resetState();
      }
    });
  }
};

export { initLayout, useLayoutStore, LayoutHeader, LayoutFeature };
