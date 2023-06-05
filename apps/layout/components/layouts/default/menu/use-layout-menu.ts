import { computed, ref, unref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { MenuSplitTyeEnum } from 'fe-ent-core/es/logics';
import { useAppInject, useMenuSetting } from 'fe-ent-core/es/hooks';
import {
  getChildrenMenus,
  getCurrentParentPath,
  getMenus,
  getShallowMenus,
} from 'fe-ent-core/es/router';
import { usePermissionStore } from 'fe-ent-core/es/store';
import { useThrottleFn } from '@vueuse/core';
import type { Ref } from 'vue';
import type { Menu } from 'fe-ent-core/es/router';

export function useSplitMenu(splitType: Ref<MenuSplitTyeEnum>) {
  // Menu array
  const menusRef = ref<Menu[]>([]);
  const { currentRoute } = useRouter();
  const { getIsMobile } = useAppInject();
  const permissionStore = usePermissionStore();
  const { setMenuSetting, getIsHorizontal, getSplit } = useMenuSetting();

  const throttleHandleSplitLeftMenu = useThrottleFn(handleSplitLeftMenu, 50);

  const splitNotLeft = computed(
    () => unref(splitType) !== MenuSplitTyeEnum.LEFT && !unref(getIsHorizontal),
  );

  const getSplitLeft = computed(
    () => !unref(getSplit) || unref(splitType) !== MenuSplitTyeEnum.LEFT,
  );

  const getSpiltTop = computed(() => unref(splitType) === MenuSplitTyeEnum.TOP);

  const normalType = computed(() => {
    return unref(splitType) === MenuSplitTyeEnum.NONE || !unref(getSplit);
  });

  watch(
    [() => unref(currentRoute).path, () => unref(splitType)],
    async ([path]: [string, MenuSplitTyeEnum]) => {
      if (unref(splitNotLeft) || unref(getIsMobile)) return;

      const { meta } = unref(currentRoute);
      const currentActiveMenu = meta.currentActiveMenu as string;
      let parentPath = await getCurrentParentPath(path);
      if (!parentPath) {
        parentPath = await getCurrentParentPath(currentActiveMenu);
      }
      if (parentPath) {
        await throttleHandleSplitLeftMenu(parentPath);
      }
    },
    {
      immediate: true,
    },
  );

  // Menu changes
  watch(
    [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
    () => {
      genMenus();
    },
    {
      immediate: true,
      deep: true,
    },
  );

  // split Menu changes
  watch(
    () => getSplit.value,
    () => {
      if (unref(splitNotLeft)) return;
      genMenus();
    },
  );

  // Handle left menu split
  async function handleSplitLeftMenu(parentPath: string) {
    if (unref(getSplitLeft) || unref(getIsMobile)) return;

    // spilt mode left
    const children = await getChildrenMenus(parentPath);

    if (!children || !children.length) {
      setMenuSetting({ hidden: true });
      menusRef.value = [];
      return;
    }

    setMenuSetting({ hidden: false });
    menusRef.value = children;
  }

  // get menus
  async function genMenus() {
    // normal mode
    if (unref(normalType) || unref(getIsMobile)) {
      menusRef.value = await getMenus();
      return;
    }

    // split-top
    if (unref(getSpiltTop)) {
      const shallowMenus = await getShallowMenus();
      menusRef.value = shallowMenus;
      return;
    }
  }

  return { menusRef };
}
