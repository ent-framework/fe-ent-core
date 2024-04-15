import type { DropMenu } from 'fe-ent-core/es/components/dropdown/interface';
import type { RouteLocationNormalized } from 'vue-router';

export enum TabContentEnum {
  TAB_TYPE,
  EXTRA_TYPE,
}

export type { DropMenu };

export interface TabContentProps {
  tabItem: RouteLocationNormalized;
  type?: TabContentEnum;
  trigger?: 'hover' | 'click' | 'focus' | 'manual';
}

export enum MenuEventEnum {
  REFRESH_PAGE = 'REFRESH_PAGE',
  CLOSE_CURRENT = 'CLOSE_CURRENT',
  CLOSE_LEFT = 'CLOSE_LEFT',
  CLOSE_RIGHT = 'CLOSE_RIGHT',
  CLOSE_OTHER = 'CLOSE_OTHER',
  CLOSE_ALL = 'CLOSE_ALL',
  SCALE = 'SCALE',
}
