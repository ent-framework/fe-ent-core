<template>
  <Footer v-if="getShowLayoutFooter" ref="footerRef" :class="prefixCls">
    <div :class="`${prefixCls}__links`">
      <a @click="openWindow(SITE_URL)">{{ t('layout.footer.onlinePreview') }}</a>

      <GithubFilled :class="`${prefixCls}__github`" @click="openWindow(GITHUB_URL)" />

      <a @click="openWindow(DOC_URL)">{{ t('layout.footer.onlineDocument') }}</a>
    </div>
    <div>Copyright &copy;2020 Vben Admin</div>
  </Footer>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { Layout } from 'ant-design-vue';

  import { GithubFilled } from '@ant-design/icons-vue';

  import { useDesign, useI18n, useLayoutHeight, useRootSetting } from 'fe-ent-core/es/hooks';
  import { openWindow } from 'fe-ent-core/es/utils';
  import { DOC_URL, GITHUB_URL, SITE_URL } from 'fe-ent-core/es/logics';

  import { useRouter } from 'vue-router';
  import type { ComponentRef } from 'fe-ent-core/es/types';

  export default defineComponent({
    name: 'LayoutFooter',
    components: { Footer: Layout.Footer, GithubFilled },
    setup() {
      const { t } = useI18n();
      const { getShowFooter } = useRootSetting();
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
        DOC_URL,
        GITHUB_URL,
        SITE_URL,
        openWindow,
        footerRef,
      };
    },
  });
</script>
