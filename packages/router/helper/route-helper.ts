import type { AppRouteModule, AppRouteRecordRaw } from '@ent-core/router/types';
import type { Router, RouteRecordNormalized } from 'vue-router';
import { cloneDeep, omit, set } from 'lodash';
import { createRouter, createWebHashHistory } from 'vue-router';

/**
 * Convert multi-level routing to level 2 routing
 */
export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules);
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index];
    if (!isMultipleRoute(routeModule)) {
      continue;
    }
    promoteRouteLevel(routeModule);
  }
  return modules;
}

// Routing level upgrade
function promoteRouteLevel(routeModule: AppRouteModule) {
  // Use vue-router to splice menus
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  });

  const routes = router.getRoutes();
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;

  routeModule.children = routeModule.children?.map((item) => omit(item, 'children'));
}

export function normalizeRoutePath(route: AppRouteRecordRaw) {
  if (hasChildren(route)) {
    const { path = '' } = route;
    route.children?.forEach((c) => {
      const { path: childPath = '' } = c;
      if (path.length > 0 && childPath.length > 0 && !childPath.startsWith('/')) {
        c.path = path + '/' + childPath;
      }
    });
  }
}

function hasChildren(route: AppRouteRecordRaw) {
  return !!(route && Reflect.has(route, 'children') && route.children?.length);
}

// Add all sub-routes to the secondary route
function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteModule,
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    const route = routes.find((item) => item.name === child.name);
    if (!route) {
      continue;
    }
    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteModule);
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
}

function existInFilter(
  filters: AppRouteRecordRaw[],
  target: AppRouteRecordRaw,
): AppRouteRecordRaw | undefined {
  for (let index = 0; index < filters.length; index++) {
    if (filters[index].path === target.path) {
      return filters[index];
    }
    const c = filters[index];
    if (hasChildren(c) && c.children?.length) {
      const exist = existInFilter(c.children, target);
      if (exist) {
        return exist;
      }
    }
  }
  return undefined;
}

export function backendRouteFilter(bizRoutes?: AppRouteRecordRaw[], filters?: AppRouteRecordRaw[]) {
  if (!filters) {
    return [];
  }
  const results: AppRouteRecordRaw[] = [];
  bizRoutes?.forEach((route) => {
    const hc = hasChildren(route);
    const target = omit(route, 'children');
    const filtered = existInFilter(filters, route);
    const children: AppRouteRecordRaw[] = [];
    if (hc) {
      children.push(...backendRouteFilter(route.children, filters));
    }
    if (filtered || children.length > 0) {
      set(target, 'children', children);
      results.push({ ...filtered, ...target });
    }
  });
  return results;
}

// Determine whether the level exceeds 2 levels
function isMultipleRoute(routeModule: AppRouteModule) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false;
  }

  const children = routeModule.children;

  let flag = false;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}
