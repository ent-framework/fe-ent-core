<template>
  <a-input v-bind="$attrs" :class="prefixCls" :size="size" :value="state">
    <template #addonAfter>
      <CountButton :size="size" :count="count" :value="state" :before-start-func="sendCodeApi" />
    </template>
    <template v-for="item in Object.keys($slots).filter((k) => k !== 'addonAfter')" #[item]="data">
      <slot :name="item" v-bind="data || {}" />
    </template>
  </a-input>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useRuleFormItem } from '@ent-core/hooks/component/use-form-item';
  import CountButton from './count-button.vue';
  import type { PropType } from 'vue';

  const props = {
    value: { type: String },
    size: { type: String, validator: (v) => ['default', 'large', 'small'].includes(v) },
    count: { type: Number, default: 60 },
    sendCodeApi: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null,
    },
  };

  export default defineComponent({
    name: 'EntCountDownInput',
    components: { CountButton },
    inheritAttrs: false,
    props,
    setup(props) {
      const { prefixCls } = useDesign('countdown-input');
      const [state] = useRuleFormItem(props);

      return { prefixCls, state };
    },
  });
</script>
