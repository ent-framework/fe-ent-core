import type { Recordable } from '@ent-core/types';
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export interface RequestOptions {
  /**
   * Splicing request parameters to url
   */
  joinParamsToUrl?: boolean;
  /**
   * Format request parameter time
   */
  formatDate?: boolean;
  /**
   * Whether to process the request result
   */
  isTransformResponse?: boolean;
  /**
   * Whether to return native response headers
   * For example: use this attribute when you need to get the response headers
   */
  isReturnNativeResponse?: boolean;
  /**
   * Transform response data
   * @param data
   */
  transformResponse?: (data: any) => any;
  /**
   * Whether to join url
   */
  joinPrefix?: boolean;
  /**
   * Interface address, use the default apiUrl if you leave it blank
   */
  apiUrl?: string;
  /**
   * 请求拼接路径
   */
  urlPrefix?: string;
  /**
   * Error message prompt type
   */
  errorMessageMode?: ErrorMessageMode;
  /**
   * Whether to add a timestamp
   */
  joinTime?: boolean;
  /**
   * Ignore cancel token
   */
  ignoreCancelToken?: boolean;
  /**
   * Whether to send token in header
   */
  withToken?: boolean;
}

export interface Result<T = any> {
  code: string;
  type: 'success' | 'error' | 'warning';
  message: string;
  data: T;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
