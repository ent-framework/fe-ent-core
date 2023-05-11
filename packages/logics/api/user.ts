import { defHttp } from '@ent-core/utils/http/axios';
import { useGlobSetting } from '@ent-core/hooks';
import type { ErrorMessageMode } from '@ent-core/logics/types/axios';
import type { GetUserInfoModel, LoginParams, LoginResultModel } from '../model';
enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/user-info',
  GetPermCode = '/perm-code',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  const globSetting = useGlobSetting();
  const { userApiPrefix = '' } = globSetting;
  return defHttp.post<LoginResultModel>(
    {
      url: `${userApiPrefix}${Api.Login}`,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  const globSetting = useGlobSetting();
  const { userApiPrefix = '' } = globSetting;
  return defHttp.get<GetUserInfoModel>(
    { url: `${userApiPrefix}${Api.GetUserInfo}` },
    { errorMessageMode: 'none' },
  );
}

export function getPermCode() {
  const globSetting = useGlobSetting();
  const { userApiPrefix = '' } = globSetting;
  return defHttp.get<string[]>({ url: `${userApiPrefix}${Api.GetPermCode}` });
}

export function doLogout() {
  const globSetting = useGlobSetting();
  const { userApiPrefix = '' } = globSetting;
  return defHttp.get({ url: `${userApiPrefix}${Api.Logout}` });
}
