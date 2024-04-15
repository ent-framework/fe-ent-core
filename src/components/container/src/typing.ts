import type { Nullable, RefType } from '../../../types';

export type ScrollType = 'default' | 'main';

export interface CollapseContainerOptions {
  /**
   * 是否可折叠
   */
  canExpand?: boolean;
  /**
   * 标题
   */
  title?: string;
  helpMessage?: Array<any> | string;
}
export interface ScrollContainerOptions {
  enableScroll?: boolean;
  type?: ScrollType;
}

export type ScrollActionType = RefType<{
  scrollBottom: () => void;
  getScrollWrap: () => Nullable<HTMLElement>;
  scrollTo: (top: number) => void;
}>;
