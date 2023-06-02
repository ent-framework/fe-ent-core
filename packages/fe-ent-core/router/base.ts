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

  const basicRoutes: AppRouteRecordRaw[] = [];
  const bizRoutes: AppRouteRecordRaw[] = [];
  let pageNotFound: AppRouteRecordRaw;

  function getBasicRoutes() {
    return basicRoutes;
  }

  function getAuthRoutes() {
    return bizRoutes;
  }

  function addAuthRoute(route: AppRouteRecordRaw) {
    routeWrapper(route);
    bizRoutes.push(route);
    return noop;
  }

  /***
   * 添加业务路由，将路由信息缓存起来
   * 可以通过addBizRoutes(import.meta.globEager("*.ts"))方式在启动类中批量导入
   * @param modules
   */
  function addAuthRoutes(modules: Record<string, Record<string, any>>) {
    const routeModuleList: AppRouteRecordRaw[] = [];
    Object.keys(modules).forEach((key) => {
      const mod = modules[key].default || {};
      const modList = Array.isArray(mod) ? [...mod] : [mod];
      modList.forEach((c) => {
        routeWrapper(c);
      });
      routeModuleList.push(...modList);
    });
    bizRoutes.push(...routeModuleList);
    return noop;
  }

  function addBasicRoute(route: AppRouteRecordRaw) {
    routeWrapper(route);
    basicRoutes.push(route);
    return parent.addRoute(route as RouteRecordRaw);
  }
  function addBasicRoutes(basicRoutes: AppRouteRecordRaw[]) {
    basicRoutes.forEach((route) => {
      addBasicRoute(route);
    });
    return noop;
  }
  //所有的BasicRoutes的path抽出成白名单
  function getWhiteRouteList() {
    const paths: string[] = [];
    basicRoutes.forEach((route) => {
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

  const entRouter = {
    ...parent,
    getBasicRoutes,
    addBasicRoute,
    addBasicRoutes,
    getAuthRoutes,
    addAuthRoute,
    addAuthRoutes,
    getWhiteRouteList,
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
  const _whiteRouteList = entRouter.getWhiteRouteList();
  entRouter.getRoutes().forEach((route) => {
    const { name, path } = route;
    if (name && !_whiteRouteList.includes(path as string)) {
      entRouter.hasRoute(name) && entRouter.removeRoute(name);
    }
  });
}
