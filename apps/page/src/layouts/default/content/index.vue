<template>
  <div :class="[prefixCls, getLayoutContentMode]" v-loading="getOpenPageLoading && getPageLoading">
    <PageLayout />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import PageLayout from '@ent-core/layouts/page/index.vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useRootSetting } from '@ent-core/hooks/setting/use-root-setting';
  import { useTransitionSetting } from '@ent-core/hooks/setting/use-transition-setting';
  import { useContentViewHeight } from './use-content-view-height';

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
