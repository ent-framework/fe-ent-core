import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { inject } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { AppRouteModule, AppRouteRecordRaw, EntRouter } from './types';
import { getAppEnvConfig } from '@ent-core/utils/env';
import { normalizeRoutePath } from '@ent-core/router/helper/route-helper';
import { routerKey } from './router_symbols';

const noop = () => {};

export function createEntRouter(): EntRouter {
  const appEnv = getAppEnvConfig();
  // app router
  const parent = createRouter({
    history: createWebHashHistory(appEnv.VITE_PUBLIC_PATH || ''),
    routes: [],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  });

  const _whiteRouteList: string[] = [];
  const basicRoutes: AppRouteRecordRaw[] = [];
  const bizRoutes: AppRouteRecordRaw[] = [];

  function getBasicRoutes() {
    return basicRoutes;
  }

  function getBizRoutes() {
    return bizRoutes;
  }

  function addBizRoute(route: AppRouteRecordRaw) {
    normalizeRoutePath(route);
    bizRoutes.push(route);
    return noop;
  }

  /***
   * 添加业务路由，将路由信息缓存起来
   * 可以通过addBizRoutes(import.meta.globEager("*.ts"))方式在启动类中批量导入
   * @param modules
   */
  function addBizRoutes(modules: Record<string, Record<string, any>>) {
    const routeModuleList: AppRouteModule[] = [];
    Object.keys(modules).forEach((key) => {
      const mod = modules[key].default || {};
      const modList = Array.isArray(mod) ? [...mod] : [mod];
      modList.forEach((c) => {
        normalizeRoutePath(c);
      });
      routeModuleList.push(...modList);
    });
    bizRoutes.push(...routeModuleList);
    return noop;
  }

  function addBasicRoute(route: AppRouteRecordRaw) {
    normalizeRoutePath(route);
    basicRoutes.push(route);
    return parent.addRoute(route as RouteRecordRaw);
  }
  function addBasicRoutes(basicRoutes: AppRouteRecordRaw[]) {
    basicRoutes.forEach((route) => {
      addBasicRoute(route);
    });
    const whiteList: string[] = [];
    getRouteNames(basicRoutes, whiteList);
    _whiteRouteList.push(...whiteList);
    return noop;
  }
  function getWhiteRouteList() {
    return _whiteRouteList;
  }
  const entRouter = {
    ...parent,
    getBasicRoutes,
    addBasicRoute,
    addBasicRoutes,
    getBizRoutes,
    addBizRoute,
    addBizRoutes,
    getWhiteRouteList,
    install(app: App) {
      parent.install(app);
      // @ts-ignore
      const _entRouter = this;
      app.provide(routerKey, _entRouter);
    },
  };
  return entRouter;
}

export let entRouter = createEntRouter();

/**
 * 功能与vue-router的useRouter()类似，只是提供了更多的数据支持
 */
export function useEntRouter(): EntRouter {
  return inject(routerKey) as EntRouter;
}

// reset router
export function resetRouter() {
  const _whiteRouteList = entRouter.getWhiteRouteList();
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

// 内存回收
window.addEventListener('beforeunload', function () {
  // @ts-ignore
  entRouter = null;
});
