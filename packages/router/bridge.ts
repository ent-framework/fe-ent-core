import type { AppRouteRecordRaw } from '@ent-core/router/types';
import type { AnyFunction } from '@ent-core/types';

export interface RouteBridgeOptions {
  getRootRoute: () => AppRouteRecordRaw;
  getPageNotFoundRoute: () => AppRouteRecordRaw;
  getRedirectRoute: () => AppRouteRecordRaw;
  getErrorLogRoute: () => AppRouteRecordRaw;
}

const emptyRoute: AppRouteRecordRaw = {
  name: '',
  path: '',
  meta: { title: '' },
};
export let routeBridge: RouteBridgeOptions = {
  getRootRoute: () => emptyRoute,
  getPageNotFoundRoute: () => emptyRoute,
  getRedirectRoute: () => emptyRoute,
  getErrorLogRoute: () => emptyRoute,
};

export const initRouteBridge = (func: AnyFunction) => {
  routeBridge = func();
};
