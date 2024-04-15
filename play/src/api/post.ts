import { defHttp } from 'fe-ent-core/es/utils';

export const mockPost = (values) => defHttp.post<any>({ url: '/mock-post', data: values });
