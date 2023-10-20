import { configureDynamicParamsMenu } from '@ent-core/router/helper/menu-helper';
import { PermissionModeEnum } from '@ent-core/logics/enums/app-enum';
import { useAppStore } from '@ent-core/store/modules/app';

import { usePermissionStore } from '@ent-core/store/modules/permission';
import type { Menu } from '@ent-core/router/types';
import type { Router } from 'vue-router';

export function createParamMenuGuard(router: Router) {
  const permissionStore = usePermissionStore();
  router.beforeEach(async (to, _, next) => {
    // filter no name route
    if (!to.name) {
      next();
      return;
    }

    // menu has been built.
    if (!permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }
    let menus: Menu[] = [];
    if (isBackMode()) {
      menus = permissionStore.getBackMenuList;
    } else if (isRouteMappingMode()) {
      menus = permissionStore.getFrontMenuList;
    }
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params));

    next();
  });
}

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
