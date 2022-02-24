import type { AppRouteModule } from '@ent-core/router/types';

import { PAGE_NOT_FOUND_ROUTE } from '@ent-core/router/routes/basic';
import { REDIRECT_ROUTE } from '@ent-core/router/routes/basic';
import { mainOutRoutes } from '@ent-core/router/routes/mainOut';
import { PageEnum } from '@ent-core/enums/pageEnum';
import type { AppRouteRecordRaw } from '@ent-core/router/types';
import Login from '@ent-core/views/sys/login/Login.vue';
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
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
