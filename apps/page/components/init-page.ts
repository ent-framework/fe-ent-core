import {
  COMPONENT_EXCEPTION_NAME,
  COMPONENT_IFRAME_NAME,
  COMPONENT_LAYOUT_NAME,
  initRouteBridge,
} from 'fe-ent-core/lib/router';
import { withInstall } from 'fe-ent-core/lib/utils';

import { DefaultLayout } from './page/layouts/default';
import { default as IFRAME } from './page/views/iframe/frame-blank';
import { default as ExceptionPage } from './page/views/exception/exception.vue';

import { getPageNotFoundRoute, getRedirectRoute, getRootRoute } from './page/routes/basic';
import type { App } from 'vue';

const initRouteAndLayout = function (app: App) {
  //initial layout
  app.use(withInstall(DefaultLayout, COMPONENT_LAYOUT_NAME));
  app.use(withInstall(IFRAME, COMPONENT_IFRAME_NAME));
  app.use(withInstall(ExceptionPage, COMPONENT_EXCEPTION_NAME));

  initRouteBridge(() => {
    return {
      getRootRoute,
      getRedirectRoute,
      getPageNotFoundRoute,
    };
  });
};

export { initRouteAndLayout };
