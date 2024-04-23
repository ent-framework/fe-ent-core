import { computed, h, reactive, unref } from 'vue';
import { useI18n } from 'fe-ent-core/es/hooks';
import { useRouter } from 'vue-router';
import EntIcon from 'fe-ent-core/es/components/icon';
import { useMultipleTabStore } from '../../../../store/multiple-tab';
import { useTabs } from '../../../../hooks';
import { MenuEventEnum } from './types';
import type { RouteLocationNormalized } from 'vue-router';
import type { ComputedRef } from 'vue';
import type { DropMenu } from 'fe-ent-core/es/components/dropdown/interface';
import type { TabContentProps } from './types';
import type { Nullable } from 'fe-ent-core/es/types';

export function useTabDropdown(tabContentProps: TabContentProps, getIsTabs: ComputedRef<boolean>) {
  const state = reactive({
    current: null as Nullable<RouteLocationNormalized>,
    currentIndex: 0
  });

  const { t } = useI18n();
  const tabStore = useMultipleTabStore();
  const { currentRoute } = useRouter();
  const { refreshPage, closeAll, close, closeLeft, closeOther, closeRight } = useTabs();

  const getTargetTab = computed((): RouteLocationNormalized => {
    return unref(getIsTabs) ? tabContentProps.tabItem : unref(currentRoute);
  });

  /**
   * @description: drop-down list
   */
  const getDropMenuList = computed(() => {
    if (!unref(getTargetTab)) {
      return;
    }
    const { meta } = unref(getTargetTab);
    const { path } = unref(currentRoute);

    const curItem = state.current;

    const isCurItem = curItem ? curItem.path === path : false;

    // Refresh button
    const index = state.currentIndex;
    const refreshDisabled = !isCurItem;
    // Close left
    const closeLeftDisabled = index === 0 || !isCurItem;

    const disabled = tabStore.getTabList.length === 1;

    // Close right
    const closeRightDisabled =
      !isCurItem || (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0);
    const dropMenuList: DropMenu[] = [
      {
        icon: () => h(EntIcon, { icon: 'ant-design:redo-outlined' }),
        key: MenuEventEnum.REFRESH_PAGE,
        label: t('layout.multipleTab.reload'),
        disabled: refreshDisabled
      },
      {
        icon: () => h(EntIcon, { icon: 'ion:close-outline' }),
        key: MenuEventEnum.CLOSE_CURRENT,
        label: t('layout.multipleTab.close'),
        disabled: !!meta?.affix || disabled,
        appendDivider: true
      },
      {
        icon: () => h(EntIcon, { icon: 'ant-design:vertical-right-outlined' }),
        key: MenuEventEnum.CLOSE_LEFT,
        label: t('layout.multipleTab.closeLeft'),
        disabled: closeLeftDisabled
      },
      {
        icon: () => h(EntIcon, { icon: 'ant-design:vertical-left-outlined' }),
        key: MenuEventEnum.CLOSE_RIGHT,
        label: t('layout.multipleTab.closeRight'),
        disabled: closeRightDisabled,
        appendDivider: true
      },
      {
        icon: () => h(EntIcon, { icon: 'ant-design:align-center-outlined' }),
        key: MenuEventEnum.CLOSE_OTHER,
        label: t('layout.multipleTab.closeOther'),
        disabled: disabled || !isCurItem
      },
      {
        icon: () => h(EntIcon, { icon: 'ant-design:minus-outlined' }),
        key: MenuEventEnum.CLOSE_ALL,
        label: t('layout.multipleTab.closeAll'),
        disabled
      }
    ];

    return dropMenuList;
  });

  function handleContextMenu(tabItem: RouteLocationNormalized) {
    return (e: Event) => {
      if (!tabItem) {
        return;
      }
      e?.preventDefault();
      const index = tabStore.getTabList.findIndex((tab) => tab.path === tabItem.path);
      state.current = tabItem;
      state.currentIndex = index;
    };
  }

  // Handle right click event
  function handleMenuEvent(key: string): void {
    switch (key) {
      case MenuEventEnum.REFRESH_PAGE:
        // refresh page
        refreshPage();
        break;
      // Close current
      case MenuEventEnum.CLOSE_CURRENT:
        close(tabContentProps.tabItem);
        break;
      // Close left
      case MenuEventEnum.CLOSE_LEFT:
        closeLeft();
        break;
      // Close right
      case MenuEventEnum.CLOSE_RIGHT:
        closeRight();
        break;
      // Close other
      case MenuEventEnum.CLOSE_OTHER:
        closeOther();
        break;
      // Close all
      case MenuEventEnum.CLOSE_ALL:
        closeAll();
        break;
    }
  }
  return { getDropMenuList, handleMenuEvent, handleContextMenu };
}
