import { initRouteBridge, useLayout } from 'fe-ent-core/lib/router';

import { default as LAYOUT } from './layouts/default';
import { default as IFRAME } from './views/iframe/frame-blank';
import { default as ExceptionPage } from './views/exception/exception.vue';

import { getPageNotFoundRoute, getRedirectRoute, getRootRoute } from './routes/basic';

const setupPages = function () {
  const layoutMgt = useLayout();

  //initial layout
  layoutMgt.use('LAYOUT', LAYOUT);
  layoutMgt.use('IFrame', IFRAME);
  layoutMgt.use('ExceptionPage', ExceptionPage);

  initRouteBridge(() => {
    return {
      getRootRoute,
      getRedirectRoute,
      getPageNotFoundRoute,
    };
  });
};

export { setupPages };
