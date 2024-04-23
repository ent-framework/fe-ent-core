import { dropdownProps } from 'naive-ui/es/dropdown';
import type { PropType } from 'vue';
import type { DropMenu } from './typing';

export const basicDropdownProps = {
  ...dropdownProps,
  /**
   * 菜单列表
   */
  dropMenuList: {
    type: Array as PropType<DropMenu[]>,
    default: () => []
  }
};
