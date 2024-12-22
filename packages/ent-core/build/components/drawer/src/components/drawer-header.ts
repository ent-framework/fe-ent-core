
  import { defineComponent } from 'vue';
  import { EntTitle } from '../../../basic';
  import { EntIcon } from '../../../icon';
  import { useDesign } from '../../../../hooks';
  export default defineComponent({
    name: 'EntDrawerHeader',
    components: { EntTitle, EntIcon },
    props: {
      isDetail: {
        type: Boolean,
        default: false
      },
      showDetailBack: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: null
      }
    },
    emits: ['close'],
    // slots: ['titleToolbar'],
    setup(_, { emit }) {
      const { prefixCls } = useDesign('basic-drawer-header');

      function handleClose() {
        emit('close');
      }

      return { prefixCls, handleClose };
    }
  });
