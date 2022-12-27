import { LoginParams, LoginResultModel } from './model';
import { ErrorMessageMode } from './types/axios';
import { AppRouteRecordRaw } from '@ent-core/router/types';

export interface UserBridgeOptions {
  loginApi: (params: LoginParams, mode: ErrorMessageMode) => Promise<LoginResultModel>;
  getUserInfo: AnyFunction<any>;
  getPermCode: AnyFunction<any>;
  doLogout: AnyFunction<any>;
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
  errorFunction: AnyFunction<any>;
  msgFunction: AnyFunction<any>;
  errorModalFunction: AnyFunction<any>;
  noticeFunction: AnyFunction<any>;
  getTokenFunction: () => unknown;
  unauthorized: (msg?: string) => void;
  timeoutFunction: () => void;
  handleErrorFunction: (message?: string, mode?: string) => void;
  apiUrl?: string;
}
export let httpBridge: HttpBridgeOptions = {
  getTokenFunction: () => undefined,
  unauthorized: () => {},
  errorFunction: () => {},
  msgFunction: () => {},
  noticeFunction: () => {},
  errorModalFunction: () => {},
  handleErrorFunction: () => {},
  timeoutFunction: () => {},
  apiUrl: '',
};

export const initHttpBridge = async (func: AnyFunction<any>) => {
  httpBridge = func();
};

export const initUserBridge = async (func: AnyFunction<any>) => {
  userBridge = func();
};
