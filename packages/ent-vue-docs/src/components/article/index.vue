<template>
  <div>
    <aside-anchor
      v-if="anchors && anchors.length > 0"
      :show="showAnchor"
      :anchors="anchors"
      @button-click="toggleAnchor"
    />
    <main :class="cls">
      <article class="arco-vue-article">
        <div class="article-header">
          <div class="article-meta">
            <BreadCrumb />
          </div>
          <h1 class="article-title">{{ title }}</h1>
          <div v-if="description" class="article-description">
            {{ description }}
          </div>
          <ChangelogBox v-if="changelog" :changelog="changelog" />
        </div>
        <div class="article-content">
          <slot />
        </div>
      </article>
      <arco-footer />
    </main>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, provide, reactive, ref } from 'vue';
  import { useLocale } from '@ent-core/locales';
  import ArcoFooter from '../footer/index.vue';
  import ChangelogBox from '../changelog-box/index.vue';
  import AsideAnchor from '../aside-anchor/index.vue';
  import BreadCrumb from '../bread-crumb/index.vue';
  import { articleInjectionKey } from './context';
  import type { AnchorData } from '../aside-anchor/interface';
  import type { PropType } from 'vue';

  export default defineComponent({
    name: 'ArcoArticle',
    components: {
      ChangelogBox,
      AsideAnchor,
      ArcoFooter,
      BreadCrumb,
    },
    props: {
      title: String,
      description: String,
      changelog: Array,
      meta: Object as PropType<{ category: string; type: string }>,
    },
    setup() {
      const { getLocale: locale } = useLocale();
      const showAnchor = ref(true);
      const getMessage = (zh: string, en: string) => {
        return locale.value === 'zh_CN' ? zh : en;
      };

      const anchors = reactive<AnchorData[]>([]);

      provide(
        articleInjectionKey,
        reactive({
          anchors,
          addAnchor: (data: AnchorData) => {
            anchors.push(data);
          },
          removeAnchor: (href: string) => {},
        }),
      );

      const toggleAnchor = () => {
        showAnchor.value = !showAnchor.value;
      };

      const cls = computed(() => ['arco-vue-main']);

      return {
        cls,
        locale,
        getMessage,
        anchors,
        showAnchor,
        toggleAnchor,
      };
    },
  });
</script>

<style lang="less" src="./style.less" />
