import type { RouteRecordRaw, Router } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';
import { AppRouteModule, AppRouteRecordRaw } from './types';
import { getAppEnvConfig } from '@ent-core/utils/env';
import { normalizeRoutePath } from '@ent-core/router/helper/route-helper';

export interface EntRouter extends Router {
  parent: Router;
  basicRoutes: AppRouteRecordRaw[];
  addBasicRoute: (route: AppRouteRecordRaw) => void;
  addBasicRoutes: (routes: AppRouteRecordRaw[]) => void;
  bizRoutes: AppRouteRecordRaw[];
  addBizRoute: (route: AppRouteRecordRaw) => void;
  // 导入业务路由
  addBizRoutes: (routes: Record<string, Record<string, any>>) => void;
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

const entRouter: EntRouter = {
  _whiteRouteList: [],
  parent,
  ...parent,
  basicRoutes: [],
  bizRoutes: [],
  addBizRoute: function (route: AppRouteRecordRaw): () => void {
    normalizeRoutePath(route);
    entRouter.bizRoutes.push(route);
    return parent.addRoute(route as RouteRecordRaw);
  },
  addBizRoutes: function (modules: Record<string, Record<string, any>>): () => void {
    const routeModuleList: AppRouteModule[] = [];
    Object.keys(modules).forEach((key) => {
      const mod = modules[key].default || {};
      const modList = Array.isArray(mod) ? [...mod] : [mod];
      modList.forEach((c) => {
        normalizeRoutePath(c);
      });
      routeModuleList.push(...modList);
    });
    entRouter.bizRoutes.push(...routeModuleList);
    return noop;
  },
  addBasicRoute: function (route: AppRouteRecordRaw): () => void {
    entRouter.basicRoutes.push(route);
    return parent.addRoute(route as RouteRecordRaw);
  },
  addBasicRoutes: function (basicRoutes: AppRouteRecordRaw[]): () => void {
    basicRoutes.forEach((route) => {
      entRouter.addBasicRoute(route);
      parent.addRoute(route as RouteRecordRaw);
    });
    const whiteList: string[] = [];
    getRouteNames(basicRoutes, whiteList);
    entRouter._whiteRouteList = whiteList;
    return noop;
  },
};

export function useEntRouter() {
  return entRouter;
}

// reset router
export function resetRouter() {
  const _whiteRouteList = entRouter._whiteRouteList;
  entRouter.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !_whiteRouteList.includes(name as string)) {
      entRouter.hasRoute(name) && entRouter.removeRoute(name);
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
  app.use(entRouter);
}
