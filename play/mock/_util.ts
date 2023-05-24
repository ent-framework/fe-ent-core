// Interface data format used to return a unified format
import fs from 'fs';
import path from 'path';

export function resultSuccess<T = Recordable>(result: T, { message = 'ok' } = {}) {
  return {
    code: '00000',
    data: result,
    message,
    type: 'success',
  };
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = 'ok' } = {},
) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  };
}

export function resultError(message = 'Request failed', { code = -1, result = null } = {}) {
  return {
    code,
    result,
    message,
    type: 'error',
  };
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize));
  return ret;
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  const auth = headers?.authorization;
  if (auth && auth.startsWith('Bearer')) {
    return auth.slice(7);
  }
  return auth;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function parseFile(data, separator) {
  // 利用分隔符分割data
  // split 等同于数组的 split
  const bufArr = split(data, separator).slice(1, -1);

  bufArr.forEach((item) => {
    // 分割 head 与 body
    const [head, body] = split(item, '\r\n\r\n');
    // 可能会存在两行 head，所以用换行符 '\r\n' 分割一下
    // 这里的第一个元素是截取后剩下空 buffer，所以要剔除掉
    const headArr = split(head, '\r\n').slice(1);
    // head 的第一行肯定是 Content-Disposition
    // 通过这个字段肯定能拿到文件名
    // 通过parseHeader解析head
    const headerVal = parseHeader(headArr[0].toString());
    // 如果 head 内存在 filename 字段，则代表是一个文件
    if (headerVal.filename) {
      // fs.mkdir(path.resolve(process.cwd(), 'upload'));
      // 写入文件到磁盘
      fs.writeFile(
        path.resolve(process.cwd(), `upload/${headerVal.filename}`),
        body.slice(0, -2),
        (err) => {
          if (err) {
            console.log(err);
          }
        },
      );
    }
  });
}

function parseHeader(header) {
  const [name, value] = header.split(': ');
  const valueObj = {};
  value.split('; ').forEach((item) => {
    const [key, val = ''] = item.split('=');
    valueObj[key] = val && JSON.parse(val);
  });

  return valueObj;
}

function split(buffer, separator) {
  const res = [];
  let offset = 0;
  let index = buffer.indexOf(separator, 0);
  while (index != -1) {
    res.push(buffer.slice(offset, index));
    offset = index + separator.length;
    index = buffer.indexOf(separator, index + separator.length);
  }

  res.push(buffer.slice(offset));

  return res;
}
