import { resultSuccess } from '../_util';
import type { MockMethod } from 'vite-plugin-mock';

const demoList = (keyword, count = 20) => {
  const result = {
    list: [] as any[],
  };
  for (let index = 0; index < count; index++) {
    result.list.push({
      name: `${keyword ?? ''}选项${index}`,
      id: `${index}`,
    });
  }
  return result;
};

export default [
  {
    url: '/api/mock-post',
    timeout: 1000,
    method: 'post',
    response: ({ query }) => {
      return resultSuccess(query);
    },
  },
] as MockMethod[];
