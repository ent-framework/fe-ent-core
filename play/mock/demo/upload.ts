import {parseFile, resultError, resultPageSuccess, resultSuccess} from '../_util';
import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/upload',
    timeout: 100,
    method: 'post',
    rawResponse: (req, res) => {
      // 创建一个 0 字节的内存，用来存储请求体的内容
      const separator = `--${req.headers['content-type'].split('boundary=')[1]}`;
      let data = Buffer.alloc(0);
      req.on('data', (chunk) => {
        data = Buffer.concat([data, chunk]);
      });

      req.on('end', () => {
        parseFile(data, separator);
        res.end();
      });
    },
  },
] as MockMethod[];
