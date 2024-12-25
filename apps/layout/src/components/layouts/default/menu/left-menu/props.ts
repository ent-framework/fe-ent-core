import { ThemeEnum } from 'fe-ent-core/es/logics/enums/app-enum';
import type { PropType } from 'vue';
import type { Menu } from 'fe-ent-core/es/router/types';
import type { MenuOption } from 'naive-ui/es/menu';
export const basicProps = {
  items: {
    type: Array as PropType<MenuOption[]>,
    default: () => []
  },
  theme: {
    type: String as PropType<ThemeEnum>,
    default: ThemeEnum.DARK
  },
  collapsed: {
    type: Boolean
  },
  mixSider: {
    type: Boolean
  },
  accordion: {
    type: Boolean,
    default: true
  },
  collapsedShowTitle: {
    type: Boolean
  },
  beforeClickFn: {
    type: Function as PropType<(key: string) => Promise<boolean>>
  },
  isSplitMenu: {
    type: Boolean
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
  },
  collapsedShowTitle: {
    type: Boolean
  },
  collapse: {
    type: Boolean
  },
  parent: {
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
  },
  collapse: {
    type: Boolean
  },
  collapsedShowTitle: {
    type: Boolean
  },
  parent: {
    type: Boolean
  }
};
