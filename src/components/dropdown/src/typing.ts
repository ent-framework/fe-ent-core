import type { Fn } from '../../../types';
import type { MenuOptionSharedPart } from 'naive-ui/es/menu/src/interface';
import type { PopconfirmProps } from 'naive-ui/es/popconfirm';

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
  popConfirm?: PopconfirmProps & { confirmContent?: string };
}
