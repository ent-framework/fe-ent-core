import { deepMerge, withInstall } from 'fe-ent-core/es/utils';
import {
  COMPONENT_EXCEPTION_NAME,
  COMPONENT_IFRAME_NAME,
  COMPONENT_LAYOUT_NAME,
} from 'fe-ent-core/es/router';
import { useGlobalStoreWithOut } from 'fe-ent-core/es/store/modules/global';
import { Persistent } from 'fe-ent-core/es/utils/cache/persistent';
import { LAYOUT_KEY } from 'fe-ent-core/es/logics';
import { DefaultLayout } from './components/layouts/default';
import { default as IFRAME } from './components/views/iframe/frame-blank';
import { default as ExceptionPage } from './components/views/exception/exception.vue';
import { useMultipleTabStore } from './store/multiple-tab';
import { getPageNotFoundRoute } from './components/routes/basic';
import { useLayoutStore } from './store/layout';
import { defaultLayoutSetting } from './store/layout-setting';
import type { App } from 'vue';
import type { EntRouter } from 'fe-ent-core/es/router';
import type { LayoutConfig } from './types';

const initLayout = function (app: App, entRouter?: EntRouter) {
  //initial layout
  app.use(withInstall(DefaultLayout, COMPONENT_LAYOUT_NAME));
  app.use(withInstall(IFRAME, COMPONENT_IFRAME_NAME));
  app.use(withInstall(ExceptionPage, COMPONENT_EXCEPTION_NAME));

  if (entRouter) {
    entRouter.setPageNotFoundRoute(getPageNotFoundRoute());
    const globalStore = useGlobalStoreWithOut();
    entRouter.afterEach((to) => {
      // Just enter the login page and clear the authentication information
      if (to.path === globalStore.getBaseLoginPath) {
        const tabStore = useMultipleTabStore();
        tabStore.resetState();
      }
    });
  }

  let layoutConfig: LayoutConfig = Persistent.getLocal(LAYOUT_KEY) as LayoutConfig;
  layoutConfig = deepMerge(defaultLayoutSetting, layoutConfig || {});
  const layoutStore = useLayoutStore();
  layoutStore.setLayoutConfig(layoutConfig);
};

export { initLayout };
