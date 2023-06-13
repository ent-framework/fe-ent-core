//import { tableProps } from 'ant-design-vue/es/table';
import { propTypes } from '@ent-core/utils/prop-types';
import { DEFAULT_FILTER_FN, DEFAULT_SIZE, DEFAULT_SORT_FN, FETCH_SETTING } from './const';
//import type { TableRowSelection } from 'ant-design-vue/es/table/interface';
import type { PropType } from 'vue';
import type { PaginationProps } from './types/pagination';
import type {
  BasicColumn,
  FetchSetting,
  SizeType,
  SorterResult,
  TableSetting,
} from './types/table';
import type { FormProps } from '@ent-core/components/form/interface';
import type { Fn, Recordable } from '@ent-core/types';

export const basicProps = {
  /**
   * 点击行是否选中 checkbox 或者 radio。需要开启
   * @type {boolean}
   * @default true
   */
  clickToRowSelect: propTypes.bool.def(true),
  /**
   * 是否树表
   * @type {boolean}
   * @default false
   */
  isTreeTable: propTypes.bool.def(false),
  /**
   * 显示表格设置工具
   * @type {boolean}
   */
  showTableSetting: propTypes.bool,
  /**
   * 表格设置工具配置, 见下方 TableSetting
   * @type {object}
   */
  tableSetting: propTypes.shape<TableSetting>({}),
  /**
   * 取消表格的默认 padding
   * @type {boolean}
   */
  inset: propTypes.bool,
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
  /**
   * 是否自动生成 key
   * @type {boolean}
   * @default true
   */
  autoCreateKey: propTypes.bool.def(true),
  /**
   * 斑马纹
   * @type {boolean}
   * @default true
   */
  striped: propTypes.bool.def(true),
  /**
   * 是否显示合计行
   * @type {boolean}
   */
  showSummary: propTypes.bool,
  /**
   * 计算合计行的方法
   * @type {Function}
   */
  summaryFunc: {
    type: [Function, Array] as PropType<(...arg: any[]) => any[]>,
    default: null,
  },
  /**
   * 自定义合计数据。如果有则显示该数据
   * @type {Record[]}
   */
  summaryData: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  /**
   * 缩进值
   * @type {number}
   * @default 24
   */
  indentSize: propTypes.number.def(24),
  /**
   * 列能否拖动
   * @type {boolean}
   * @default true
   */
  canColDrag: propTypes.bool.def(true),
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
    type: Object as PropType<FetchSetting>,
    default: () => FETCH_SETTING,
  },
  /**
   * 组件加载后是否立即请求接口，在 api 有传的情况下，如果为 false，需要自行使用 reload 加载表格数据
   * @type {boolean}
   * @default true
   */
  immediate: propTypes.bool.def(true),
  /**
   * 在启用搜索表单的前提下，是否在表格没有数据的时候显示表格
   * @type {boolean}
   * @default true
   */
  emptyDataIsShowTable: propTypes.bool.def(true),
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
   * 列
   */
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => [],
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
    default: null,
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
   * 文本超过宽度是否显示...
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
  /**
   * 表格自适应高度计算结果会减去这个值
   * @type {number}
   * @default 0
   */
  resizeHeightOffset: propTypes.number.def(0),
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
   * 表格最大高度，超出会显示滚动条
   * @type {number}
   */
  maxHeight: propTypes.number,
  pagination: {
    type: [Object, Boolean] as PropType<PaginationProps | boolean>,
    default: null,
  },

  // scroll: {
  //   type: Object as PropType<{ x: number | string | true; y: number | string }>,
  //   default: null,
  // },
  /**
   * 单元格编辑状态提交回调，返回false将阻止单元格提交数据到table。该回调在行编辑模式下无效。
   */
  beforeEditSubmit: {
    type: Function as PropType<
      (data: {
        record: Recordable;
        index: number;
        key: string | number;
        value: any;
      }) => Promise<any>
    >,
  },
  size: {
    type: String as PropType<SizeType>,
    default: DEFAULT_SIZE,
  },
  //...tableProps(),
};
