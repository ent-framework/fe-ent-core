import { defHttp } from 'fe-ent-core/utils/http/axios';
import { AreaModel, AreaParams } from 'fe-ent-core/api/demo/model/areaModel';

enum Api {
  AREA_RECORD = '/cascader/getAreaRecord',
}

export const areaRecord = (data: AreaParams) =>
  defHttp.post<AreaModel>({ url: Api.AREA_RECORD, data });
