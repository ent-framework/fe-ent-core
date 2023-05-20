export * from './test-interface';

export interface Inner {
  /**
   * test
   */
  canExpand?: boolean;
  title?: string;
  helpMessage?: Array<any> | string;
}
