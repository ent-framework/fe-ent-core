<template>
  <a-input-group compact>
    <a-input
      v-bind="$attrs"
      :class="prefixCls"
      :size="size"
      :value="state"
      style="width: calc(100% - 200px)"
    />
    <CountButton :size="size" :count="count" :value="state" :before-start-func="sendCodeApi" />
  </a-input-group>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Input, InputGroup } from 'ant-design-vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useRuleFormItem } from '@ent-core/hooks/component/use-form-item';
  import CountButton from './count-button.vue';
  import type { PropType } from 'vue';
  const AInput = Input;
  const AInputGroup = InputGroup;
  const props = {
    /**
     * 绑定值
     */
    value: { type: String },
    /**
     * 输入框即按钮大小
     */
    size: { type: String, validator: (v) => ['default', 'large', 'small'].includes(v) },
    /**
     * 倒计时时间(秒)
     */
    count: { type: Number, default: 60 },
    /**
     * 倒计时之前执行的函数，返回 true 才会开始执行
     */
    sendCodeApi: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null,
    },
  };

  export default defineComponent({
    name: 'EntCountDownInput',
    components: { CountButton, AInput, AInputGroup },
    inheritAttrs: false,
    props,
    setup(props) {
      const { prefixCls } = useDesign('countdown-input');
      const [state] = useRuleFormItem(props);

      return { prefixCls, state };
    },
  });
</script>
