import { mainOutRoutes } from './routes/main-out';
import { getRootRoute, getPageNotFoundRoute, getRedirectRoute } from './routes/basic';
import { setupPages } from './init-page';

import './index.less';

// 绑定了component，需要优化
// Basic routing without permission
// TODO FIX, 分离会导致login界面刷新页面，页面空白
function getBasicRoutes() {
  return [getRootRoute(), ...mainOutRoutes, getRedirectRoute(), getPageNotFoundRoute()];
}

export { setupPages, getBasicRoutes };
