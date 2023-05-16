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
    roles?: RoleEnum[];
    dynamicLevel?: number;
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
