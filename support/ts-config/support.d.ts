import type { ComponentPublicInstance, FunctionalComponent } from 'vue';

declare global {
  const process: {
    env: {
      NODE_ENV: string;
    };
  };

  declare function parseInt(s: string | number, radix?: number): number;

  declare function parseFloat(string: string | number): number;
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const Component: DefineComponent<any, any, any>;
  export default Component;
}

// declare module 'ant-design-vue/es/locale/*' {
//   import { Locale } from 'ant-design-vue/types/locale-provider';
//   const locale: Locale & ReadonlyRecordable;
//   export default locale as Locale & ReadonlyRecordable;
// }

declare module 'virtual:*' {
  const result: any;
  export default result;
}

interface Window {
  $loadingBar?: import('naive-ui').LoadingBarProviderInst;
  $dialog?: import('naive-ui').DialogProviderInst;
  $message?: import('naive-ui').MessageProviderInst;
  $notification?: import('naive-ui').NotificationProviderInst;
}
