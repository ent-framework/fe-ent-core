import { toRaw } from 'vue';
import { defineStore } from 'pinia';
import { useI18n } from '@ent-core/hooks/web/use-i18n';
import { store } from '@ent-core/store/pinia';
import {
  backendRouteFilter,
  flatMultiLevelRoutes,
  normalizeRoutePath,
} from '@ent-core/router/helper/route-helper';
import { transformRouteToMenu } from '@ent-core/router/helper/menu-helper';

import { defaultProjectSetting } from '@ent-core/logics/settings/project-setting';
import { PermissionModeEnum } from '@ent-core/logics/enums/app-enum';
import { routeBridge } from '@ent-core/router/bridge';
import { filter } from '@ent-core/utils/helper/tree-helper';
import { userBridge } from '@ent-core/logics/bridge';
import { useMessage } from '@ent-core/hooks/web/use-message';
import { PageEnum } from '@ent-core/logics/enums/page-enum';
import { entRouter } from '@ent-core/router/base';
import { useAppStoreWithOut } from './app';
import { useUserStore } from './user';
import type { AppRouteRecordRaw, Menu, MenuModule } from '@ent-core/router/types';

export interface PermissionState {
  // Permission code list
  permCodeList: string[] | number[];
  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean;
  // To trigger a menu update
  lastBuildMenuTime: number;
  // Backstage menu list
  backMenuList: Menu[];
  frontMenuList: Menu[];
  menuModules: MenuModule[];
}
export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    permCodeList: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
    // Backstage menu list
    backMenuList: [],
    // menu List
    frontMenuList: [],

    menuModules: [],
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList;
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList;
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList;
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
    getMenuModules(): MenuModule[] {
      return this.menuModules;
    },
  },
  actions: {
    importMenuModules(modules: Record<string, { [key: string]: any }>) {
      Object.keys(modules).forEach((key) => {
        const mod = modules[key].default || {};
        const modList = Array.isArray(mod) ? [...mod] : [mod];
        this.menuModules.push(...modList);
      });
    },

    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },

    setBackMenuList(list: Menu[]) {
      this.backMenuList = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },

    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list;
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = Date.now();
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.permCodeList = [];
      this.backMenuList = [];
      this.lastBuildMenuTime = 0;
    },
    async changePermissionCode() {
      const codeList = await userBridge.getPermCode();
      this.setPermCodeList(codeList);
    },
    // 构建路由信息
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const { t } = useI18n();
      const userStore = useUserStore();
      const appStore = useAppStoreWithOut();

      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList) || [];
      const { permissionMode = defaultProjectSetting.permissionMode } = appStore.getProjectConfig;

      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some((role) => roles.includes(role));
      };

      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { ignoreRoute } = meta || {};
        return !ignoreRoute;
      };

      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return;
        let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME;
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = `${parentPath}/`;
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route;
            const currentPath = path.startsWith('/') ? path : parentPath + path;
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string;
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true });
                throw new Error('end');
              }
            }
            children && children.length > 0 && patcher(children, currentPath);
          });
        }
        try {
          patcher(routes);
        } catch {
          // 已处理完毕跳出循环
        }
        return;
      };

      switch (permissionMode) {
        case PermissionModeEnum.ROLE:
          routes = filter(entRouter.getBizRoutes(), routeFilter);
          routes = routes.filter(routeFilter);
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes);

          break;

        case PermissionModeEnum.ROUTE_MAPPING: {
          routes = filter(entRouter.getBizRoutes(), routeFilter);
          routes = routes.filter(routeFilter);
          // 根据已有的树状路由提取Menu
          const menuList: AppRouteRecordRaw[] = transformRouteToMenu(routes, true);
          routes = filter(routes, routeRemoveIgnoreFilter);
          routes = routes.filter(routeRemoveIgnoreFilter);
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
          });

          this.setFrontMenuList(menuList);
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes);
          break;
        }
        //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
        case PermissionModeEnum.BACK: {
          const { createMessage } = useMessage();

          createMessage.info({
            content: t('sys.app.menuLoading'),
            duration: 1,
          });

          // !Simulate to obtain permission codes from the background,
          // this function may only need to be executed once, and the actual project can be put at the right time by itself
          let routeList: AppRouteRecordRaw[] = [];
          let entryPath = window.location.pathname || '/';
          if (entryPath === '/') {
            entryPath = 'index.html';
          }
          //获取登录人的PermissionCode
          try {
            await this.changePermissionCode();
            // 从后端获取Menu
            routeList = (await userBridge.getMenuList({ entryPath })) as AppRouteRecordRaw[];
          } catch (error) {
            console.error(error);
          }
          // Dynamically introduce components
          if (routeList) {
            // 处理菜单信息
            routeList.forEach((c) => {
              normalizeRoutePath(c);
            });
          }
          // 用服务器返回routeList去过滤router.bizRoutes，返回匹配的路由信息
          routeList = backendRouteFilter(entRouter.getBizRoutes(), routeList);
          //  Background routing to menu structure
          const backMenuList = transformRouteToMenu(routeList);
          this.setBackMenuList(backMenuList);

          // remove meta.ignoreRoute item
          routeList = filter(routeList, routeRemoveIgnoreFilter);
          routeList = routeList.filter(routeRemoveIgnoreFilter);

          routeList = flatMultiLevelRoutes(routeList);
          routes = [...routeList];
          break;
        }
      }
      // 404 路由一定要放最后面
      routes.push(routeBridge.getPageNotFoundRoute());
      patchHomeAffix(routes);
      return routes;
    },
  },
});

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
