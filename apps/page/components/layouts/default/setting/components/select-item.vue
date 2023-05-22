<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
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

  import { Select } from 'ant-design-vue';
  import { useDesign } from 'fe-ent-core';
  import { baseHandler } from '../handler';
  import type { ChangeEvent } from 'fe-ent-core';
  import type { HandlerEnum } from '../enum';
  import type { PropType } from 'vue';
  type LabelValueOptions = {
    label: string;
    value: any;
    [key: string]: string | number | boolean;
  }[];
  export default defineComponent({
    name: 'SelectItem',
    components: { Select },
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
        props.event && baseHandler(props.event, e);
      }
      return {
        prefixCls,
        handleChange,
        getBindValue,
      };
    },
  });
</script>
<style lang="less">
  @setting-select-item-prefix-cls: ~'@{vben-prefix}-setting-select-item';

  .@{setting-select-item-prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &-select {
      width: 126px;
    }
  }
</style>
