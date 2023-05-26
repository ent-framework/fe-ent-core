<template>
  <aside :class="cls">
    <div class="aside-top">
      <a-button :class="buttonCls" shape="circle" size="large" @click="$emit('buttonClick')">
        <right-outlined v-if="show" />
        <left-outlined v-else />
      </a-button>
    </div>
    <a-anchor :affix="false">
      <a-anchor-link
        v-for="(item, index) in anchors"
        :key="index"
        :href="item.href"
        :title="locale === 'zh_CN' ? item.title.zh_CN : item.title.en"
      />
      <a-anchor-link v-if="hasAPIAnchor" key="article-api" href="#API"> API </a-anchor-link>
    </a-anchor>
  </aside>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue';
  import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
  import Anchor from 'ant-design-vue/lib/anchor';
  import { useLocale } from '@ent-core/locales';

  const AAnchor = Anchor;
  const AAnchorLink = Anchor.Link;

  export default defineComponent({
    name: 'AsideAnchor',
    components: { RightOutlined, LeftOutlined, AAnchor, AAnchorLink },
    props: {
      anchors: {
        type: Array,
      },
      show: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['buttonClick'],
    setup(props) {
      const { getLocale: locale } = useLocale();
      const hasAPIAnchor = ref(false);

      const getMessage = (zh: string, en: string) => {
        return locale.value === 'zh_CN' ? zh : en;
      };

      const cls = computed(() => [
        'arco-vue-aside',
        {
          'arco-vue-aside-collapse': !props.show,
        },
      ]);

      const buttonCls = computed(() => [
        'aside-collapse-btn',
        {
          'aside-collapse-btn-collapse': !props.show,
        },
      ]);

      onMounted(() => {
        hasAPIAnchor.value = !!document.querySelector('.article-content #API');
      });

      return {
        locale,
        cls,
        buttonCls,
        hasAPIAnchor,
        getMessage,
      };
    },
  });
</script>

<style scoped lang="less" src="./style.less" />
