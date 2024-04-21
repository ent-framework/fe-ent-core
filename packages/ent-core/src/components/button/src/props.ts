import { buttonProps } from 'naive-ui/es/button';
import type { TooltipProps } from 'naive-ui';
import type { PopconfirmProps } from 'naive-ui/es/popconfirm';
import type { PropType, VNodeChild } from 'vue';

export const btnProps = {
  ...buttonProps,
  /**
   * 按钮图标，参考 Icon 组件
   */
  icon: { type: String },

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
