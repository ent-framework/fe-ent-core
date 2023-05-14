import {
  COMPONENT_EXCEPTION_NAME,
  COMPONENT_IFRAME_NAME,
  COMPONENT_LAYOUT_NAME,
  initRouteBridge,
} from 'fe-ent-core/lib/router';
import { withInstall } from 'fe-ent-core/lib/utils';

import { default as LAYOUT } from './layouts/default';
import { default as IFRAME } from './views/iframe/frame-blank';
import { default as ExceptionPage } from './views/exception/exception.vue';

import { getPageNotFoundRoute, getRedirectRoute, getRootRoute } from './routes/basic';
import type { App } from 'vue';

const initRouteAndLayout = function (app: App) {
  //initial layout
  app.use(withInstall(LAYOUT, COMPONENT_LAYOUT_NAME));
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
