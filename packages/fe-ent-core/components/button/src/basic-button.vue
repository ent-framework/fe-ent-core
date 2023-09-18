<template>
  <Button v-bind="getBindValue" @click="onClick">
    <template #default="data">
      <Icon v-if="preIcon" :icon="preIcon" :size="iconSize" />
      <slot v-bind="data || {}" />
      <Icon v-if="postIcon" :icon="postIcon" :size="iconSize" />
    </template>
  </Button>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { Button } from 'ant-design-vue';
  import Icon from '@ent-core/components/icon/src/icon.vue';
  import { useAttrs } from '@ent-core/hooks/core/use-attrs';
  import { btnProps } from './props';

  /**
   * @docLocation https://raw.githubusercontent.com/vueComponent/ant-design-vue/4.0.0/components/button/index.zh-CN.md
   * @extends Button
   * @docLink https://next.antdv.com/components/button-cn
   */
  export default defineComponent({
    name: 'EntButton',
    components: {
      Button,
      Icon,
    },
    inheritAttrs: false,
    props: btnProps,
    setup(props) {
      const attrs = useAttrs({ excludeDefaultKeys: false });
      // const { useToken } = useTheme();
      // const { token } = useToken();
      //
      // const appContext = useConfigContextInject();
      // const globalPrefix = appContext.getPrefixCls();

      const getBindValue = computed(() => ({ ...unref(attrs), ...props }));
      return {
        getBindValue,
      };
    },
  });
</script>
