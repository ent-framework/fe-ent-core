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
  /**
   * 路由名称
   */
  name: string;
  /**
   * meta
   */
  meta: AppRouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export interface AppRouteMeta extends RouteMeta {
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

export interface EntRouter extends Router {
  /**
   * 获取基础路由
   */
  getBasicRoutes(): AppRouteRecordRaw[];
  /**
   * 添加基础路由
   */
  addBasicRoute(route: AppRouteRecordRaw): () => void;
  /**
   * 批量添加基础路由
   */
  addBasicRoutes(routes: AppRouteRecordRaw[]): () => void;
  /**
   * 获取认证路由
   */
  getAuthRoutes(): AppRouteRecordRaw[];
  /**
   * 添加认证路由
   */
  addAuthRoute(route: AppRouteRecordRaw): () => void;
  /**
   * 批量添加认证路由
   */
  addAuthRoutes(routes: Record<string, Record<string, any>>): () => void;

  /**
   * 获取404路由
   */
  getPageNotFoundRoute(): AppRouteRecordRaw;
  /**
   * 设置404路由
   */
  setPageNotFoundRoute(route: AppRouteRecordRaw): () => void;

  /**
   * 获取白名单路由
   */
  getWhiteRouteList(): string[];
}
