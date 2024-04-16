<template>
  <NButton v-bind="getBindValue" @click="onClick">
    <template #default="data">
      <Icon v-if="preIcon" :icon="preIcon" :size="iconSize" />
      <slot v-bind="data || {}" />
      <Icon v-if="postIcon" :icon="postIcon" :size="iconSize" />
    </template>
  </NButton>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { NButton } from 'naive-ui';
  import Icon from '../../../components/icon/src/icon.vue';
  import { useAttrs } from '../../../hooks/core/use-attrs';
  import { btnProps } from './props';

  /**
   * @docLocation https://raw.githubusercontent.com/vueComponent/ant-design-vue/4.0.0/components/button/index.zh-CN.md
   * @extends Button
   * @docLink https://next.antdv.com/components/button-cn
   */
  export default defineComponent({
    name: 'EntButton',
    components: {
      NButton,
      Icon,
    },
    inheritAttrs: false,
    props: btnProps,
    setup(props) {
      const attrs = useAttrs({ excludeDefaultKeys: false });
      const getBindValue = computed(() => ({ ...unref(attrs), ...props }));
      return {
        getBindValue,
      };
    },
  });
</script>
