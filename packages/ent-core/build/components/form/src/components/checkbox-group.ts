
  import { type PropType, computed, defineComponent } from 'vue';
  import { NCheckbox, NCheckboxGroup, NSpace } from 'naive-ui';
  import { checkboxGroupProps } from 'naive-ui/es/checkbox';
  import type { OptionsItem } from '../props';

  const CheckboxGroupProps = {
    ...checkboxGroupProps,
    options: {
      type: Array as PropType<OptionsItem[]>
    }
  };

  export default defineComponent({
    name: 'CheckboxGroup',
    components: {
      NSpace,
      NCheckbox,
      NCheckboxGroup
    },
    inheritAttrs: false,
    props: CheckboxGroupProps,
    setup(props, { attrs }) {
      const getBindValue = computed(() => ({
        ...props,
        ...attrs
      }));

      return {
        getBindValue
      };
    }
  });
