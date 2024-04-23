import { modalProps } from 'naive-ui/es/modal';
import type { PropType } from 'vue';
import type { ModalWrapperProps } from './typing';
import type { ButtonProps } from '../../button/interface';

export const footerProps = {
  okType: { type: String },
  okText: { type: String },
  cancelText: { type: String },
  okButtonProps: Object as PropType<Partial<ButtonProps>>,
  cancelButtonProps: Object as PropType<Partial<ButtonProps>>,
  buttonPosition: {
    type: String as PropType<'start' | 'center' | 'end'>,
    default: 'center'
  }
};

export const basicProps = {
  ...modalProps,
  scrollTop: { type: Boolean, default: true },
  /**
   * 默认全屏
   */
  defaultFullscreen: { type: Boolean, default: false },
  /**
   * 是否可以进行全屏
   */
  canFullscreen: { type: Boolean, default: true },
  /**
   * 开启是适应高度后，如果超过屏幕高度，底部和顶部会保持一样的间距，该参数可以用来缩小底部的间距
   */
  wrapperFooterOffset: { type: Number, default: 0 },
  /**
   * 标题右侧提示文本
   * @type {string | string[]}
   */
  helpMessage: { type: [String, Array] as PropType<string | string[]> },
  /**
   * 是否开启自适应高度，开启后会跟随屏幕变化自适应内容，并出现滚动条
   */
  useWrapper: { type: Boolean, default: true },

  confirmLoading: {
    type: Boolean
  },
  /**
   * loading 状态
   */
  loading: { type: Boolean },
  /**
   * loading 文本
   */
  loadingTip: { type: String },
  /**
   * 显示关闭按钮
   */
  showCancelBtn: { type: Boolean, default: true },
  /**
   * 显示确认按钮
   */
  showOkBtn: { type: Boolean, default: true },

  // open drag
  draggable: { type: Boolean, default: true },

  wrapperProps: Object as PropType<Partial<ModalWrapperProps>>,

  ...footerProps
};
