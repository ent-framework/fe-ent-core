import { mainOutRoute } from './components/page/routes/main-out';
import { getErrorLogRoute, getRedirectRoute, getRootRoute } from './components/page/routes/basic';
import { initRouteAndLayout } from './components/init-page';
import type { AppRouteRecordRaw } from 'fe-ent-core/lib/router/types';
import './components/index.less';

export * from './components/page/layouts/default';

// 导入基础路由，与业务无关
function getBasicRoutes(rootPathRedirect?: string): AppRouteRecordRaw[] {
  return [mainOutRoute, getRedirectRoute(), getErrorLogRoute(), getRootRoute(rootPathRedirect)];
}

export { initRouteAndLayout, getBasicRoutes };
