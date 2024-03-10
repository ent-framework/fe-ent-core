import { toRaw } from 'vue';
import { cloneDeep } from 'lodash-es';
import { findPath, treeMap } from '@ent-core/utils/helper/tree-helper';
import type { RouteParams } from 'vue-router';
import type { AppRouteRecordRaw, Menu, MenuModule } from '@ent-core/router/types';
import type { Recordable } from '@ent-core/types';

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[];
  return (menuList || []).map((item) => item.path);
}

// Parsing the menu module
export function transformMenuModule(menuModule: MenuModule): Menu {
  const { menu } = menuModule;
  const menuList = [menu];
  return menuList[0];
}

// 将路由转换成菜单
export function transformRouteToMenu(routeModList: AppRouteRecordRaw[], routerMapping = false) {
  // 借助 lodash 深拷贝
  const cloneRouteModList = cloneDeep(routeModList);
  const routeList: AppRouteRecordRaw[] = [];

  // 对路由项进行修改
  cloneRouteModList.forEach((item) => {
    if (routerMapping && item.meta?.hideChildrenInMenu && typeof item.redirect === 'string') {
      item.path = item.redirect;
    }

    if (item.meta?.single) {
      const realItem = item?.children?.[0];
      realItem && routeList.push(realItem);
    } else {
      routeList.push(item);
    }
  });
  // 提取树指定结构
  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node;

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {}),
      };
    },
  });
  return cloneDeep(list);
}

/**
 * config menu with given params
 */
const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g;

export function configureDynamicParamsMenu(menu: Menu, params: RouteParams) {
  const { path, paramPath } = toRaw(menu);
  let realPath = paramPath ? paramPath : path;
  if (realPath) {
    const matchArr = realPath.match(menuParamRegex);

    matchArr?.forEach((it) => {
      const realIt = it.slice(1);
      if (params[realIt]) {
        realPath = realPath.replace(`:${realIt}`, params[realIt] as string);
      }
    });
    // save original param path.
    if (!paramPath && matchArr && matchArr.length > 0) {
      menu.paramPath = path;
    }
    // TODO 这里可能引起面包屑bug
    menu.path = realPath;
  }
  // children
  menu.children?.forEach((item) => configureDynamicParamsMenu(item, params));
}
