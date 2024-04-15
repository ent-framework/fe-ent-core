import { buttonProps } from 'naive-ui/es/button';
import type { PopconfirmProps } from 'naive-ui/es/popconfirm';
import type { PropType } from 'vue';

export const btnProps = {
  ...buttonProps,
  /**
   * 按钮文本前图标，参考 Icon 组件
   */
  preIcon: { type: String },
  /**
   * 按钮文本后图标，参考 Icon 组件
   */
  postIcon: { type: String },
  /**
   * 按钮图标大小
   */
  iconSize: { type: Number, default: 14 },
};

export const popConfirmBtnProps = {
  ...buttonProps,
  /**
   * 是否启用弹窗显示
   * @default: true
   */
  enable: {
    type: Boolean,
    default: true,
  },
  /**
   * 弹窗的配置属性
   * confirmContent - 确认文本
   */
  popConfirm: {
    type: Object as PropType<Partial<PopconfirmProps> & { confirmContent?: string }>,
  },
  /**
   * 按钮的文本
   */
  btnLabel: {
    type: String,
  },
};
