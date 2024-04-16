import { buttonProps } from 'naive-ui/es/button';
import type { TooltipProps } from 'naive-ui';
import type { PopconfirmProps } from 'naive-ui/es/popconfirm';
import type { PropType, VNodeChild } from 'vue';

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
   * 图标文件
   */
  icon: {
    type: [String, Function] as PropType<string | (() => VNodeChild)>,
  },

  /**
   * 弹窗的配置属性
   */
  popConfirmProps: {
    type: Object as PropType<Partial<PopconfirmProps>>,
  },

  /**
   * 提示
   */
  tooltipProps: {
    type: Object as PropType<Partial<TooltipProps>>,
  },
};
