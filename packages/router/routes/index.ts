import { registerPageNotFoundRoute } from '@ent-core/router/routes/basic';
import { registerRedirectRoute } from '@ent-core/router/routes/basic';
import { mainOutRoutes } from '@ent-core/router/routes/main-out';
import { PageEnum } from '@ent-core/logics/enums/page-enum';
import type { AppRouteRecordRaw } from '@ent-core/router/types';
import Login from '@ent-core/views/sys/login/login.vue';

import { t } from '@ent-core/hooks/web/use-i18n';

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: t('routes.basic.login'),
  },
};

// 绑定了component，需要优化
// Basic routing without permission
// TODO FIX, 分离会导致login界面刷新页面，页面空白
export function getBasicRoutes() {
  return [
    LoginRoute,
    RootRoute,
    ...mainOutRoutes,
    registerRedirectRoute(),
    registerPageNotFoundRoute(),
  ];
}
