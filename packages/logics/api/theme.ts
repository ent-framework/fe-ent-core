import { defHttp } from '@ent-core/utils/http/axios';
import { LoginResultModel, GetUserInfoModel } from '../model';
import { useGlobSetting } from '@ent-core/hooks';
enum Api {
  GetThemeSetting = '/get-theme-setting',
  SaveThemeSetting = '/save-theme-setting',
}

export function saveThemeSetting(params: Recordable) {
  const globSetting = useGlobSetting();
  const { userApiPrefix = '' } = globSetting;
  return defHttp.post<LoginResultModel>({
    url: `${userApiPrefix}${Api.SaveThemeSetting}`,
    params,
  });
}

export function getThemeSetting() {
  const globSetting = useGlobSetting();
  const { userApiPrefix = '' } = globSetting;
  return defHttp.get<GetUserInfoModel>({ url: `${userApiPrefix}${Api.GetThemeSetting}` });
}
