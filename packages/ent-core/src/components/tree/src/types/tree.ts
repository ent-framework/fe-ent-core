import { treeProps } from 'naive-ui/es/tree';
import type { ContextMenuItem } from '../../../context-menu/src/typing';
import type { ExtractPropTypes, PropType } from 'vue';
import type { Recordable, ValueAtom } from '../../../../types';
import type { TreeOption } from 'naive-ui/es/tree/src/interface';

export enum ToolbarEnum {
  SELECT_ALL,
  UN_SELECT_ALL,
  EXPAND_ALL,
  UN_EXPAND_ALL,
  CHECK_STRICTLY,
  CHECK_UN_STRICTLY
}

export const treeEmits = [
  'update:expandedKeys',
  'update:selectedKeys',
  'update:value',
  'change',
  'check',
  'update:searchValue',
  'check-all'
];

export interface TreeState {
  expandedKeys?: ValueAtom[];
  selectedKeys?: ValueAtom[];
  checkedKeys?: ValueAtom[];
  cascade?: boolean;
}

export interface FieldNames {
  children?: string;
  label?: string;
  key?: string;
  disabled?: string;
}

export type CheckKeys = { checked: ValueAtom[]; halfChecked: ValueAtom[] };

/**
 * 包装类型
 */
export interface TreeNodeCheckedEvent {
  event: 'check';
  checked: boolean;
  nativeEvent: MouseEvent;
  halfCheckedKeys?: ValueAtom[];
}

export const basicTreeProps = {
  ...treeProps,

  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },

  title: {
    type: String,
    default: ''
  },
  /**
   * 是否显示工具栏
   */
  toolbar: {
    type: Boolean,
    default: false
  },
  /**
   * 显示搜索框
   */
  search: {
    type: Boolean,
    default: false
  },

  beforeRightClick: {
    type: Function as PropType<(...arg: any) => ContextMenuItem[]>,
    default: undefined
  },

  rightMenuList: {
    type: Array as PropType<ContextMenuItem[]>
  },
  // 自定义数据过滤判断方法(注: 不是整个过滤方法，而是内置过滤的判断方法，用于增强原本仅能通过title进行过滤的方式)
  filterFn: {
    type: Function as PropType<
      (searchValue: any, node: TreeItem, fieldNames: FieldNames) => boolean
    >,
    default: undefined
  },
  loading: {
    type: Boolean,
    default: false
  },
  treeWrapperClassName: String
};

export type TreeProps = ExtractPropTypes<typeof treeProps>;

export interface TreeItem extends TreeOption {
  icon?: any;
}

export interface TreeActionItem {
  render: (record: Recordable) => any;
  show?: boolean | ((record: Recordable) => boolean);
}

export interface InsertNodeParams {
  parentKey: string | null;
  node: TreeItem;
  list?: TreeItem[];
  push?: 'push' | 'unshift';
}

export interface TreeActionType {
  checkAll: (checkAll: boolean) => void;
  expandAll: (expandAll: boolean) => void;
  setExpandedKeys: (keys: ValueAtom[]) => void;
  getExpandedKeys: () => ValueAtom[];
  setSelectedKeys: (keys: ValueAtom[]) => void;
  getSelectedKeys: () => ValueAtom[];
  setCheckedKeys: (keys: ValueAtom[]) => void;
  getCheckedKeys: () => ValueAtom[];
  filterByLevel: (level: number) => void;
  insertNodeByKey: (opt: InsertNodeParams) => void;
  insertNodesByKey: (opt: InsertNodeParams) => void;
  deleteNodeByKey: (key: string) => void;
  updateNodeByKey: (key: string, node: Omit<TreeItem, 'key'>) => void;
  setSearchValue: (value: string) => void;
  getSearchValue: () => string;
  getSelectedNode: (
    key: ValueAtom,
    treeList?: TreeItem[],
    selectNode?: TreeItem | null
  ) => TreeItem | null | undefined;
}
