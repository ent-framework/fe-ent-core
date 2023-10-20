import { mainOutRoute } from './components/routes/main-out';
import { getErrorLogRoute, getRedirectRoute, getRootRoute } from './components/routes/basic';
import { initLayout } from './init';
import { useLayoutStore } from './store/layout';
import type { AppRouteRecordRaw } from 'fe-ent-core/es/router';

import './components/index.less';

export * from './components/layouts/default';

// 导入基础路由，与业务无关
function getPublicRoutes(rootPathRedirect?: string): AppRouteRecordRaw[] {
  return [mainOutRoute, getRedirectRoute(), getErrorLogRoute(), getRootRoute(rootPathRedirect)];
}

export { initLayout, getPublicRoutes, useLayoutStore };
