import { ThemeEnum } from 'fe-ent-core/es/logics/enums/app-enum';
import { propTypes } from 'fe-ent-core/es/utils/prop-types';
import type { PropType } from 'vue';
import type { Menu } from 'fe-ent-core/es/router/types';
import type { MenuOption } from 'naive-ui/es/menu';
export const basicProps = {
  items: {
    type: Array as PropType<MenuOption[]>,
    default: () => [],
  },
  theme: {
    type: String as PropType<ThemeEnum>,
    default: ThemeEnum.DARK,
  },
  collapsed: propTypes.bool,
  mixSider: propTypes.bool,
  accordion: propTypes.bool.def(true),
  collapsedShowTitle: propTypes.bool,
  beforeClickFn: {
    type: Function as PropType<(key: string) => Promise<boolean>>,
  },
  isSplitMenu: propTypes.bool,
};

export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: {},
  },
  level: propTypes.number,
  theme: propTypes.oneOf(['dark', 'light']),
  showTitle: propTypes.bool,
  isHorizontal: propTypes.bool,
  collapsedShowTitle: propTypes.bool,
  collapse: propTypes.bool,
  parent: propTypes.bool,
};

export const contentProps = {
  item: {
    type: Object as PropType<Menu>,
    default: null,
  },
  showTitle: propTypes.bool.def(true),
  level: propTypes.number.def(0),
  isHorizontal: propTypes.bool.def(true),
  collapse: propTypes.bool,
  collapsedShowTitle: propTypes.bool,
  parent: propTypes.bool,
};
