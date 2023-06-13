import { formProps } from 'ant-design-vue/es/form';
import { propTypes } from '@ent-core/utils/prop-types';
import type { Fn, Recordable } from '@ent-core/types';
import type { FieldMapToTime, FormSchema } from './types/form';
import type { CSSProperties, PropType } from 'vue';
import type { ColEx } from './types';
import type { TableActionType } from '@ent-core/components/table/interface';
import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';
import type { RowProps } from 'ant-design-vue/es/grid/Row';

export const basicProps = {
  /**
   * 扩展 form 组件，增加 label 宽度，表单内所有组件适用，可以单独在某个项覆盖或者禁用
   */
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  /**
   * 用于将表单内时间区域的应设成 2 个字段,见下方说明
   */
  fieldMapToTime: {
    type: Array as PropType<FieldMapToTime>,
    default: () => [],
  },
  /**
   * 紧凑类型表单，减少 margin-bottom
   * @type {boolean}
   */
  compact: propTypes.bool,
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
   * 配置所有 Row 的 style 样式
   */
  baseRowStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局
   */
  baseColProps: {
    type: Object as PropType<Partial<ColEx>>,
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
   * 是否显示收起展开按钮
   * @type {boolean}
   */
  showAdvancedButton: propTypes.bool,
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
   * 是否显示操作按钮
   * @type {boolean}
   * @default true
   */
  showActionButtonGroup: propTypes.bool.def(true),
  /**
   * 操作按钮外层 Col 组件配置，如果开启 showAdvancedButton，则不用设置，具体见下方 actionColOptions
   */
  actionColOptions: Object as PropType<Partial<ColEx>>,
  /**
   * 显示重置按钮
   * @type {boolean}
   * @default true
   */
  showResetButton: propTypes.bool.def(true),
  /**
   * 是否聚焦第一个输入框，只在第一个表单项为input的时候作用
   * @type {boolean}
   */
  autoFocusFirstItem: propTypes.bool,
  /**
   * 重置按钮配置见下方 ActionButtonOption
   */
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  /**
   * 是否显示确认按钮
   * @type {boolean}
   * @default true
   */
  showSubmitButton: propTypes.bool.def(true),
  /**
   * 确认按钮配置
   */
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  tableAction: {
    type: Object as PropType<TableActionType>,
  },
  // 自定义重置函数
  /**
   * 自定义重置按钮逻辑
   */
  resetFunc: Function as PropType<() => Promise<void>>,
  /**
   * 	自定义提交按钮逻辑
   */
  submitFunc: Function as PropType<() => Promise<void>>,
  rowProps: Object as PropType<RowProps>,
  // 以下为默认props
  // labelCol: Object as PropType<Partial<ColEx>>,
  //
  // layout: propTypes.oneOf(['horizontal', 'vertical', 'inline']).def('horizontal'),
  //
  // wrapperCol: Object as PropType<Partial<ColEx>>,
  //
  // colon: propTypes.bool,
  //
  // labelAlign: propTypes.string,
  //
  /**
   * Size
   */
  //size: propTypes.oneOf(['default', 'small', 'large']).def('default'),

  ...formProps(),
};
