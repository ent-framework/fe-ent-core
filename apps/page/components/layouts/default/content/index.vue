<template>
  <div v-loading="getOpenPageLoading && getPageLoading" :class="[prefixCls, getLayoutContentMode]">
    <PageLayout />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import {
    useContentViewHeight,
    useDesign,
    useRootSetting,
    useTransitionSetting,
  } from 'fe-ent-core';
  import PageLayout from '../../page/index.vue';

  export default defineComponent({
    name: 'LayoutContent',
    components: { PageLayout },
    setup() {
      const { prefixCls } = useDesign('layout-content');
      const { getOpenPageLoading } = useTransitionSetting();
      const { getLayoutContentMode, getPageLoading } = useRootSetting();

      useContentViewHeight();
      return {
        prefixCls,
        getOpenPageLoading,
        getLayoutContentMode,
        getPageLoading,
      };
    },
  });
</script>
<style lang="less">
  @layout-content-prefix-cls: ~'@{vben-prefix}-layout-content';

  .@{layout-content-prefix-cls} {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;

    &.fixed {
      width: 1200px;
      margin: 0 auto;
    }

    &-loading {
      position: absolute;
      top: 200px;
      z-index: @page-loading-z-index;
    }
  }
</style>
