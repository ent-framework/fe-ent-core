<template>
  <component :is="`h${level}`" :id="href" class="anchor-head">
    <a class="anchor-link" :href="`${href}`" @click.prevent="handleClickCopy">
      <LinkOutlined />
    </a>
    <slot />
  </component>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { LinkOutlined } from '@ant-design/icons-vue';
  import { useMessage } from 'fe-ent-core/es/hooks';
  import copy from '../../utils/clipboard';

  export default defineComponent({
    name: 'AnchorHead',
    components: { LinkOutlined },
    props: {
      level: [Number, String],
      href: String,
    },
    setup() {
      const { createMessage } = useMessage();
      const handleClickCopy = (e: MouseEvent) => {
        const copyLink = (e.currentTarget as HTMLAnchorElement).href;
        if (copyLink) {
          copy(copyLink)
            .then(() => {
              createMessage.success('Copy Success!');
            })
            .catch(() => {
              createMessage.error('Copy Failed! Please try again.');
            });
        }
      };

      return {
        handleClickCopy,
      };
    },
  });
</script>

<style scoped lang="less" src="./style.less" />
