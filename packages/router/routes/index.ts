import { registerPageNotFoundRoute } from '@ent-core/router/routes/basic';
import { registerRedirectRoute } from '@ent-core/router/routes/basic';
import { mainOutRoutes } from '@ent-core/router/routes/mainOut';
import { PageEnum } from '@ent-core/enums/pageEnum';
import type { AppRouteRecordRaw } from '@ent-core/router/types';
import Login from '@ent-core/views/sys/login/Login.vue';
//扫码路径获取路由信息
//TODO 目前只能固定目录
// const modules = import.meta.globEager(`/src/router/routes/modules/**/*.ts`);
//
// const routeModuleList: AppRouteModule[] = [];
//
// Object.keys(modules).forEach((key) => {
//   const mod = modules[key].default || {};
//   const modList = Array.isArray(mod) ? [...mod] : [mod];
//   routeModuleList.push(...modList);
// });

//export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

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
