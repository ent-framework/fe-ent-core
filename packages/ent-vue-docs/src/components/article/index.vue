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
          <div v-if="meta" class="article-meta">
            <span class="article-type">{{ meta.type }}</span>
            <template v-if="meta.category">
              <span class="separator">/</span>
              <span class="article-category">{{ meta.category }}</span>
            </template>
          </div>
          <h1 class="article-title">{{ title }}</h1>
          <div v-if="description" class="article-description">
            {{ description }}
          </div>
          <ChangelogBox v-if="changelog" :changelog="changelog"/>
        </div>
        <div class="article-content">
          <slot/>
        </div>
      </article>
      <arco-footer/>
    </main>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  provide,
  reactive, ref,
} from 'vue';
import {useI18n} from 'vue-i18n';
import AsideAnchor from '../aside-anchor/index.vue';
import ArcoFooter from '../footer/index.vue';
import {articleInjectionKey} from './context';
import {AnchorData} from '../aside-anchor/interface';
import ChangelogBox from '../changelog-box/index.vue';

export default defineComponent({
  name: 'ArcoArticle',
  components: {
    ChangelogBox,
    AsideAnchor,
    ArcoFooter,
  },
  props: {
    title: String,
    description: String,
    changelog: Array,
    meta: Object as PropType<{ category: string; type: string }>,
  },
  setup(props) {
    const {locale} = useI18n();
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
        removeAnchor: (href: string) => {
        },
      })
    );

    const toggleAnchor = () => {
      showAnchor.value = !showAnchor.value;
    };


    const cls = computed(() => [
      'arco-vue-main',
    ]);

    return {
      cls,
      locale,
      getMessage,
      anchors,
      showAnchor,
      toggleAnchor
    };
  },
});
</script>

<style lang="less" src="./style.less"/>
