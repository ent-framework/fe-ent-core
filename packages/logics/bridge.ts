import { LoginParams, LoginResultModel } from './model';
import { ErrorMessageMode } from './types/axios';
import { AppRouteRecordRaw } from '@ent-core/router/types';
import type { Recordable, AnyFunction } from '@ent-core/types';

export interface UserBridgeOptions {
  loginApi: (params: LoginParams, mode: ErrorMessageMode) => Promise<LoginResultModel>;
  getUserInfo: AnyFunction;
  getPermCode: AnyFunction;
  doLogout: AnyFunction;
  getMenuList: (params: Recordable) => Promise<AppRouteRecordRaw[]>;
}
export let userBridge: UserBridgeOptions = {
  loginApi: () => {
    return new Promise<LoginResultModel>(() => {});
  },
  getUserInfo: () => {},
  getPermCode: () => {},
  doLogout: () => {},
  getMenuList: () => {
    return new Promise<AppRouteRecordRaw[]>(() => {});
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
  unauthorized: () => {},
  error: () => {},
  msg: () => {},
  notice: () => {},
  errorModal: () => {},
  handleError: () => {},
  timeout: () => {},
  apiUrl: '',
};

export const initHttpBridge = async (func: AnyFunction) => {
  httpBridge = func();
};

export const initUserBridge = async (func: AnyFunction) => {
  userBridge = func();
};
