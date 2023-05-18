export type { VueNode } from 'ant-design-vue/es/_util/type';

export type Nullable<T> = T | null;

export type Recordable<T = any> = Record<string, T>;

export type AnyPromiseFunction = (...arg: any[]) => PromiseLike<any>;

export type AnyNormalFunction = (...arg: any[]) => any;

export type AnyFunction = AnyNormalFunction | AnyPromiseFunction;

export type EmitType = (event: string, ...args: any[]) => void;

export type TargetContext = '_self' | '_blank';

export interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

export interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

export interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

export type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

export type RefType<T> = T | null;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type TimeoutHandle = ReturnType<typeof setTimeout>;
export type IntervalHandle = ReturnType<typeof setInterval>;

export interface ChangeEvent extends Event {
  target: HTMLInputElement;
}

export interface ViteEnv {
  VITE_BUILD_USE_MOCK: boolean;
  VITE_USE_PWA: boolean;
  VITE_HASH_ROUTER: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_USE_CDN: boolean;
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  VITE_BUILD_LEGACY: boolean;
  VITE_BUILD_USE_IMAGEMIN: boolean;
  VITE_GENERATE_UI: string;
}
