import { defHttp } from 'ent-fe-core/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/getMenuList',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};
