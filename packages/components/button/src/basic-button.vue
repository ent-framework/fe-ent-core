<template>
  <Button v-bind="getBindValue" :class="getButtonClass" @click="onClick">
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
  import { buttonProps } from './props';

  export default defineComponent({
    name: 'EntButton',
    components: {
      Button,
      Icon,
    },
    inheritAttrs: false,
    props: buttonProps,
    setup(props) {
      const attrs = useAttrs({ excludeDefaultKeys: false });
      const getButtonClass = computed(() => {
        const { color, disabled } = props;
        return [
          {
            [`ant-btn-${color}`]: !!color,
            [`is-disabled`]: disabled,
          },
        ];
      });

      // get inherit binding value
      const getBindValue = computed(() => ({ ...unref(attrs), ...props }));
      return {
        getButtonClass,
        getBindValue,
      };
    },
  });
</script>
