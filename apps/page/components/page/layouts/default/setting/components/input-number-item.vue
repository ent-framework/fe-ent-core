<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
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

  import { InputNumber } from 'ant-design-vue';
  import { useDesign } from 'fe-ent-core/lib/hooks';
  import { baseHandler } from '../handler';
  import type { PropType } from 'vue';
  import type { HandlerEnum } from '../enum';

  export default defineComponent({
    name: 'InputNumberItem',
    components: { InputNumber },
    extends: InputNumber,
    props: {
      event: {
        type: Number as PropType<HandlerEnum>,
      },
      title: {
        type: String,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('setting-input-number-item');

      function handleChange(e) {
        props.event && baseHandler(props.event, e);
      }
      return {
        prefixCls,
        handleChange,
      };
    },
  });
</script>
