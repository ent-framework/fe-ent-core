import type { RoleEnum } from '@ent-core/logics/enums/role-enum';
import type { RouteMeta, RouteRecordRaw, Router } from 'vue-router';
import type { defineComponent } from 'vue';
import type { Recordable } from '@ent-core/types';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  // | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta & {
    orderNo?: number;
    // title
    title: string;
    // dynamic router level.
    dynamicLevel?: number;
    // dynamic router real route path (For performance).
    realPath?: string;
    // Whether to ignore permissions
    ignoreAuth?: boolean;
    // role info
    roles?: RoleEnum[];
    // Whether not to cache
    ignoreKeepAlive?: boolean;
    // Is it fixed on tab
    affix?: boolean;
    // icon on tab
    icon?: string;
    frameSrc?: string;
    // current page transition
    transitionName?: string;
    // Whether the route has been dynamically added
    hideBreadcrumb?: boolean;
    // Hide submenu
    hideChildrenInMenu?: boolean;
    // Carrying parameters
    carryParam?: boolean;
    // Used internally to mark single-level menus
    single?: boolean;
    // Currently active menu
    currentActiveMenu?: string;
    // Never show in tab
    hideTab?: boolean;
    // Never show in menu
    hideMenu?: boolean;

    isLink?: boolean;
    // only build for Menu
    ignoreRoute?: boolean;
    // Hide path for children
    hidePathForChildren?: boolean;
  };
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}

export type Menu = {
  name: string;

  icon?: string;

  path: string;

  // path contains param, auto assignment.
  paramPath?: string;

  disabled?: boolean;

  children?: Menu[];

  orderNo?: number;

  roles?: RoleEnum[];

  meta?: Partial<RouteMeta>;

  tag?: MenuTag;

  hideMenu?: boolean;
};

export type MenuModule = {
  orderNo?: number;
  menu: Menu;
};

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw;

export interface EntRouter extends Router {
  getBasicRoutes(): AppRouteRecordRaw[];
  addBasicRoute(route: AppRouteRecordRaw): () => void;
  addBasicRoutes(routes: AppRouteRecordRaw[]): () => void;
  getBizRoutes(): AppRouteRecordRaw[];
  addBizRoute(route: AppRouteRecordRaw): () => void;
  // 导入业务路由
  addBizRoutes(routes: Record<string, Record<string, any>>): () => void;
  getWhiteRouteList(): string[];
}
