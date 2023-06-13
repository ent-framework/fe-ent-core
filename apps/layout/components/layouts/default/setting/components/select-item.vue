<template>
  <div :class="prefixCls">
    <Text> {{ title }}</Text>
    <Select
      v-bind="getBindValue"
      :class="`${prefixCls}-select`"
      :disabled="disabled"
      size="small"
      :options="options"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Select, Typography } from 'ant-design-vue';
  import { useDesign } from 'fe-ent-core/es/hooks';
  import type { ChangeEvent } from 'fe-ent-core/es/types';
  import type { HandlerEnum } from '../enum';
  import type { PropType } from 'vue';
  import {Fn} from "fe-ent-core/es/types";
  type LabelValueOptions = {
    label: string;
    value: any;
    [key: string]: string | number | boolean;
  }[];
  export default defineComponent({
    name: 'SelectItem',
    components: { Select, Text: Typography.Text },
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
        return props.def ? { value: props.def, defaultValue: props.initValue || props.def } : {};
      });

      function handleChange(e: ChangeEvent) {
        props.event && props.handler && props.handler(props.event, e);
      }
      return {
        prefixCls,
        handleChange,
        getBindValue,
      };
    },
  });
</script>
