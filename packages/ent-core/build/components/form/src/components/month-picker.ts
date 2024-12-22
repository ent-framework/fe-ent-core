
  import { computed, defineComponent } from 'vue';
  import { NDatePicker } from 'naive-ui/es/date-picker';

  export default defineComponent({
    name: 'MonthPicker',
    components: { NDatePicker },
    extends: NDatePicker,
    inheritAttrs: false,
    setup(props, { attrs }) {
      const getBindValue = computed(() => ({
        ...props,
        ...attrs,
        type: 'month'
      }));

      return {
        getBindValue
      };
    }
  });
