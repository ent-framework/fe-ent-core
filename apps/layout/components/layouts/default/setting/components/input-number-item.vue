<template>
  <div :class="prefixCls">
    <Text> {{ title }}</Text>
    <InputNumber
      v-bind="$attrs"
      size="small"
      :class="`${prefixCls}-input-number`"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { InputNumber, Typography } from 'ant-design-vue';
  import { inputNumberProps } from 'ant-design-vue/es/input-number';
  import { useDesign } from 'fe-ent-core/es/hooks';
  import type { PropType } from 'vue';
  import type { HandlerEnum } from '../enum';
  import type { Fn } from 'fe-ent-core/es/types';

  const props = {
    event: {
      type: Number as PropType<HandlerEnum>,
    },
    handler: {
      type: Function as PropType<Fn>,
      default: () => ({}),
    },
    title: {
      type: String,
    },
    ...inputNumberProps(),
  };

  export default defineComponent({
    name: 'InputNumberItem',
    components: { InputNumber, Text: Typography.Text },
    extends: InputNumber,
    props,
    setup(props) {
      const { prefixCls } = useDesign('setting-input-number-item');

      function handleChange(e) {
        props.event && props.handler && props.handler(props.event, e);
      }
      return {
        prefixCls,
        handleChange,
      };
    },
  });
</script>
