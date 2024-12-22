
  import { defineComponent } from 'vue';
  import { useDesign } from '../../../../hooks/web/use-design';
  import { useI18n } from '../../../../hooks/web/use-i18n';
  import { footerProps } from '../props';
  export default defineComponent({
    name: 'EntDrawerFooter',
    props: {
      ...footerProps
    },
    emits: ['ok', 'close'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const cancelText =
        !props.cancelText || props.cancelText.length == 0
          ? t('common.cancelText')
          : props.cancelText;
      const okText = !props.okText || props.okText.length == 0 ? t('common.okText') : props.okText;

      const { prefixCls } = useDesign('basic-drawer-footer');

      function handleOk() {
        emit('ok');
      }

      function handleClose() {
        emit('close');
      }
      return { handleOk, prefixCls, handleClose, okText, cancelText };
    }
  });
