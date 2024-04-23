<template>
  <NInputGroup compact>
    <NInput
      v-bind="$attrs"
      v-model:value="state"
      :class="prefixCls"
      :size="size"
      style="width: calc(100% - 200px)"
    />
    <CountButton :size="size" :count="count" :value="state" :before-start-func="sendCodeApi" />
  </NInputGroup>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NInput, NInputGroup } from 'naive-ui';
  import { useDesign } from '../../../hooks/web/use-design';
  import { useRuleFormItem } from '../../../hooks/component/use-form-item';
  import CountButton from './count-button.vue';
  import { countDownInputProps } from './props';

  export default defineComponent({
    name: 'EntCountDownInput',
    components: { CountButton, NInput, NInputGroup },
    inheritAttrs: false,
    props: countDownInputProps,
    setup(props) {
      const { prefixCls } = useDesign('countdown-input');
      const [state] = useRuleFormItem(props);

      return { prefixCls, state };
    }
  });
</script>
