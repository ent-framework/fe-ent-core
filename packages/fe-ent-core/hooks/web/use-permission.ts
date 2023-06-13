import { intersection } from 'lodash-es';
import { useAppStore } from '@ent-core/store/modules/app';
import { usePermissionStore } from '@ent-core/store/modules/permission';
import { useUserStore } from '@ent-core/store/modules/user';

import { entRouter, resetRouter } from '@ent-core/router';

import { defaultProjectSetting } from '@ent-core/logics/settings/project-setting';
import { PermissionModeEnum } from '@ent-core/logics/enums/app-enum';

import { isArray } from '@ent-core/utils/is';
//import { useTabs } from './use-tabs';
import type { RouteRecordRaw } from 'vue-router';

// User permissions related operations
export function usePermission() {
  const userStore = useUserStore();
  const appStore = useAppStore();
  const permissionStore = usePermissionStore();
  //const { closeAll } = useTabs(entRouter);

  /**
   * Change permission mode
   */
  async function togglePermissionMode() {
    appStore.setProjectConfig({
      permissionMode:
        defaultProjectSetting.permissionMode === PermissionModeEnum.BACK
          ? PermissionModeEnum.ROUTE_MAPPING
          : PermissionModeEnum.BACK,
    });
    location.reload();
  }

  async function changePermissionMode(mode: string) {
    appStore.setProjectConfig({
      permissionMode: mode as PermissionModeEnum,
    });
  }

  /**
   * Reset and regain authority resource information
   * @param id
   */
  async function resume() {
    // TODO
    // const tabStore = useMultipleTabStore();
    // tabStore.clearCacheTabs();
    resetRouter();
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach((route) => {
      entRouter.addRoute(route as unknown as RouteRecordRaw);
    });
    permissionStore.setLastBuildMenuTime();
    // TODO
    // closeAll();
  }

  /**
   * Determine whether there is permission
   */
  function hasPermission(value?: string | string[], def = true): boolean {
    // Visible by default
    if (!value) {
      return def;
    }

    const permMode = defaultProjectSetting.permissionMode;

    if ([PermissionModeEnum.ROUTE_MAPPING, PermissionModeEnum.ROLE].includes(permMode)) {
      if (!isArray(value)) {
        return userStore.getRoleList?.includes(value);
      }
      return intersection(value, userStore.getRoleList).length > 0;
    }

    if (PermissionModeEnum.BACK === permMode) {
      const allCodeList = permissionStore.getPermCodeList as string[];
      if (!isArray(value)) {
        return allCodeList.includes(value);
      }
      return (intersection(value, allCodeList) as string[]).length > 0;
    }
    return true;
  }

  /**
   * refresh menu data
   */
  async function refreshMenu() {
    resume();
  }

  return { hasPermission, togglePermissionMode, changePermissionMode, refreshMenu };
}
