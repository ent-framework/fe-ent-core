<!--
 * @Description:It is troublesome to implement radio button group in the form. So it is extracted independently as a separate component
-->
<template>
  <NRadioGroup v-bind="attrs" v-model:value="state" button-style="solid">
    <template v-for="item in getOptions" :key="`${item.value}`">
      <NRadioButton :value="item.value" :disabled="item.disabled" @click="handleClick(item)">
        {{ item.label }}
      </NRadioButton>
    </template>
  </NRadioGroup>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { NRadioButton, NRadioGroup } from 'naive-ui';
  import { isString } from '../../../../utils/is';
  import { useAttrs, useRuleFormItem } from '../../../../hooks';
  import type { PropType } from 'vue';

  type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean };
  type RadioItem = string | OptionsItem;

  export default defineComponent({
    name: 'RadioButtonGroup',
    components: {
      NRadioGroup,
      NRadioButton,
    },
    props: {
      value: {
        type: [String, Number, Boolean] as PropType<string | number | boolean>,
      },
      options: {
        type: Array as PropType<RadioItem[]>,
        default: () => [],
      },
    },
    emits: ['change'],
    setup(props) {
      const attrs = useAttrs();
      const emitData = ref<any[]>([]);
      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);

      // Processing options value
      const getOptions = computed((): OptionsItem[] => {
        const { options } = props;
        if (!options || options?.length === 0) return [];

        const isStringArr = options.some((item) => isString(item));
        if (!isStringArr) return options as OptionsItem[];

        return options.map((item) => ({ label: item, value: item })) as OptionsItem[];
      });

      function handleClick(...args) {
        emitData.value = args;
      }

      return { state, getOptions, attrs, handleClick };
    },
  });
</script>
