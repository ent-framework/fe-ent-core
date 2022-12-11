import { LoginParams, LoginResultModel } from "./model";
import { ErrorMessageMode } from './types/axios';

export interface UserBridgeOptions {
  loginApi: (params: LoginParams, mode: ErrorMessageMode) => Promise<LoginResultModel>;
  getUserInfo: AnyFunction<any>;
  getPermCode: AnyFunction<any>;
  doLogout: AnyFunction<any>;

  getMenuList: AnyFunction<any>;
}
export let userBridge: UserBridgeOptions = {
  loginApi: () => {
    return new Promise<LoginResultModel>(() => {});
  },
  getUserInfo: () => {},
  getPermCode: () => {},
  doLogout: () => {},
  getMenuList: () => {},
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
