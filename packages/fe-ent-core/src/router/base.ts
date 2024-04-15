import { inject } from 'vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { noop } from '@vueuse/core';
import { getAppEnvConfig } from '@ent-core/utils/env';
import { routeWrapper } from '@ent-core/router/helper/route-helper';
import { routerKey } from './router_symbols';
import type { AppRouteRecordRaw, EntRouter } from './types';
import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

export function createEntRouter(): EntRouter {
  const appEnv = getAppEnvConfig();
  // app router
  const parent = createRouter({
    history: appEnv.VITE_HASH_ROUTER
      ? createWebHashHistory(appEnv.VITE_PUBLIC_PATH || '')
      : createWebHistory(appEnv.VITE_PUBLIC_PATH || ''),
    routes: [],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  });

  const publicRoutes: AppRouteRecordRaw[] = [];
  const authRoutes: AppRouteRecordRaw[] = [];
  let pageNotFound: AppRouteRecordRaw;

  function getPublicRoutes() {
    return publicRoutes;
  }

  function getAuthRoutes() {
    return authRoutes;
  }

  function addAuthRoutes(routes: AppRouteRecordRaw[]) {
    routes.forEach((c) => {
      routeWrapper(c);
      authRoutes.push(c);
    });
    return noop;
  }

  /***
   * 添加需要授权的路由，将路由信息缓存起来
   * 可以通过addAuthRoutes(import.meta.glob("*.ts"))方式在启动类中批量导入
   * @param modules
   */
  function importAuthRoutes(modules: Record<string, Record<string, any>>) {
    const routeModuleList: AppRouteRecordRaw[] = [];
    Object.keys(modules).forEach((key) => {
      const mod = modules[key].default || {};
      const modList = Array.isArray(mod) ? [...mod] : [mod];
      modList.forEach((c) => {
        routeWrapper(c);
      });
      routeModuleList.push(...modList);
    });
    authRoutes.push(...routeModuleList);
    return noop;
  }

  function addPublicRoute(route: AppRouteRecordRaw) {
    routeWrapper(route);
    publicRoutes.push(route);
    return parent.addRoute(route as RouteRecordRaw);
  }
  function addPublicRoutes(basicRoutes: AppRouteRecordRaw[]) {
    basicRoutes.forEach((route) => {
      addPublicRoute(route);
    });
    return noop;
  }
  //所有的BasicRoutes的path抽出成白名单
  function getPublicRoutePathList() {
    const paths: string[] = [];
    publicRoutes.forEach((route) => {
      getPathInner(route, paths);
    });
    return paths;
  }

  function getPathInner(route: AppRouteRecordRaw, paths: string[]) {
    paths.push(route.path);
    const children = route.children || [];
    children.forEach((child) => {
      getPathInner(child, paths);
    });
  }

  function getPageNotFoundRoute() {
    return pageNotFound;
  }

  function setPageNotFoundRoute(route: AppRouteRecordRaw) {
    pageNotFound = route;
    return noop;
  }

  const entRouter: EntRouter = {
    ...parent,
    getPublicRoutes,
    addPublicRoutes,
    getAuthRoutes,
    addAuthRoutes,
    importAuthRoutes,
    getPublicRoutePathList,
    getPageNotFoundRoute,
    setPageNotFoundRoute,
    install(app: App) {
      parent.install(app);
      // @ts-ignore
      const _entRouter = this;
      app.provide(routerKey, _entRouter);
    },
  };
  return entRouter;
}

export const entRouter = createEntRouter();

/**
 * 功能与vue-router的useRouter()类似，只是提供了更多的数据支持
 */
export function useEntRouter(): EntRouter {
  return inject(routerKey) as EntRouter;
}

/**
 * 重置路由，只保留基础路由，一般登出后需要调用
 */
export function resetRouter() {
  entRouter.getAuthRoutes().forEach((route) => {
    if (entRouter.hasRoute(route.name)) {
      entRouter.removeRoute(route.name);
    }
  });
}
