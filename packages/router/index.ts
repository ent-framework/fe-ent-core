import type { RouteRecordRaw, Router } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';
import { AppRouteModule, AppRouteRecordRaw } from './types';
import { getAppEnvConfig } from '@ent-core/utils/env';

export interface EntRouter extends Router {
  parent: Router;
  basicRoutes: AppRouteRecordRaw[];
  addBasicRoute: (route: AppRouteRecordRaw) => void;
  addBasicRoutes: (routes: AppRouteRecordRaw[]) => void;
  extraRoutes: AppRouteRecordRaw[];
  addExtraRoute: (route: AppRouteRecordRaw) => void;
  addExtraRoutes: (routes: Record<string, Record<string, any>>) => void;
  _whiteRouteList: string[];
}
const appEnv = getAppEnvConfig();
// app router
const parent = createRouter({
  history: createWebHashHistory(appEnv.VITE_PUBLIC_PATH || ''),
  routes: [],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

const noop = () => {};

export const router: EntRouter = {
  _whiteRouteList: [],
  parent,
  ...parent,
  basicRoutes: [],
  extraRoutes: [],
  addExtraRoute: function (route: AppRouteRecordRaw): () => void {
    router.extraRoutes.push(route);
    return parent.addRoute(route as RouteRecordRaw);
  },
  addExtraRoutes: function (modules: Record<string, Record<string, any>>): () => void {
    const routeModuleList: AppRouteModule[] = [];

    Object.keys(modules).forEach((key) => {
      const mod = modules[key].default || {};
      const modList = Array.isArray(mod) ? [...mod] : [mod];
      routeModuleList.push(...modList);
    });
    router.extraRoutes.push(...routeModuleList);
    return noop;
  },
  addBasicRoute: function (route: AppRouteRecordRaw): () => void {
    router.basicRoutes.push(route);
    return parent.addRoute(route as RouteRecordRaw);
  },
  addBasicRoutes: function (basicRoutes: AppRouteRecordRaw[]): () => void {
    basicRoutes.forEach((route) => {
      router.addBasicRoute(route);
      parent.addRoute(route as RouteRecordRaw);
    });
    const whiteList: string[] = [];
    getRouteNames(basicRoutes, whiteList);
    router._whiteRouteList = whiteList;
    return noop;
  },
};

// reset router
export function resetRouter() {
  const _whiteRouteList = router._whiteRouteList;
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !_whiteRouteList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
// 白名单应该包含基本静态路由
const getRouteNames = (array: any[], whiteList: string[]) => {
  array.forEach((item) => {
    whiteList.push(item.name);
    getRouteNames(item.children || [], whiteList);
  });
};
// config router
export function setupRouter(app: App<Element>): void {
  app.use(router);
}
