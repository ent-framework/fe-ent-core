<template>
  <Layout :class="prefixCls" v-bind="lockEvents">
    <LayoutFeatures />
    <ConfigProvider v-if="getShowFullHeaderRef" :theme="getComputedHeaderTheme">
      <LayoutHeader fixed />
    </ConfigProvider>
    <Layout :class="[layoutClass]">
      <ConfigProvider :theme="getComputedMenuTheme">
        <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
      </ConfigProvider>
      <Layout :class="`${prefixCls}-main`">
        <ConfigProvider :theme="getComputedHeaderTheme">
          <LayoutMultipleHeader />
        </ConfigProvider>
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { ConfigProvider, Layout } from 'ant-design-vue';

  import { useAppInject, useDesign, useTheme } from 'fe-ent-core/es/hooks';

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
      Layout,
      ConfigProvider,
    },
    setup() {
      const isMobile = ref(false);
      const { prefixCls } = useDesign('default-layout');
      const { getIsMobile } = useAppInject();
      const { getShowFullHeaderRef } = useHeaderSetting();
      const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting();
      const isSetState = ref(false);

      const appStore = useAppStore();
      const layoutStore = useLayoutStore();
      const { getTheme } = useTheme();
      const { getActualHeaderTheme, getActualMenuTheme } = useLayoutTheme();

      const getComputedHeaderTheme = computed(() => {
        return getTheme(unref(getActualHeaderTheme));
      });

      const getComputedMenuTheme = computed(() => {
        return getTheme(unref(getActualMenuTheme));
      });

      // Create a lock screen monitor
      const lockEvents = useLockPage();

      const layoutClass = computed(() => {
        const cls: string[] = ['ant-layout'];
        if (unref(getIsMixSidebar) || unref(getShowMenu)) {
          cls.push('ant-layout-has-sider');
        }
        return cls;
      });

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
        getShowFullHeaderRef,
        getShowSidebar,
        prefixCls,
        getIsMobile,
        getIsMixSidebar,
        layoutClass,
        lockEvents,
        getComputedHeaderTheme,
        getComputedMenuTheme,
      };
    },
  });
</script>
