import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '@ent-core/utils/http/axios';
import { useGlobSetting } from '@ent-core/hooks/setting/useGlobSetting';
import type { UploadFileParams } from '@ent-core/types/axios';
const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}
