import { registerPageNotFoundRoute } from '@ent-core/router/routes/basic';
import { registerRedirectRoute } from '@ent-core/router/routes/basic';
import { mainOutRoutes } from '@ent-core/router/routes/mainOut';
import { PageEnum } from '@ent-core/enums/pageEnum';
import type { AppRouteRecordRaw } from '@ent-core/router/types';
import Login from '@ent-core/views/sys/login/Login.vue';

import { t } from '@ent-core/hooks/web/useI18n';

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

// Basic routing without permission
export function getBasicRoutes() {
  return [
    LoginRoute,
    RootRoute,
    ...mainOutRoutes,
    registerRedirectRoute(),
    registerPageNotFoundRoute(),
  ];
}
