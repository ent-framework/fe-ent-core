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
    useTransitionSetting
  } from 'fe-ent-core/es/hooks';
  import PageLayout from '../../page/index.vue';
  import { useLayoutThemeSetting } from '../../../../hooks';

  export default defineComponent({
    name: 'LayoutContent',
    components: { PageLayout },
    setup() {
      const { prefixCls } = useDesign('layout-content');
      const { getOpenPageLoading } = useTransitionSetting();
      const { getPageLoading } = useRootSetting();
      const { getLayoutContentMode } = useLayoutThemeSetting();

      useContentViewHeight();
      return {
        prefixCls,
        getOpenPageLoading,
        getLayoutContentMode,
        getPageLoading
      };
    }
  });
</script>
