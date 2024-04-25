import type { VNode } from 'vue';

export type { ExtractPublicPropTypes } from 'naive-ui/es/_utils';

declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void;
export type VueNode = VNodeChildAtom | VNodeChildAtom[] | VNode;

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

export type LabelValueOptions = {
  label: string;
  value: any;
  [key: string]: string | number | boolean;
}[];

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
  VITE_HASH_ROUTER: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  VITE_BUILD_USE_IMAGEMIN: boolean;
}
// 通用的数据类型，标识Key的Value形式
export type ValueAtom = string | number;
export type Value = ValueAtom | string[] | number[] | ValueAtom[];
