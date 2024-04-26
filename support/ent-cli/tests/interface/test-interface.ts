export type ScrollType = 'default' | 'main';

export * from './testInner';

/**
 * 测试名称
 */
export interface CollapseContainerOptions {
  /**
   * test
   */
  canExpand?: boolean;
  title?: string;
  helpMessage?: Array<any> | string;
}
export interface ScrollContainerOptions {
  enableScroll?: boolean;
  type?: ScrollType;
}
