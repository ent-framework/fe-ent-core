import { defHttp } from '@ent-core/utils/http/axios';
import { getMenuListResultModel } from '../model';
import { AppRouteRecordRaw } from '@ent-core/router/types';
import type { Recordable } from '@ent-core/types';
enum Api {
  GetMenuList = '/menu-list',
  GetAppList = '/app-list',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = (params: Recordable) => {
  return defHttp.get<AppRouteRecordRaw>({ url: Api.GetMenuList, params });
};

export const getAppList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetAppList });
};
