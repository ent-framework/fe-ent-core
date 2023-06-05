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
  import { computed, defineComponent, unref } from 'vue';
  import { ConfigProvider, Layout } from 'ant-design-vue';

  import {
    useAppInject,
    useDesign,
    useHeaderSetting,
    useLockPage,
    useMenuSetting,
    useTheme,
  } from 'fe-ent-core/es/hooks';

  import LayoutMultipleHeader from './header/multiple-header.vue';
  import LayoutSideBar from './sider/index.vue';
  import LayoutContent from './content/index.vue';
  import LayoutHeader from './header/index.vue';
  import LayoutFeatures from './feature/index.vue';
  import LayoutFooter from './footer/index.vue';

  // @ts-nocheck
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
      const { prefixCls } = useDesign('default-layout');
      const { getIsMobile } = useAppInject();
      const { getShowFullHeaderRef } = useHeaderSetting();
      const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting();

      const { getTheme, getActualHeaderTheme, getActualMenuTheme } = useTheme();

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
