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
  error: AnyFunction<any>;
  msg: AnyFunction<any>;
  errorModal: AnyFunction<any>;
  notice: AnyFunction<any>;
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

export const initHttpBridge = async (func: AnyFunction<any>) => {
  httpBridge = func();
};

export const initUserBridge = async (func: AnyFunction<any>) => {
  userBridge = func();
};
