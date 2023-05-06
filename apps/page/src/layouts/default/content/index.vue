<template>
  <div :class="[prefixCls, getLayoutContentMode]" v-loading="getOpenPageLoading && getPageLoading">
    <PageLayout />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import PageLayout from '../../page/index.vue';
  import { useDesign } from 'fe-ent-core/lib/hooks';
  import { useRootSetting } from 'fe-ent-core/lib/hooks';
  import { useTransitionSetting } from 'fe-ent-core/lib/hooks';
  import { useContentViewHeight } from 'fe-ent-core/lib/hooks';

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
