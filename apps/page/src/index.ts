import { mainOutRoute } from './routes/main-out';
import { getErrorLogRoute, getRedirectRoute, getRootRoute } from './routes/basic';
import { initRouteAndLayout } from './init-page';
import type { AppRouteRecordRaw } from 'fe-ent-core/lib/router/types';
import './index.less';

// 导入基础路由，与业务无关
function getBasicRoutes(): AppRouteRecordRaw[] {
  return [mainOutRoute, getRedirectRoute(), getErrorLogRoute(), getRootRoute()];
}

export { initRouteAndLayout, getBasicRoutes };
