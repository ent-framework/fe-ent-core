<template>
  <section class="code-block">
    <anchor-head :level="2" :href="`${getFullPath}?${$attrs.id}`">{{
      locale === 'zh_CN' ? title.zh_CN : title.en
    }}</anchor-head>
    <slot name="description" />
    <slot />
  </section>
</template>

<script lang="ts">
  import { computed, defineComponent, inject } from 'vue';
  import { useLocale } from 'fe-ent-core/es/locales';
  import { useRouter } from 'vue-router';
  import AnchorHead from '../anchor-head/index.vue';
  import { articleInjectionKey } from '../article/context';
  import type { PropType } from 'vue';

  export default defineComponent({
    name: 'CodeBlock',
    components: {
      AnchorHead,
    },
    props: {
      title: Object as PropType<Record<'zh_CN' | 'en', string>>,
    },
    setup(props, { attrs }) {
      const articleCtx = inject(articleInjectionKey);
      const { getLocale: locale } = useLocale();
      articleCtx?.addAnchor({
        href: `${attrs.id}`,
        title: props.title,
      });
      const router = useRouter();
      const getFullPath = computed(() => {
        return `#${router.currentRoute.value.path}`;
      });
      return {
        locale,
        getFullPath,
      };
    },
  });
</script>

<style scoped lang="less" src="./style.less" />
