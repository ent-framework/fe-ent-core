import type { ButtonProps } from 'naive-ui/es/button';
import type { TooltipProps } from 'naive-ui/es/tooltip';
import type { PopconfirmProps } from 'naive-ui/es/popconfirm';
import type { Fn } from '../../../../types';
import type { VNodeChild } from 'vue';

export interface TableActionItem extends ButtonProps {
  /**
   * 按钮的鼠标点击事件
   */
  onClick?: Fn;
  /**
   * 按钮的文字
   */
  label?: string;
  /**
   * 图标
   */
  icon?: string;

  /**
   * 是否追加分割线
   */
  appendDivider?: boolean;
  /**
   * 权限编码控制是否显示
   */
  auth?: string | string[];
  /**
   * 业务控制是否显示
   */
  ifShow?: boolean | ((action: TableActionItem) => boolean);

  /**
   * 弹窗的配置属性
   * confirmContent - 确认文本
   */
  popConfirmProps?: Partial<PopconfirmProps>;

  /**
   *  确认文本内容
   */
  confirm?: string | (() => VNodeChild);

  /**
   * 提示的配置属性
   */
  tooltipProps?: Partial<TooltipProps>;
  /**
   * 提示的内容
   */
  tooltip?: string | (() => VNodeChild);
}
