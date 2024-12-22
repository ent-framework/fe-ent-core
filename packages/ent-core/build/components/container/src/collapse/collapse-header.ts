
  import { defineComponent } from 'vue';
  import { NElement } from 'naive-ui';
  import { EntArrow, EntTitle } from '../../../basic';
  import type { PropType } from 'vue';

  const props = {
    prefixCls: { type: String },
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: ''
    },
    title: { type: String },
    show: { type: Boolean },
    canExpan: { type: Boolean }
  };

  export default defineComponent({
    components: { EntArrow, EntTitle, NElement },
    props,
    emits: ['expand']
  });
