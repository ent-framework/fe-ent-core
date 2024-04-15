import { type AxiosProgressEvent } from 'axios';
import { noop } from '@vueuse/core';
import { useUserStore } from '../../store';
import { defHttp } from '../../utils/http';
import { useGlobSetting } from '../../hooks/setting/use-glob-setting';
import type { UploadFileParams } from '../../logics/types/axios';
import type { UploadApiResult } from '../../logics/types/upload';

export interface HttpFactory {
  unauthorized: () => Promise<any>;
  uploadApi: (
    params: UploadFileParams,
  ) => Promise<import('axios').AxiosResponse<UploadApiResult, any>>;
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void;
}

export class HttpService implements HttpFactory {
  public unauthorized = () => {
    const userStore = useUserStore();
    return userStore.logout(true);
  };
  public uploadApi = (params: UploadFileParams) => {
    const { uploadUrl = '' } = useGlobSetting();
    return defHttp.uploadFile<UploadApiResult>(
      {
        url: uploadUrl,
        onUploadProgress: this.onUploadProgress,
      },
      params,
    );
  };
  onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    return noop;
  };
}
