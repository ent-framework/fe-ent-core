<template>
  <NRadioGroup v-bind="getBindValue">
    <NRadio v-for="item in options" :key="item.value" :value="item.value" :label="item.label">
      {{ item.label }}
    </NRadio>
  </NRadioGroup>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { NRadio, NRadioGroup } from 'naive-ui';
  import { radioProps } from 'naive-ui/es/radio';
  import type { PropType } from 'vue';
  import type { OptionsItem } from '../props';

  const props = {
    ...radioProps,
    options: {
      type: Array as PropType<OptionsItem[]>,
      default: () => []
    }
  };
  export default defineComponent({
    name: 'RadioGroup',
    components: {
      NRadio,
      NRadioGroup
    },
    inheritAttrs: false,
    props,
    setup(props, { attrs }) {
      const getBindValue = computed(() => ({
        ...props,
        ...attrs
      }));

      return {
        getBindValue
      };
    }
  });
</script>
