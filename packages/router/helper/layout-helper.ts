/**
 * Layout 管理，主要为了解耦
 */
import type { Plugin } from 'vue';

export interface LayoutManagement {
  use(name: string, layout: Plugin | Function): this;
  getLayout(name: string): Plugin | Function;
}

//const LayoutManagementKey: InjectionKey<LayoutManagement> = Symbol('layout-management');

const LayoutMap = new Map<string, Plugin | Function>();

const layoutMgt: LayoutManagement = {
  use(name: string, layout: Plugin | Function) {
    if (LayoutMap.has(name)) {
      console.log(`${name} has been registered.`);
    }
    LayoutMap.set(name, layout);
    return layoutMgt;
  },
  getLayout(name: string): Plugin | Function {
    if (!LayoutMap.has(name)) {
      console.log(`${name} is not found.`);
    }
    return LayoutMap.get(name) as Plugin;
  },
};

export function useLayout(): LayoutManagement {
  return layoutMgt;
}
