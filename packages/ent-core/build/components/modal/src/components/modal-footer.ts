
  import { defineComponent } from 'vue';
  import { NFlex } from 'naive-ui';
  import { useI18n } from '../../../../hooks';
  import { basicProps } from '../props';
  export default defineComponent({
    name: 'BasicModalFooter',
    components: {
      NFlex
    },
    props: basicProps,
    emits: ['ok', 'cancel'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const cancelText =
        !props.cancelText || props.cancelText.length == 0
          ? t('common.cancelText')
          : props.cancelText;
      const okText = !props.okText || props.okText.length == 0 ? t('common.okText') : props.okText;
      function handleOk(e: Event) {
        emit('ok', e);
      }

      function handleCancel(e: Event) {
        emit('cancel', e);
      }

      return { handleOk, handleCancel, cancelText, okText };
    }
  });
