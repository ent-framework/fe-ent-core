import { mainOutRoute } from './components/routes/main-out';
import { getErrorLogRoute, getRedirectRoute, getRootRoute } from './components/routes/basic';
import { initRouteAndLayout } from './components/init-page';
import type { AppRouteRecordRaw } from 'fe-ent-core/lib/router/types';

export * from './components/layouts/default';

// 导入基础路由，与业务无关
function getBasicRoutes(rootPathRedirect?: string): AppRouteRecordRaw[] {
  return [mainOutRoute, getRedirectRoute(), getErrorLogRoute(), getRootRoute(rootPathRedirect)];
}

export { initRouteAndLayout, getBasicRoutes };
