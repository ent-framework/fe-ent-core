import { type Recordable } from '@ent-core/types';
import type { CSSProperties, VNode } from 'vue';
import type { CollapseContainerOptions } from '@ent-core/components/container/interface';
import type { DescriptionsProps } from 'ant-design-vue/es/descriptions';
export interface DescItem {
  labelMinWidth?: number;
  contentMinWidth?: number;
  labelStyle?: CSSProperties;
  field: string;
  label: string | VNode;
  // Merge column
  span?: number;
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
