import { MenuTypeEnum } from 'fe-ent-core/es/logics/enums/menu-enum';
import { ThemeEnum } from 'fe-ent-core/es/logics/enums/app-enum';
import { propTypes } from 'fe-ent-core/es/utils/prop-types';
import type { PropType } from 'vue';
import type { Menu } from 'fe-ent-core/es/router/types';
import type { MenuOption } from 'naive-ui/es/menu';
export const basicProps = {
  items: {
    type: Array as PropType<MenuOption[]>,
    default: () => []
  },
  collapsedShowTitle: propTypes.bool,
  // 最好是4 倍数
  inlineIndent: propTypes.number.def(20),
  // 菜单组件的mode属性
  mode: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  collapse: propTypes.bool,
  type: {
    type: String as PropType<MenuTypeEnum>,
    default: MenuTypeEnum.MIX
  },
  theme: {
    type: String as PropType<ThemeEnum>,
    default: ThemeEnum.DARK
  },
  inlineCollapsed: propTypes.bool,
  mixSider: propTypes.bool,

  isHorizontal: propTypes.bool,
  accordion: propTypes.bool.def(true),
  beforeClickFn: {
    type: Function as PropType<(key: string) => Promise<boolean>>
  }
};

export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: {}
  },
  level: propTypes.number,
  theme: propTypes.oneOf(['dark', 'light']),
  showTitle: propTypes.bool,
  isHorizontal: propTypes.bool
};

export const contentProps = {
  item: {
    type: Object as PropType<Menu>,
    default: null
  },
  showTitle: propTypes.bool.def(true),
  level: propTypes.number.def(0),
  isHorizontal: propTypes.bool.def(true)
};
