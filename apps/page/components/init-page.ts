import {
  COMPONENT_EXCEPTION_NAME,
  COMPONENT_IFRAME_NAME,
  COMPONENT_LAYOUT_NAME,
} from 'fe-ent-core';
import { withInstall } from 'fe-ent-core';
import { DefaultLayout } from './layouts/default';
import { default as IFRAME } from './views/iframe/frame-blank';
import { default as ExceptionPage } from './views/exception/exception.vue';

import { getPageNotFoundRoute } from './routes/basic';
import type { App } from 'vue';
import type { EntRouter } from 'fe-ent-core';

const initRouteAndLayout = function (app: App, entRouter?: EntRouter) {
  //initial layout
  app.use(withInstall(DefaultLayout, COMPONENT_LAYOUT_NAME));
  app.use(withInstall(IFRAME, COMPONENT_IFRAME_NAME));
  app.use(withInstall(ExceptionPage, COMPONENT_EXCEPTION_NAME));

  if (entRouter) {
    entRouter.setPageNotFoundRoute(getPageNotFoundRoute());
  }
};

export { initRouteAndLayout };
