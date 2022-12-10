export interface ContextOptions {
  errorFunction: AnyFunction<any>;
  msgFunction: AnyFunction<any>;
  errorModalFunction: AnyFunction<any>;
  noticeFunction: AnyFunction<any>;
  getTokenFunction: () => unknown;
  unauthorized: (msg?: string) => void;
  timeoutFunction: () => void;
  handleErrorFunction: (message?: string, mode?: string) => void;
  apiUrl?: string;
}
export let context: ContextOptions = {
  getTokenFunction: () => undefined,
  unauthorized: () => {},
  errorFunction: () => {},
  msgFunction: () => {},
  noticeFunction: () => {},
  errorModalFunction: () => {},
  handleErrorFunction: () => {},
  timeoutFunction: () => {},
  apiUrl: '',
};

export const initRequest = async (func: AnyFunction<any>) => {
  context = func();
};
