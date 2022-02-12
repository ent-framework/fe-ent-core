import type { AppRouteModule } from 'fe-ent-core/router/types';

import { PAGE_NOT_FOUND_ROUTE } from 'fe-ent-core/router/routes/basic';
import { REDIRECT_ROUTE } from 'fe-ent-core/router/routes/basic';
import { mainOutRoutes } from 'fe-ent-core/router/routes/mainOut';
import { PageEnum } from 'fe-ent-core/enums/pageEnum';
import type { AppRouteRecordRaw } from 'fe-ent-core/router/types';

//扫码路径获取路由信息
//TODO 目前只能固定目录
const modules = import.meta.globEager(`/src/router/routes/modules/**/*.ts`);

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

import { t } from 'fe-ent-core/hooks/web/useI18n';

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
  component: () => import('fe-ent-core/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
