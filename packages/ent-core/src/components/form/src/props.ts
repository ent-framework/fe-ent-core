import { type FormItemProps, formProps } from 'naive-ui/es/form';
import { propTypes } from '../../../utils';
import type { CSSProperties, PropType } from 'vue';
import type { Fn, Recordable } from '../../../types';
import type {
  FieldMapToTime,
  FormActionType,
  FormButtonOptions,
  FormProps,
  FormSchema,
} from './types/form';
import type { TableActionType } from '../../table/src/types/table';
import type { GridItemProps, GridProps } from 'naive-ui/es/grid';

export const formActionProps = {
  /**
   * 是否显示操作按钮
   * @type {boolean}
   * @default true
   */
  showActionButtonGroup: {
    type: Boolean,
    default: true,
  },
  actionButtonGroupPosition: {
    type: String as PropType<'right' | 'left' | 'center'>,
    default: 'right',
  },
  /**
   * 显示重置按钮
   * @type {boolean}
   * @default true
   */
  showResetButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示确认按钮
   * @type {boolean}
   * @default true
   */
  showSubmitButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示收起展开按钮
   * @type {boolean}
   */
  showAdvancedButton: {
    type: Boolean,
    default: false,
  },
  /**
   * 重置按钮配置见下方 ActionButtonOption
   */
  resetButtonOptions: {
    type: Object as PropType<FormButtonOptions>,
    default: () => ({}),
  },
  /**
   * 确认按钮配置
   */
  submitButtonOptions: {
    type: Object as PropType<FormButtonOptions>,
    default: () => ({}),
  },
  /**
   * 操作按钮外层 Col 组件配置，如果开启 showAdvancedButton，则不用设置，具体见下方 actionColOptions
   */
  actionColOptions: {
    type: Object as PropType<Partial<GridItemProps>>,
    default: () => ({}),
  },
  actionSpan: propTypes.number.def(6),
  isAdvanced: propTypes.bool,
  hideAdvanceBtn: propTypes.bool,
};

export const basicProps = {
  ...formProps,
  /**
   * 用于将表单内时间区域的应设成 2 个字段,见下方说明
   */
  fieldMapToTime: {
    type: Array as PropType<FieldMapToTime>,
    default: () => [],
  },
  /**
   * 表单配置
   */
  schemas: {
    type: Array as PropType<FormSchema[]>,
    default: () => [],
  },
  /**
   * 额外传递到子组件的参数 values
   */
  mergeDynamicData: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  /**
   * 配置所有 Grid 的 style 样式
   */
  baseGridStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 配置所有 Grid 的 props 配置
   */
  gridProps: {
    type: Object as PropType<GridProps>,
    default: () => ({
      cols: 24,
      xGap: 10,
    }),
  },
  /**
   * 配置所有选子项的 GridItemProps，不需要逐个配置，子项也可单独配置优先与全局
   */
  baseGridItemProps: {
    type: Object as PropType<Partial<GridItemProps>>,
    default: () => ({
      span: 6,
    }),
  },
  /**
   * 配置所有 FormItem 的 props 配置，schema中可以通过 formItemProps 覆盖
   */
  baseFormItemProps: {
    type: Object as PropType<Partial<FormItemProps>>,
    default: () => ({
      labelPlacement: 'left',
      labelWidth: 'auto',
    }),
  },

  /**
   * 自动设置表单内组件的 placeholder，自定义组件需自行实现
   * @type {boolean}
   * @default true
   */
  autoSetPlaceHolder: propTypes.bool.def(true),
  /**
   * 在input中输入时按回车自动提交
   * @type {boolean}
   * @default false
   */
  autoSubmitOnEnter: propTypes.bool.def(false),
  /**
   * 重置时是否提交表单
   * @type {boolean}
   * @default true
   */
  submitOnReset: propTypes.bool,
  /**
   * FormItem发生变化时是否提交表单
   * @type {boolean}
   */
  submitOnChange: propTypes.bool,

  /**
   * 空白行格,可以是数值或者 col 对象 数
   */
  emptySpan: {
    type: [Number, Object] as PropType<number | Recordable>,
    default: 0,
  },
  /**
   * 转化时间格式
   */
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date,
  },
  /**
   * 校验信息是否加入 label
   * @type {boolean}
   * @default true
   */
  rulesMessageJoinLabel: propTypes.bool.def(true),
  /**
   * 如果 showAdvancedButton 为 true，超过指定行数行默认折叠
   * @type {number}
   * @default 3
   */
  autoAdvancedLine: propTypes.number.def(3),
  /**
   * 折叠时始终保持显示的行数
   * @type {number}
   * @default 1
   */
  alwaysShowLines: propTypes.number.def(1),
  /**
   * 是否聚焦第一个输入框，只在第一个表单项为input的时候作用
   * @type {boolean}
   */
  autoFocusFirstItem: propTypes.bool.def(true),

  tableAction: {
    type: Object as PropType<TableActionType>,
  },
  /**
   * 自定义重置按钮逻辑
   */
  resetFunc: Function as PropType<() => Promise<void>>,
  /**
   * 	自定义提交按钮逻辑
   */
  submitFunc: Function as PropType<() => Promise<void>>,

  ...formActionProps,
};

export const formItemProps = {
  schema: {
    type: Object as PropType<FormSchema>,
    default: () => ({}),
  },
  formProps: {
    type: Object as PropType<FormProps>,
    default: () => ({}),
  },
  allDefaultValues: {
    type: Object as PropType<Recordable<any>>,
    default: () => ({}),
  },
  formModel: {
    type: Object as PropType<Recordable<any>>,
    default: () => ({}),
  },
  setFormModel: {
    type: Function as PropType<(key: string, value: any, schema: FormSchema) => void>,
    default: null,
  },
  tableAction: {
    type: Object as PropType<TableActionType>,
  },
  formActionType: {
    type: Object as PropType<FormActionType>,
  },
  isAdvanced: {
    type: Boolean,
  },
};

export type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean };
