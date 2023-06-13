<template>
  <Footer v-if="getShowLayoutFooter" ref="footerRef" :class="prefixCls">
    <div :class="`${prefixCls}__links`" />
    <div>Copyright &copy;2020 Ent Admin</div>
  </Footer>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { Layout } from 'ant-design-vue';

  import { GithubFilled } from '@ant-design/icons-vue';

  import { useDesign, useI18n, useLayoutHeight } from 'fe-ent-core/es/hooks';
  import { openWindow } from 'fe-ent-core/es/utils';

  import { useRouter } from 'vue-router';
  import { useLayoutThemeSetting } from '../../../../hooks';
  import type { ComponentRef } from 'fe-ent-core/es/types';

  export default defineComponent({
    name: 'LayoutFooter',
    components: { Footer: Layout.Footer, GithubFilled },
    setup() {
      const { t } = useI18n();
      const { getShowFooter } = useLayoutThemeSetting();
      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('layout-footer');

      const footerRef = ref<ComponentRef>(null);
      const { setFooterHeight } = useLayoutHeight();

      const getShowLayoutFooter = computed(() => {
        if (unref(getShowFooter)) {
          const footerEl = unref(footerRef)?.$el;
          setFooterHeight(footerEl?.offsetHeight || 0);
        } else {
          setFooterHeight(0);
        }
        return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter;
      });

      return {
        getShowLayoutFooter,
        prefixCls,
        t,
        openWindow,
        footerRef,
      };
    },
  });
</script>
