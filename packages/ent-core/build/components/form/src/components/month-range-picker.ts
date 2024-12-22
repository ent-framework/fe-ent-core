
  import { defineComponent } from 'vue';
  import { NDatePicker } from 'naive-ui/es/date-picker';

  export default defineComponent({
    name: 'MonthRangePicker',
    components: { NDatePicker },
    extends: NDatePicker,
    inheritAttrs: false
  });
