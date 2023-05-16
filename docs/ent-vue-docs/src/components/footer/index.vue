<template>
  <footer class="arco-site-footer">

  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { Message } from '@arco-design/web-vue';
import joinChat from '../../utils/join-chart';
import IconArco from '../../assets/footer/arco.svg';
import IconArcoColor from '../../assets/footer/arco-color.svg';
import Logo from '../logo/index.vue';

export default defineComponent({
  name: 'ArcoFooter',
  components: {
    IconArco,
    IconArcoColor,
    Logo,
  },
  setup() {
    const { t } = useI18n();

    const relevant = [
      {
        title: 'design',
        list: [
          {
            text: 'spec',
            link: '/docs/spec/introduce',
          },
          {
            text: 'principle',
            link: '/docs/spec/philosophy',
          },
        ],
      },
      {
        title: 'component',
        list: [
          // {
          //   text: 'overview',
          //   link: '/vue/components/overview',
          // },
          {
            text: 'start',
            link: '/vue/docs/start',
          },
          {
            text: 'changelog',
            link: '/vue/docs/changelog',
          },
        ],
      },
      {
        title: 'ecosystem',
        list: [
          {
            text: 'designLab',
            link: '/themes/stores',
          },
          {
            text: 'material',
            link: '/material',
          },
          {
            text: 'pro',
            link: '/pro',
          },
        ],
      },
      {
        title: 'resource',
        list: [
          {
            text: 'componentFigma',
            link: 'https://www.figma.com/file/M66cTiLXHa4SVyZIlfY5Pb/arco-Design-System?node-id=7945%3A44563',
          },
          {
            text: 'iconFigma',
            link: 'https://www.figma.com/file/1ohmb16op4ogbI09ojLR5W/Arco-Design-IconsFigma',
          },
        ],
      },
      // {
      //   title: 'about',
      //   list: [
      //     {
      //       text: 'dashboard',
      //       link: '/dashboard',
      //     },
      //   ],
      // },
    ];

    const toBeOpen = () => {
      Message.info('Opening soon');
    };

    const latestYear = new Date().getFullYear();

    return {
      t,
      relevant,
      toBeOpen,
      joinChat,
      latestYear,
    };
  },
});
</script>

<style lang="less" src="./style.less" />
