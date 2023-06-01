import { computed, toRaw, unref } from 'vue';
import { uniq } from 'lodash-es';
import { useDebounceFn } from '@vueuse/shared';
import { getAllParentPath } from '@ent-core/router/helper/menu-helper';

import { useTimeoutFn } from '@ent-core/hooks/core/use-timeout';
import type { Ref } from 'vue';
import type { SimpleMenuState } from './types';
import type { Menu as MenuType } from '@ent-core/router/types';

export function useOpenKeys(
  menuState: SimpleMenuState,
  menus: Ref<MenuType[]>,
  accordion: Ref<boolean>,
  mixSider: Ref<boolean>,
  collapse: Ref<boolean>,
) {
  const debounceSetOpenKeys = useDebounceFn(setOpenKeys, 50);
  async function setOpenKeys(path: string) {
    const native = !mixSider.value;
    const menuList = toRaw(menus.value);
    const handle = () => {
      if (menuList?.length === 0) {
        menuState.selectedKeys = [];
        menuState.openKeys = [];
        menuState.defaultSelectedKeys = [];
        return;
      }
      const keys = getAllParentPath(menuList, path);

      if (unref(accordion)) {
        menuState.openKeys = uniq([...menuState.openKeys, ...keys]);
      } else {
        menuState.openKeys = keys;
      }
      //menuState.activeSubMenuNames = menuState.openNames;
    };
    if (native) {
      handle();
    } else {
      useTimeoutFn(handle, 30);
    }
  }

  const getOpenKeys = computed(() => {
    return unref(collapse) ? [] : menuState.openKeys;
  });

  return { setOpenKeys: debounceSetOpenKeys, getOpenKeys };
}
