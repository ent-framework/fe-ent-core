import { pathToRegexp } from 'path-to-regexp';
import { cloneDeep } from 'lodash-es';
import { useAppStore } from '../../store/modules/app';
import { usePermissionStore } from '../../store/modules/permission';
import { getAllParentPath } from '../../router/helper/menu-helper';
import { filter } from '../../utils/helper/tree-helper';
import { isUrl } from '../../utils/is';
import { useEntRouter } from '../../router/base';
import { PermissionModeEnum } from '../../logics/enums/app-enum';
import type { RouteRecordNormalized } from 'vue-router';
import type { Menu } from '../../router/types';

// ===========================
// ==========Helper===========
// ===========================

const getPermissionMode = () => {
  const appStore = useAppStore();
  return appStore.getProjectConfig.permissionMode;
};
const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK;
};

const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING;
};

const isRoleMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROLE;
};

function getAsyncMenus() {
  const permissionStore = usePermissionStore();
  const menuFilter = (items: Menu[]) => {
    return items.filter((item) => {
      const show = !item.meta?.hideMenu && !item.hideMenu;
      if (show && item.children) {
        item.children = menuFilter(item.children);
      }
      return show;
    });
  };
  if (isBackMode()) {
    const menus = permissionStore.getBackMenuList;
    return menuFilter(cloneDeep(menus));
  } else if (isRouteMappingMode()) {
    const menus = permissionStore.getFrontMenuList;
    return menuFilter(cloneDeep(menus));
  }
  return [];
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = getAsyncMenus();
  if (isRoleMode()) {
    const entRouter = useEntRouter();
    const routes = entRouter.getRoutes();
    return filter(menus, basicFilter(routes));
  }
  return menus;
};

export function getCurrentParentPath(currentPath: string) {
  const menus = getAsyncMenus();
  const allParentPath = getAllParentPath(menus, currentPath);
  return allParentPath?.[0];
}

// Get the level 1 menu, delete children
export async function getShallowMenus(): Promise<Menu[]> {
  const menus = await getAsyncMenus();
  const shallowMenuList = menus.map((item) => ({ ...item, children: undefined }));
  if (isRoleMode()) {
    const entRouter = useEntRouter();
    const routes = entRouter.getRoutes();
    return shallowMenuList.filter(basicFilter(routes));
  }
  return shallowMenuList;
}

// Get the children of the menu
export async function getChildrenMenus(parentPath: string) {
  const menus = await getMenus();
  const parent = menus.find((item) => item.path === parentPath);
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
    return [] as Menu[];
  }
  if (isRoleMode()) {
    const entRouter = useEntRouter();
    const routes = entRouter.getRoutes();
    return filter(parent.children, basicFilter(routes));
  }
  return parent.children;
}

function basicFilter(routes: RouteRecordNormalized[]) {
  return (menu: Menu) => {
    const matchRoute = routes.find((route) => {
      if (isUrl(menu.path)) return true;
      const { regexp } = pathToRegexp(route.path);
      if (route.meta?.carryParam) {
        return regexp.test(menu.path);
      }
      const isSame = route.path === menu.path;
      if (!isSame) return false;

      if (route.meta?.ignoreAuth) return true;

      return isSame || regexp.test(menu.path);
    });

    if (!matchRoute) return false;
    menu.icon = (menu.icon || matchRoute.meta.icon) as string;
    menu.meta = matchRoute.meta;
    return true;
  };
}
