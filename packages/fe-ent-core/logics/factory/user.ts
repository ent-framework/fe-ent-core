import { defHttp } from '@ent-core/utils/http';
import { useGlobSetting } from '@ent-core/hooks';
import type { ErrorMessageMode } from '@ent-core/logics/types/axios';
import type {
  LoginParams,
  LoginResultModel,
  Session,
  UserInfoModel,
} from '@ent-core/logics/types/user';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/user-info',
  GetPermCode = '/perm-code',
  GetSession = '/session',
}

export interface UserFactory {
  getSession: (remember_me?: string) => Promise<Session>;
  loginApi: (params: LoginParams, mode?: ErrorMessageMode) => Promise<LoginResultModel>;
  getUserInfo: () => Promise<UserInfoModel>;
  getPermCode: () => Promise<string[]>;
  doLogout: () => Promise<any>;
}

export class UserService implements UserFactory {
  getSession = (rememberMeJwt?: string) => {
    const globSetting = useGlobSetting();
    const { userApiPrefix = '' } = globSetting;
    return defHttp.get<Session>({
      url: `${userApiPrefix}${Api.GetSession}`,
      params: { remember_me: rememberMeJwt },
    });
  };
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
    return defHttp.get<UserInfoModel>(
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
