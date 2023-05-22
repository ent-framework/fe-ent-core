import { defHttp } from '@ent-core/utils/http/axios';
import type { AppRouteRecordRaw } from '@ent-core/router/types';
import type { Recordable } from '@ent-core/types';
enum Api {
  GetMenuList = '/menu-list',
  GetAppList = '/app-list',
}

export interface MenuFactory {
  getMenuList: (params: Recordable) => Promise<AppRouteRecordRaw[]>;
}

export class MenuService implements MenuFactory {
  getMenuList = (params: Recordable) => {
    return defHttp.get<AppRouteRecordRaw[]>({ url: Api.GetMenuList, params });
  };
}
