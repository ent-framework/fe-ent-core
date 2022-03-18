<template>
  <a-input v-bind="$attrs" :class="prefixCls" :size="size" :value="state">
    <template #addonAfter>
      <CountButton :size="size" :count="count" :value="state" :beforeStartFunc="sendCodeApi" />
    </template>
    <template #[item]="data" v-for="item in Object.keys($slots).filter((k) => k !== 'addonAfter')">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </a-input>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import CountButton from './count-button.vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useRuleFormItem } from '@ent-core/hooks/component/use-form-item';

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
