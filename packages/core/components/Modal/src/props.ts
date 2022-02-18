import type { PropType } from 'vue';
import type { ModalWrapperProps } from './typing';
import buttonTypes, { LegacyButtonType } from 'ant-design-vue/es/button/buttonTypes';
import { useI18n } from 'fe-ent-core/hooks/web/useI18n';
import PropTypes from 'fe-ent-core/utils/propTypes';

const { t } = useI18n();

function noop() {}

export const basicProps = {
  prefixCls: PropTypes.string,
  /** 对话框是否可见*/
  visible: PropTypes.bool,
  /** 确定按钮 loading*/
  confirmLoading: PropTypes.looseBool,
  /** 标题*/
  title: PropTypes.any,
  /** 是否显示右上角的关闭按钮*/
  closable: PropTypes.looseBool,
  closeIcon: PropTypes.any,
  /** 点击确定回调*/
  onOk: {
    type: Function as PropType<(e: MouseEvent) => void>,
  },
  /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调*/
  onCancel: {
    type: Function as PropType<(e: MouseEvent) => void>,
  },
  afterClose: PropTypes.func.def(noop),
  /** 垂直居中 */
  centered: PropTypes.looseBool,
  /** 宽度*/
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 底部内容*/
  footer: PropTypes.any,
  /*  /!** 确认按钮文字*!/
  okText: PropTypes.any,*/
  /** 确认按钮类型*/
  okType: {
    type: String as PropType<LegacyButtonType>,
  },
  /*  /!** 取消按钮文字*!/
  cancelText: PropTypes.any,*/
  icon: PropTypes.any,
  /** 点击蒙层是否允许关闭*/
  maskClosable: PropTypes.looseBool,
  /** 强制渲染 Modal*/
  forceRender: PropTypes.looseBool,
  okButtonProps: PropTypes.shape(buttonTypes).loose,
  cancelButtonProps: PropTypes.shape(buttonTypes).loose,
  destroyOnClose: PropTypes.looseBool,
  wrapClassName: PropTypes.string,
  maskTransitionName: PropTypes.string,
  transitionName: PropTypes.string,
  getContainer: PropTypes.any,
  zIndex: PropTypes.number,
  bodyStyle: PropTypes.style,
  maskStyle: PropTypes.style,
  mask: PropTypes.looseBool,
  keyboard: PropTypes.looseBool,
  wrapProps: PropTypes.object,
  focusTriggerAfterClose: PropTypes.looseBool,

  scrollTop: { type: Boolean, default: true },
  height: { type: Number },
  minHeight: { type: Number },
  // open drag
  draggable: { type: Boolean, default: true },
  cancelText: { type: String, default: t('common.cancelText') },
  okText: { type: String, default: t('common.okText') },

  closeFunc: Function as PropType<() => Promise<boolean>>,

  defaultFullscreen: { type: Boolean },
  // Can it be full screen
  canFullscreen: { type: Boolean, default: true },
  // After enabling the wrapper, the bottom can be increased in height
  wrapperFooterOffset: { type: Number, default: 0 },
  // Warm reminder message
  helpMessage: [String, Array] as PropType<string | string[]>,
  // Whether to setting wrapper
  useWrapper: { type: Boolean, default: true },
  loading: { type: Boolean },
  loadingTip: { type: String },
  /**
   * @description: Show close button
   */
  showCancelBtn: { type: Boolean, default: true },
  /**
   * @description: Show confirmation button
   */
  showOkBtn: { type: Boolean, default: true },

  wrapperProps: Object as PropType<Partial<ModalWrapperProps>>,
};
