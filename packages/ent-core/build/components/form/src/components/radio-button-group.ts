
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
      NRadioButton
    },
    props: {
      value: {
        type: [String, Number, Boolean] as PropType<string | number | boolean>
      },
      options: {
        type: Array as PropType<RadioItem[]>,
        default: () => []
      }
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
    }
  });
