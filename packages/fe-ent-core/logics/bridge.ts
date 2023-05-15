import { noop } from '@vueuse/core';
import type { AppRouteRecordRaw } from '@ent-core/router/types';
import type { LoginParams, LoginResultModel } from './model';
import type { ErrorMessageMode } from './types/axios';
import type { AnyFunction, Recordable } from '@ent-core/types';

export interface UserBridgeOptions {
  loginApi: (params: LoginParams, mode: ErrorMessageMode) => Promise<LoginResultModel>;
  getUserInfo: AnyFunction;
  getPermCode: AnyFunction;
  doLogout: AnyFunction;
  getMenuList: (params: Recordable) => Promise<AppRouteRecordRaw[]>;
}
export let userBridge: UserBridgeOptions = {
  loginApi: () => {
    return new Promise<LoginResultModel>(noop);
  },
  getUserInfo: noop,
  getPermCode: noop,
  doLogout: noop,
  getMenuList: () => {
    return new Promise<AppRouteRecordRaw[]>(noop);
  },
};

export interface HttpBridgeOptions {
  error: AnyFunction;
  msg: AnyFunction;
  errorModal: AnyFunction;
  notice: AnyFunction;
  getToken: () => unknown;
  unauthorized: (msg?: string) => void;
  timeout: () => void;
  handleError: (message?: string, mode?: string) => void;
  apiUrl?: string;
}
export let httpBridge: HttpBridgeOptions = {
  getToken: () => undefined,
  unauthorized: noop,
  error: noop,
  msg: noop,
  notice: noop,
  errorModal: noop,
  handleError: noop,
  timeout: noop,
  apiUrl: '',
};

export const initHttpBridge = async (func: AnyFunction) => {
  httpBridge = func();
};

export const initUserBridge = async (func: AnyFunction) => {
  userBridge = func();
};
