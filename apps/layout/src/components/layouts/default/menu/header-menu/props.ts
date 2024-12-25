import { MenuTypeEnum } from 'fe-ent-core/es/logics/enums/menu-enum';
import { ThemeEnum } from 'fe-ent-core/es/logics/enums/app-enum';
import type { PropType } from 'vue';
import type { Menu } from 'fe-ent-core/es/router/types';
import type { MenuOption } from 'naive-ui/es/menu';
export const basicProps = {
  items: {
    type: Array as PropType<MenuOption[]>,
    default: () => []
  },
  collapsedShowTitle: {
    type: Boolean
  },
  // 最好是4 倍数
  inlineIndent: {
    type: Number,
    default: 20
  },
  // 菜单组件的mode属性
  mode: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  collapse: {
    type: Boolean
  },
  type: {
    type: String as PropType<MenuTypeEnum>,
    default: MenuTypeEnum.MIX
  },
  theme: {
    type: String as PropType<ThemeEnum>,
    default: ThemeEnum.DARK
  },
  inlineCollapsed: {
    type: Boolean
  },
  mixSider: {
    type: Boolean
  },

  isHorizontal: {
    type: Boolean
  },
  accordion: {
    type: Boolean,
    default: true
  },
  beforeClickFn: {
    type: Function as PropType<(key: string) => Promise<boolean>>
  }
};

export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: {}
  },
  level: {
    type: Number
  },
  theme: {
    type: String as PropType<'dark' | 'light'>
  },
  showTitle: {
    type: Boolean
  },
  isHorizontal: {
    type: Boolean
  }
};

export const contentProps = {
  item: {
    type: Object as PropType<Menu>,
    default: null
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  level: {
    type: Number,
    default: 0
  },
  isHorizontal: {
    type: Boolean,
    default: true
  }
};
