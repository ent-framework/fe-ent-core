import { UploadApiResult } from './model/uploadModel';
import { defHttp } from 'fe-ent-core/utils/http/axios';
import type { UploadFileParams } from 'fe-ent-core/types/axios';
import { useGlobSetting } from 'fe-ent-core/hooks/setting';

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
