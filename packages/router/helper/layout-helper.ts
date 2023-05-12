/**
 * Layout 管理，主要为了解耦
 */
import type { Plugin } from 'vue';

export interface LayoutManagement {
  use(name: string, layout: Plugin): this;
  getLayout(name: string): Plugin;
}

//const LayoutManagementKey: InjectionKey<LayoutManagement> = Symbol('layout-management');

const LayoutMap = new Map<string, Plugin>();

const layoutMgt: LayoutManagement = {
  use(name: string, layout: Plugin) {
    LayoutMap.set(name, layout);
    return layoutMgt;
  },
  getLayout(name: string): Plugin {
    return LayoutMap.get(name) as Plugin;
  },
};

export function useLayout(): LayoutManagement {
  return layoutMgt;
}
