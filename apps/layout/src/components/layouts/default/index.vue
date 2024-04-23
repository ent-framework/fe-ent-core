<template>
  <NLayout :class="prefixCls" v-bind="lockEvents">
    <LayoutFeatures />
    <NConfigProvider v-if="getShowFullHeaderRef" :abstract="true" :theme="getComputedHeaderTheme">
      <LayoutHeader fixed />
    </NConfigProvider>
    <NLayout :has-sider="getShowSidebar || getIsMobile" collapse-mode="width">
      <NConfigProvider :abstract="true" :theme="getComputedMenuTheme">
        <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
      </NConfigProvider>
      <NLayout :class="`${prefixCls}-main`">
        <NConfigProvider :abstract="true" :theme="getComputedHeaderTheme">
          <LayoutMultipleHeader />
        </NConfigProvider>
        <LayoutContent />
        <LayoutFooter />
      </NLayout>
    </NLayout>
  </NLayout>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { NConfigProvider, NLayout } from 'naive-ui';

  import { useAppInject, useDesign, useTheme, useThemeSetting } from 'fe-ent-core/es/hooks';

  import { MenuModeEnum, MenuTypeEnum } from 'fe-ent-core/es/logics';
  import { createBreakpointListen } from 'fe-ent-core/es/hooks/event/use-breakpoint';
  import { useAppStore } from 'fe-ent-core/es/store';
  import { useHeaderSetting, useLayoutTheme, useLockPage, useMenuSetting } from '../../../hooks';
  import { useLayoutStore } from '../../../store/layout';
  import LayoutMultipleHeader from './header/multiple-header.vue';
  import LayoutSideBar from './sider/index.vue';
  import LayoutContent from './content/index.vue';
  import LayoutHeader from './header/index.vue';
  import LayoutFeatures from './feature/index.vue';
  import LayoutFooter from './footer/index.vue';

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      LayoutFeatures,
      LayoutFooter,
      LayoutHeader,
      LayoutContent,
      LayoutSideBar,
      LayoutMultipleHeader,
      NLayout,
      NConfigProvider,
    },
    setup() {
      const isMobile = ref(false);
      const { prefixCls } = useDesign('default-layout');
      const { getIsMobile } = useAppInject();
      const { getShowFullHeaderRef } = useHeaderSetting();
      const { getShowSidebar, getIsMixSidebar, getCollapsed } = useMenuSetting();
      const isSetState = ref(false);

      const appStore = useAppStore();
      const layoutStore = useLayoutStore();
      const { getTheme } = useTheme();
      const { getGlobalTheme } = useThemeSetting();
      const { getActualHeaderTheme, getActualMenuTheme } = useLayoutTheme();

      const getComputedHeaderTheme = computed(() => {
        return getTheme(unref(getActualHeaderTheme));
      });

      const getComputedMenuTheme = computed(() => {
        return getTheme(unref(getActualMenuTheme));
      });

      const getBodyTheme = computed(() => {
        return getTheme(unref(getGlobalTheme));
      });

      // Create a lock screen monitor
      const lockEvents = useLockPage();

      // Monitor screen breakpoint information changes
      createBreakpointListen(({ screenMap, sizeEnum, width }) => {
        const lgWidth = screenMap.get(sizeEnum.LG);
        if (lgWidth) {
          isMobile.value = width.value - 1 < lgWidth;
        }
        handleRestoreState();
      });

      /**
       * Used to maintain the state before the window changes
       */
      function handleRestoreState() {
        if (unref(isMobile)) {
          if (!unref(isSetState)) {
            isSetState.value = true;
            const {
              menuSetting: {
                type: menuType,
                mode: menuMode,
                collapsed: menuCollapsed,
                split: menuSplit,
              },
            } = layoutStore.getLayoutConfig;
            layoutStore.setLayoutConfig({
              menuSetting: {
                type: MenuTypeEnum.SIDEBAR,
                mode: MenuModeEnum.INLINE,
                collapsed: true,
                split: false,
              },
            });
            appStore.setBeforeMiniInfo({ menuMode, menuCollapsed, menuType, menuSplit });
          }
        } else {
          if (unref(isSetState)) {
            isSetState.value = false;
            const { menuMode, menuCollapsed, menuType, menuSplit } = appStore.getBeforeMiniInfo;
            layoutStore.setLayoutConfig({
              menuSetting: {
                type: menuType,
                mode: menuMode,
                collapsed: menuCollapsed,
                split: menuSplit,
              },
            });
          }
        }
      }

      return {
        getCollapsed,
        getShowFullHeaderRef,
        getShowSidebar,
        prefixCls,
        getIsMobile,
        getIsMixSidebar,
        lockEvents,
        getComputedHeaderTheme,
        getComputedMenuTheme,
        getBodyTheme,
      };
    },
  });
</script>
