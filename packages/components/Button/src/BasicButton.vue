<template>
  <Button v-bind="getBindValue" :class="getButtonClass" @click="onClick">
    <template #default="data">
      <Icon :icon="preIcon" v-if="preIcon" :size="iconSize" />
      <slot v-bind="data || {}"></slot>
      <Icon :icon="postIcon" v-if="postIcon" :size="iconSize" />
    </template>
  </Button>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { Button } from 'ant-design-vue';
  import Icon from '@ent-core/components/Icon/src/Icon.vue';
  import { buttonProps } from './props';
  import { useAttrs } from '@ent-core/hooks/core/useAttrs';

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
