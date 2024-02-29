import { defHttp } from '@ent-core/utils';

export const mockPost = (values) => defHttp.post<any>({ url: '/mock-post', data: values });
