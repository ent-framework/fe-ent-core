import type { PropType as VuePropType, Plugin } from 'vue';

export type Recordable<T = any> = Record<string, T>;
export type Nullable<T> = T | null;
export type NonNullable<T> = T extends null | undefined ? never : T;
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type PropType<T> = VuePropType<T>;

export type Fn<T = any, R = T> = {
  (...arg: T[]): R;
};

export type EmitType = (event: string, ...args: any[]) => void;
export type TimeoutHandle = ReturnType<typeof setTimeout>;
export type LabelValueOptions = {
  label: string;
  value: any;
  [key: string]: string | number | boolean;
}[];

export interface ChangeEvent extends Event {
  target: HTMLInputElement;
}

export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

export type RefType<T> = T | null;

export type SFCWithInstall<T> = T & Plugin;

export type TargetContext = '_self' | '_blank';
