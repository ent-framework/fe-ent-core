import { type Recordable } from '../../../types';
import type { VNode } from 'vue';
import type { CollapseContainerOptions } from '../../container/src/typing';
import type { DescriptionItemProps, DescriptionsProps } from 'naive-ui';

export interface DescItem extends DescriptionItemProps {
  field: string;
  show?: (...arg: any) => boolean;
  // render
  render?: (val: any, data: Recordable) => VNode | undefined | Element | string | number;
}

export interface DescriptionProps extends DescriptionsProps {
  // Whether to include the collapse component
  useCollapse?: boolean;
  /**
   * item configuration
   * @type DescItem
   */
  schema: DescItem[];
  /**
   * 数据
   * @type object
   */
  data: Recordable;
  /**
   * Built-in CollapseContainer component configuration
   * @type CollapseContainerOptions
   */
  collapseOptions?: CollapseContainerOptions;
}

export interface DescInstance {
  setDescProps(descProps: Partial<DescriptionProps>): void;
}

export type Register = (descInstance: DescInstance) => void;

/**
 * @description:
 */
export type UseDescReturnType = [Register, DescInstance];
