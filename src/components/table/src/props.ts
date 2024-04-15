import { dataTableProps } from 'naive-ui/es/data-table';
import { propTypes } from '@ent-core/utils/prop-types';
import { DEFAULT_FILTER_FN, DEFAULT_SORT_FN, FETCH_SETTING } from './const';
import type { PropType } from 'vue';
import type {
  BasicColumn,
  FetchSetting,
  SorterResult,
  TableRowSelection,
  TableSetting,
} from './types/table';
import type { FormProps } from '@ent-core/components/form/interface';
import type { Fn, Recordable } from '@ent-core/types';
import type { DataTableExpandColumn, DataTableSelectionColumn } from 'naive-ui';
export const tableHeaderProps = {
  /**
   * 标题
   */
  title: {
    type: [String, Function] as PropType<string | ((data: Recordable) => string)>,
    default: null,
  },
  /**
   * 表格标题右侧温馨提醒
   */
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>,
  },
  /**
   * 显示表格设置工具
   * @type {boolean}
   */
  showTableSetting: propTypes.bool,
  /**
   * 表格设置工具配置, 见下方 TableSetting
   * @type {object}
   */
  tableSetting: {
    type: Object as PropType<Partial<TableSetting>>,
  },
};

export const basicProps = {
  ...dataTableProps,
  ...tableHeaderProps,
  /**
   * 点击行是否选中 checkbox 或者 radio。需要开启
   * @type {boolean}
   * @default true
   */
  clickToRowSelect: {
    type: Boolean,
    default: true,
  },
  rowSelection: {
    type: Object as PropType<TableRowSelection>,
  },

  /**
   * 是否树表
   * @type {boolean}
   * @default false
   */
  isTreeTable: {
    type: Boolean,
    default: false,
  },
  /**
   * 取消表格的默认 padding
   * @type {boolean}
   */
  inset: {
    type: Boolean,
  },
  /**
   * 自定义排序方法。见下方全局配置说明
   * @type {Function}
   */
  sortFn: {
    type: Function as PropType<(sortInfo: SorterResult) => any>,
    default: DEFAULT_SORT_FN,
  },
  /**
   * 自定义过滤方法。见下方全局配置说明
   * @type {Function}
   */
  filterFn: {
    type: Function as PropType<(data: Partial<Recordable<string[]>>) => any>,
    default: DEFAULT_FILTER_FN,
  },

  // /**
  //  * 缩进值
  //  * @type {number}
  //  * @default 24
  //  */
  // indentSize: propTypes.number.def(24),
  // /**
  //  * 列能否拖动
  //  * @type {boolean}
  //  * @default true
  //  */
  // canColDrag: propTypes.bool.def(true),
  /**
   * 请求接口，可以直接将src/api内的函数直接传入
   * @type {Function}
   */
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  /**
   * 请求之前对参数进行处理
   * @type {Function}
   */
  beforeFetch: {
    type: Function as PropType<Fn>,
    default: null,
  },
  /**
   * 请求之后对返回值进行处理
   * @type {Function}
   */
  afterFetch: {
    type: Function as PropType<Fn>,
    default: null,
  },
  /**
   * 开启表单后，在请求之前处理搜索条件参数
   * @type {Function}
   */
  handleSearchInfoFn: {
    type: Function as PropType<Fn>,
    default: null,
  },
  /**
   * 接口请求配置，可以配置请求的字段和响应的字段名，见下方全局配置说明
   * @type {object}
   */
  fetchSetting: {
    type: Object as PropType<Partial<FetchSetting>>,
    default: () => FETCH_SETTING,
  },
  /**
   * 组件加载后是否立即请求接口，在 api 有传的情况下，如果为 false，需要自行使用 reload 加载表格数据
   * @type {boolean}
   * @default true
   */
  immediate: propTypes.bool.def(true),
  /**
   * 额外的请求参数
   * @type {object}
   */
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  /**
   * 默认的排序参数
   * @type {object}
   */
  defSort: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  /**
   * 使用搜索表单
   * @type {boolean}
   */
  useSearchForm: propTypes.bool,
  /**
   * 搜索表单配置
   * @type {object}
   */
  formConfig: {
    type: Object as PropType<Partial<FormProps>>,
    default: null,
  },
  /**
   * 显示行号
   * @type {boolean}
   * @default true
   */
  showIndexColumn: propTypes.bool.def(true),
  /**
   * 序号列属性
   * @type {BasicColumn}
   */
  indexColumnProps: {
    type: Object as PropType<BasicColumn>,
    default: () => {
      return {
        width: 50,
      };
    },
  },
  /**
   * 表格右侧操作列配置 BasicColumn
   * @type {BasicColumn}
   */
  actionColumn: {
    type: Object as PropType<BasicColumn>,
    default: null,
  },

  /**
   * 选择行的配置
   */
  selectionColumn: {
    type: Object as PropType<Partial<DataTableSelectionColumn>>,
  },
  /**
   * 展开行的配置
   */
  expandColumn: {
    type: Object as PropType<Partial<DataTableExpandColumn>>,
  },
  /**
   * 文本超过宽度是否显示..., 全局设置，可以被column上的ellipsis属性覆盖
   * @type {boolean}
   * @default true
   */
  ellipsis: propTypes.bool.def(true),
  /**
   * 是否可以自适应高度(如果置于PageWrapper组件内，请勿启用PageWrapper的fixedHeight属性，二者不可同时使用)
   * @type {boolean}
   * @default true
   */
  canResize: propTypes.bool.def(true),
  /**
   * 切换页码是否重置勾选状态
   * @type {boolean}
   */
  clearSelectOnPageChange: propTypes.bool,
};
