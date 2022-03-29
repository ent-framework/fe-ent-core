import { defHttp } from '@ent-core/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from '../model/table-model';

enum Api {
  DEMO_LIST = '/table/getDemoList',
}

/**
 * @description: Get sample list value
 */

export const demoListApi = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.DEMO_LIST,
    params,
    headers: {
      ignoreCancelToken: 'true', //FIXME maybe cause error
    },
  });
