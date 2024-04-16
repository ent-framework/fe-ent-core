import type { Fn } from '../../../types';
import type { MenuOptionSharedPart } from 'naive-ui/es/menu/src/interface';
import type { PopconfirmProps } from 'naive-ui/es/popconfirm';
import type { TooltipProps } from 'naive-ui/es/tooltip';
import type { VNodeChild } from 'vue';

export interface DropMenu extends MenuOptionSharedPart {
  /**
   * 菜单的点击事件
   */
  onClick?: Fn;
  /**
   * 菜单的文本
   */
  label?: string;
  /**
   * 下一行追加分割符号
   */
  appendDivider?: boolean;
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
