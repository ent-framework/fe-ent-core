import type { Fn } from '@ent-core/types';
import type { MenuOptionSharedPart } from 'naive-ui/es/menu/src/interface';
import type { PopconfirmProps } from 'naive-ui/es/popconfirm';

export interface DropMenu extends MenuOptionSharedPart {
  onClick?: Fn;
  /**
   * 菜单的文本
   */
  label?: string;
  /**
   * 分割符号
   */
  divider?: boolean;
  /**
   * 弹窗的配置属性
   * confirmContent - 确认文本
   */
  popConfirm?: PopconfirmProps & { confirmContent?: string };
}
