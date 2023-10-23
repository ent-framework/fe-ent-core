import { withInstall } from 'fe-ent-core/es/utils';
import {
  COMPONENT_EXCEPTION_NAME,
  COMPONENT_IFRAME_NAME,
  COMPONENT_LAYOUT_NAME,
} from 'fe-ent-core/es/router';
import { useGlobalStore } from 'fe-ent-core/es/store/modules/global';
import { DefaultLayout } from './components/layouts/default';
import { default as IFRAME } from './components/views/iframe/frame-blank';
import { default as ExceptionPage } from './components/views/exception/exception.vue';
import { useMultipleTabStore } from './store/multiple-tab';
import { getPageNotFoundRoute } from './components/routes/basic';
import type { App } from 'vue';
import type { EntRouter } from 'fe-ent-core/es/router';

const initLayout = function (app: App, entRouter?: EntRouter) {
  //initial layout
  app.use(withInstall(DefaultLayout, COMPONENT_LAYOUT_NAME));
  app.use(withInstall(IFRAME, COMPONENT_IFRAME_NAME));
  app.use(withInstall(ExceptionPage, COMPONENT_EXCEPTION_NAME));

  if (entRouter) {
    entRouter.setPageNotFoundRoute(getPageNotFoundRoute());
    const globalStore = useGlobalStore();
    entRouter.afterEach((to) => {
      // Just enter the login page and clear the authentication information
      if (to.path === globalStore.getBaseLoginPath) {
        const tabStore = useMultipleTabStore();
        tabStore.resetState();
      }
    });
  }
};

export { initLayout };
