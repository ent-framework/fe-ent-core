import { type AxiosProgressEvent } from 'axios';
import { defHttp } from '@ent-core/utils/http/axios';
import { useGlobSetting } from '@ent-core/hooks/setting/use-glob-setting';
import type { UploadApiResult } from '../model';
import type { UploadFileParams } from '@ent-core/logics/types/axios';
const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}
