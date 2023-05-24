<template>
  <Layout :class="prefixCls" v-bind="lockEvents">
    <LayoutFeatures />
    <LayoutHeader v-if="getShowFullHeaderRef" fixed />
    <Layout :class="[layoutClass]">
      <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
      <Layout :class="`${prefixCls}-main`">
        <LayoutMultipleHeader />
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { Layout } from 'ant-design-vue';

  import {
    useAppInject,
    useDesign,
    useHeaderSetting,
    useLockPage,
    useMenuSetting,
  } from 'fe-ent-core';

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
    },
    setup() {
      const { prefixCls } = useDesign('default-layout');
      const { getIsMobile } = useAppInject();
      const { getShowFullHeaderRef } = useHeaderSetting();
      const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting();

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
      };
    },
  });
</script>
