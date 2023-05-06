import { registerPageNotFoundRoute } from '@ent-core/router/routes/basic';
import { registerRedirectRoute } from '@ent-core/router/routes/basic';
import { mainOutRoutes } from '@ent-core/router/routes/main-out';
import { PageEnum } from '@ent-core/logics/enums/page-enum';
import type { AppRouteRecordRaw } from '@ent-core/router/types';

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

// 绑定了component，需要优化
// Basic routing without permission
// TODO FIX, 分离会导致login界面刷新页面，页面空白
export function getBasicRoutes() {
  return [RootRoute, ...mainOutRoutes, registerRedirectRoute(), registerPageNotFoundRoute()];
}
