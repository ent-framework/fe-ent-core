import type { AppRouteRecordRaw } from '@ent-core/router/types';
import type { AnyFunction } from '@ent-core/types';

export interface RouteBridgeOptions {
  getRootRoute: () => AppRouteRecordRaw;
  getRedirectRoute: () => AppRouteRecordRaw;
  getPageNotFoundRoute: () => AppRouteRecordRaw;
}

const emptyRoute: AppRouteRecordRaw = {
  name: '',
  path: '',
  meta: { title: '' },
};
export let routeBridge: RouteBridgeOptions = {
  getRootRoute: () => emptyRoute,
  getRedirectRoute: () => emptyRoute,
  getPageNotFoundRoute: () => emptyRoute,
};

export const initRouteBridge = (func: AnyFunction) => {
  routeBridge = func();
};
