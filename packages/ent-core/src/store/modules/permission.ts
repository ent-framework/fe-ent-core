import { toRaw } from 'vue';
import { defineStore } from 'pinia';
import { useGlobSetting, useI18n, useMessage } from '../../hooks';
import {
  backendRouteFilter,
  flatMultiLevelRoutes,
  routeWrapper,
} from '../../router/helper/route-helper';
import { entRouter, transformRouteToMenu } from '../../router';
import { defaultProjectSetting } from '../../logics/settings/project-setting';
import { Factory, PermissionModeEnum } from '../../logics';
import { filter, isArray } from '../../utils';
import { useAppStore } from './app';
import { useUserStore } from './user';
import type { AppRouteRecordRaw, Menu } from '../../router';

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
}
export const usePermissionStore = defineStore('app-permission', {
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
  },
  actions: {
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
      const codeList = await Factory.getUserFactory().getPermCode();
      this.setPermCodeList(codeList);
    },
    // 构建路由信息
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const { t } = useI18n();
      const userStore = useUserStore();
      const appStore = useAppStore();
      const globSetting = useGlobSetting();

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
        let homePath: string = userStore.getUserInfo?.homePath || globSetting.homePath;
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
          routes = filter(entRouter.getAuthRoutes(), routeFilter);
          routes = routes.filter(routeFilter);
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes);

          break;

        case PermissionModeEnum.ROUTE_MAPPING: {
          routes = filter(entRouter.getAuthRoutes(), routeFilter);
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

          createMessage.info(t('sys.app.menuLoading'), {
            type: 'loading',
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
            if (
              userStore.getUserInfo &&
              userStore.getUserInfo.authorities &&
              isArray(userStore.getUserInfo.authorities)
            ) {
              this.setPermCodeList(userStore.getUserInfo.authorities);
            } else {
              await this.changePermissionCode();
            }
            // 从后端获取Menu
            routeList = (await Factory.getUserFactory().getMenuList()) as AppRouteRecordRaw[];
          } catch (error) {
            console.error(error);
          }
          // Dynamically introduce components
          if (routeList) {
            // 处理菜单信息
            routeList.forEach((c) => {
              routeWrapper(c);
            });
          }
          // 用服务器返回routeList去过滤router.bizRoutes，返回匹配的路由信息
          routeList = backendRouteFilter(entRouter.getAuthRoutes(), routeList);
          //  Background routing to menu structure
          const backMenuList = transformRouteToMenu(routeList);
          this.setBackMenuList(backMenuList);

          // remove meta.ignoreRoute item
          routeList = filter(routeList, routeRemoveIgnoreFilter);
          routeList = routeList.filter(routeRemoveIgnoreFilter);

          routes = flatMultiLevelRoutes(routeList);
          break;
        }
      }
      const pageNotFound = entRouter.getPageNotFoundRoute();
      if (pageNotFound) {
        routeWrapper(pageNotFound);
        // 404 路由一定要放最后面
        routes.push(pageNotFound);
      } else {
        console.error('PageNotFound is not existing, please set it');
      }

      patchHomeAffix(routes);
      return routes;
    },
  },
});
