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
//
// declare module 'vue-router' {
//   interface RouteMeta extends Record<string | number | symbol, unknown> {
//     orderNo?: number;
//     // title
//     title: string;
//     // dynamic router level.
//     dynamicLevel?: number;
//     // dynamic router real route path (For performance).
//     realPath?: string;
//     // Whether to ignore permissions
//     ignoreAuth?: boolean;
//     // role info
//     roles?: RoleEnum[];
//     // Whether not to cache
//     ignoreKeepAlive?: boolean;
//     // Is it fixed on tab
//     affix?: boolean;
//     // icon on tab
//     icon?: string;
//     frameSrc?: string;
//     // current page transition
//     transitionName?: string;
//     // Whether the route has been dynamically added
//     hideBreadcrumb?: boolean;
//     // Hide submenu
//     hideChildrenInMenu?: boolean;
//     // Carrying parameters
//     carryParam?: boolean;
//     // Used internally to mark single-level menus
//     single?: boolean;
//     // Currently active menu
//     currentActiveMenu?: string;
//     // Never show in tab
//     hideTab?: boolean;
//     // Never show in menu
//     hideMenu?: boolean;
//
//     isLink?: boolean;
//     // only build for Menu
//     ignoreRoute?: boolean;
//     // Hide path for children
//     hidePathForChildren?: boolean;
//   }
// }
