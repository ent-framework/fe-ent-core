import { createAxios } from './factory';

export const defHttp = createAxios();

export const replaceUrlWithVariables = (url: any, options: Record<string, string>): string => {
  if (Object.keys(options).length == 0 || !url) return url;
  let result = url.toString();
  Object.keys(options).forEach((key) => {
    result = result.replaceAll(`{${key}}`, options[key]);
  });
  return result;
};
