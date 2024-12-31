import type { basicProps } from '../props';
import type { DataTableFilterState, DataTableSortState, PaginationProps } from 'naive-ui';
import type { EmitType, ExtractPublicPropTypes, Recordable } from '../../../../types';
import type { DataTableBaseColumn, DataTableRowKey } from 'naive-ui/es/data-table';
import type { OnUpdateCheckedRowKeys } from 'naive-ui/es/data-table/src/interface';

export type FixedType = 'left' | 'right';

export type SizeType = 'small' | 'medium' | 'large';

export declare type SortOrder = 'ascend' | 'descend';

export type RowSelectionType = 'checkbox' | 'radio';

export interface TableRowSelection {
  type?: RowSelectionType;
  selectedRowKeys?: DataTableRowKey[];
  selectedRows?: Recordable[];
  onChange?: OnUpdateCheckedRowKeys;
}

export interface FilterInfo {
  filter: DataTableFilterState;
  column: DataTableBaseColumn;
}

export interface FetchParams {
  /**
   * Page size
   */
  pagination: PaginationProps;
  /**
   * Sort settings
   */
  sorter?: DataTableSortState;
  /**
   * filter info, additional params for filter data.
   */
  filterInfo?: FilterInfo;
}

export interface FetchRequestParams {
  /**
   * Page size
   */
  pagination: Recordable;
  /**
   * Search form values
   */
  searchForm?: Recordable;
  /**
   * Sort settings
   */
  sorter?: DataTableSortState;
  /**
   * filter info, additional params for filter data.
   */
  filterInfo?: FilterInfo;
}

export interface GetColumnsParams {
  /**
   * Ignore index column
   */
  ignoreIndex?: boolean;
  /**
   * Ignore action column
   */
  ignoreAction?: boolean;
  /**
   * Sort columns or not.
   */
  sort?: boolean;
}

export interface TableActionType {
  reload: (opt?: FetchParams) => Promise<Recordable[] | undefined>;
  setSelectedRows: (rows: Recordable[]) => void;
  getSelectRows: () => Recordable[];
  clearSelectedRowKeys: () => void;
  getSelectRowKeys: () => DataTableRowKey[];
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setTotalRows: (total: number) => void;
  setTableData: <T = Recordable>(values: T[]) => void;
  updateTableDataRecord: (rowKey: string | number, record: Recordable) => Recordable | void;
  deleteTableDataRecord: (rowKey: string | number | string[] | number[]) => void;
  insertTableDataRecord: (record: Recordable | Recordable[], index?: number) => Recordable[] | void;
  findTableDataRecord: (rowKey: string | number) => Recordable | void;
  getColumns: (opt?: GetColumnsParams) => BasicColumn[];
  setColumns: (columns: BasicColumn[] | DataTableRowKey[]) => void;
  getDataSource: <T = Recordable>() => T[];
  getRawDataSource: <T = Recordable>() => T;
  setLoading: (loading: boolean) => void;
  setProps: (props: Partial<BasicTableProps>) => void;
  setSelectedRowKeys: (
    keys: DataTableRowKey[],
    rows: Recordable[],
    meta: { row: Recordable | undefined; action: 'check' | 'uncheck' | 'checkAll' | 'uncheckAll' }
  ) => void;
  getPaginationRef: () => PaginationProps | boolean;
  getSize: () => SizeType;
  getRowSelection: () => TableRowSelection;
  getCacheColumns: () => BasicColumn[];
  emit?: EmitType;
  updateTableData: (index: number, key: string, value: any) => Recordable;
  setShowPagination: (show: boolean) => Promise<void>;
  getShowPagination: () => boolean;
  setCacheColumnsByField?: (dataIndex: string | undefined, value: Partial<BasicColumn>) => void;
  setCacheColumns?: (columns: BasicColumn[]) => void;
}

export interface FetchSetting {
  // 请求接口当前页数
  pageField: string;
  // 每页显示多少条
  sizeField: string;
  // 请求结果列表字段  支持 a.b.c
  listField: string;
  // 请求结果总数字段  支持 a.b.c
  totalField: string;
}

export interface TableSetting {
  redo?: boolean;
  size?: boolean;
  setting?: boolean;
  fullScreen?: boolean;
}

export type BasicTableProps = ExtractPublicPropTypes<typeof basicProps>;

export type CellFormat =
  | string
  | ((text: string, record: Recordable, index: number) => string | number)
  | Map<string | number, any>;

// @ts-ignore
export interface BasicColumn extends DataTableBaseColumn<Recordable> {
  // Whether to hide the column by default, it can be displayed in the column configuration
  defaultHidden?: boolean;
  /**
   * 权限编码控制是否显示
   */
  auth?: string | string[];
  /**
   * 业务控制是否显示
   */
  ifShow?: boolean | ((column: BasicColumn) => boolean);
}

export type ColumnChangeParam = {
  key: string;
  fixed: 'left' | 'right' | undefined;
  visible: boolean;
};

export interface InnerHandlers {
  onColumnsChange: (data: ColumnChangeParam[]) => void;
}

export interface ColumnOptionsType {
  value: string;
  label: string;
  //
  column: {
    defaultHidden?: boolean;
  };
  //
  fixed?: FixedType;
}
