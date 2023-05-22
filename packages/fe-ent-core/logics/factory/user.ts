import { defHttp } from '@ent-core/utils/http/axios';
import { useGlobSetting } from '@ent-core/hooks';
import type { ErrorMessageMode } from '@ent-core/logics/types/axios';
import type { GetUserInfoModel, LoginParams, LoginResultModel } from '@ent-core/logics/types/user';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/user-info',
  GetPermCode = '/perm-code',
}

export interface UserFactory {
  loginApi: (params: LoginParams, mode?: ErrorMessageMode) => Promise<LoginResultModel>;
  getUserInfo: () => Promise<GetUserInfoModel>;
  getPermCode: () => Promise<string[]>;
  doLogout: () => Promise<any>;
}

export class UserService implements UserFactory {
  doLogout = () => {
    const globSetting = useGlobSetting();
    const { userApiPrefix = '' } = globSetting;
    return defHttp.get({ url: `${userApiPrefix}${Api.Logout}` });
  };

  getPermCode = () => {
    const globSetting = useGlobSetting();
    const { userApiPrefix = '' } = globSetting;
    return defHttp.get<string[]>({ url: `${userApiPrefix}${Api.GetPermCode}` });
  };

  getUserInfo = () => {
    const globSetting = useGlobSetting();
    const { userApiPrefix = '' } = globSetting;
    return defHttp.get<GetUserInfoModel>(
      { url: `${userApiPrefix}${Api.GetUserInfo}` },
      { errorMessageMode: 'none' },
    );
  };

  loginApi = (params: LoginParams, mode?: ErrorMessageMode) => {
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
  };
}
