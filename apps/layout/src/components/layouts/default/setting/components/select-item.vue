<template>
  <div :class="prefixCls">
    <NText> {{ title }}</NText>
    <NSelect
      :value="getBindValue"
      :class="`${prefixCls}-select`"
      :disabled="disabled"
      size="small"
      :options="options"
      @update:value="handleChange"
    />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { NSelect, NText } from 'naive-ui';
  import { useDesign } from 'fe-ent-core/es/hooks';
  import type { Fn } from 'fe-ent-core/es/types';
  import type { HandlerEnum } from '../enum';
  import type { PropType } from 'vue';
  type LabelValueOptions = {
    label: string;
    value: any;
    [key: string]: string | number | boolean;
  }[];
  export default defineComponent({
    name: 'SelectItem',
    components: { NSelect, NText },
    props: {
      event: {
        type: Number as PropType<HandlerEnum>,
      },
      disabled: {
        type: Boolean,
      },
      title: {
        type: String,
      },
      handler: {
        type: Function as PropType<Fn>,
        default: () => ({}),
      },
      def: {
        type: [String, Number] as PropType<string | number>,
      },
      initValue: {
        type: [String, Number] as PropType<string | number>,
      },
      options: {
        type: Array as PropType<LabelValueOptions>,
        default: () => [],
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('setting-select-item');
      const getBindValue = computed(() => {
        return props.def || props.initValue;
      });

      function handleChange(key: string) {
        props.event && props.handler && props.handler(props.event, key);
      }
      return {
        prefixCls,
        handleChange,
        getBindValue,
      };
    },
  });
</script>
