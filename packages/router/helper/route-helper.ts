import { cloneDeep, merge, omit, set } from 'lodash-es';
import { isString, isUrl } from '@ent-core/utils/is';
import { useLayout } from '@ent-core/router/helper/layout-helper';
import type { AppRouteRecordRaw } from '@ent-core/router/types';

/**
 * Convert multi-level routing to level 2 routing
 * 处理路由，将多级树状路由转成单行多条模式
 */
export function flatMultiLevelRoutes(routeModules: AppRouteRecordRaw[]) {
  const modules: AppRouteRecordRaw[] = cloneDeep(routeModules);
  for (const routeModule of modules) {
    if (!isMultipleRoute(routeModule)) {
      continue;
    }
    promoteRouteLevel(routeModule);
  }
  return modules;
}

// Routing level upgrade
function promoteRouteLevel(routeModule: AppRouteRecordRaw) {
  // 临时容器
  const childrenContainer: AppRouteRecordRaw[] = [];
  addToChildren(routeModule.children || [], childrenContainer);
  if (childrenContainer.length > 0) {
    routeModule.children?.push(...childrenContainer);
  }
  // omit lodash的函数 对传入的item对象的children进行删除
  routeModule.children = routeModule.children?.map((item) => omit(item, 'children'));
}

// Add all sub-routes to the secondary route
// 将所有子路由添加到二级路由
function addToChildren(children: AppRouteRecordRaw[], childrenContainer: AppRouteRecordRaw[]) {
  for (const child of children) {
    childrenContainer.push(child);
    if (child.children?.length) {
      addToChildren(child.children, childrenContainer);
    }
  }
}

/***
 * 处理路由，将子路由path变成绝对path，并且设置component
 * @param route
 * @param parentPath
 */
export function normalizeRoutePath(route: AppRouteRecordRaw, parentPath?: string) {
  const layoutMgt = useLayout();
  if (isString(route.component)) {
    route.component = layoutMgt.getLayout(route.component as string);
  }
  if (hasChildren(route)) {
    const path = parentPath || route.path;
    route.children?.forEach((c) => {
      const { path: childPath } = c;
      if (
        path &&
        path.length > 0 &&
        childPath &&
        childPath.length > 0 &&
        !childPath.startsWith('/') &&
        !isUrl(childPath)
      ) {
        c.path = `${path}/${childPath}`;
      }
      if (isString(c.component)) {
        c.component = layoutMgt.getLayout(c.component as string);
      }
      if (hasChildren(c)) {
        normalizeRoutePath(c, c.path);
      }
    });
  }
}

function hasChildren(route: AppRouteRecordRaw) {
  return !!(route && Reflect.has(route, 'children') && route.children?.length);
}

function existInFilter(
  filters?: AppRouteRecordRaw[],
  target?: AppRouteRecordRaw,
): AppRouteRecordRaw | undefined {
  if (!filters || !target) {
    return undefined;
  }
  for (let index = 0; index < filters?.length; index++) {
    const c = filters[index];
    if (c.path === target?.path) {
      return omit(c, 'children');
    }
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
  filters?.forEach((route) => {
    const children: AppRouteRecordRaw[] = backendRouteFilter(bizRoutes, route?.children);
    const filtered = existInFilter(bizRoutes, route);
    if (filtered) {
      if (filtered && Reflect.has(filtered, 'meta')) {
        filtered.meta = merge(filtered.meta, route.meta);
      }
      if (children.length > 0) {
        set(filtered, 'children', children);
      }
      results.push(filtered);
    }
  });

  return results;
}

// Determine whether the level exceeds 2 levels
function isMultipleRoute(routeModule: AppRouteRecordRaw) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false;
  }

  const children = routeModule.children;

  let flag = false;
  for (const child of children) {
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}
