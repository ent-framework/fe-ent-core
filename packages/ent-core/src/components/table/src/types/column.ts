import type { VNodeChild } from 'vue';
export interface ColumnFilterItem {
  text?: string;
  value?: string;
  children?: any;
}

export declare type SortOrder = 'ascend' | 'descend';

export interface RecordProps<T> {
  text: any;
  record: T;
  index: number;
}

export interface FilterDropdownProps {
  prefixCls?: string;
  setSelectedKeys?: (selectedKeys: string[]) => void;
  selectedKeys?: string[];
  confirm?: () => void;
  clearFilters?: () => void;
  filters?: ColumnFilterItem[];
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  visible?: boolean;
}

export declare type CustomRenderFunction<T> = (record: RecordProps<T>) => VNodeChild;
