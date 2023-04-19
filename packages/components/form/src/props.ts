import type { FieldMapToTime, FormSchema } from './types/form';
import type { CSSProperties, PropType } from 'vue';
import type { ColEx } from './types';
import type { TableActionType } from '@ent-core/components/table';
import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';
import type { RowProps } from 'ant-design-vue/lib/grid/Row';
import { propTypes } from '@ent-core/utils/prop-types';

export const basicProps = {
  layout: propTypes.oneOf(['horizontal', 'vertical', 'inline']).def('horizontal'),
  model: {
    type: Object as PropType<Recordable>,
    default: {},
  },
  // 标签宽度  固定宽度
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  labelAlign: propTypes.string,
  rowProps: Object as PropType<RowProps>,
  submitOnReset: propTypes.bool,
  labelCol: Object as PropType<Partial<ColEx>>,
  wrapperCol: Object as PropType<Partial<ColEx>>,
  baseRowStyle: {
    type: Object as PropType<CSSProperties>,
  },
  baseColProps: {
    type: Object as PropType<Partial<ColEx>>,
  },
  // 表单配置规则
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  mergeDynamicData: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  compact: propTypes.bool,
  emptySpan: {
    type: [Number, Object] as PropType<number>,
    default: 0,
  },
  size: propTypes.oneOf(['default', 'small', 'large']).def('default'),

  // 禁用表单
  disabled: propTypes.bool,

  fieldMapToTime: {
    type: Array as PropType<FieldMapToTime>,
    default: () => [],
  },

  autoSetPlaceHolder: propTypes.bool.def(true),
  // 在INPUT组件上单击回车时，是否自动提交
  autoSubmitOnEnter: propTypes.bool.def(false),

  rulesMessageJoinLabel: propTypes.bool.def(true),
  // 是否显示收起展开按钮
  showAdvancedButton: propTypes.bool,
  // 是否聚焦第一个输入框，只在第一个表单项为input的时候作用
  autoFocusFirstItem: propTypes.bool,
  // 超过3行自动折叠
  autoAdvancedLine: propTypes.number.def(3),

  // 不受折叠影响的行数
  alwaysShowLines: propTypes.number.def(1),

  // 是否显示操作按钮
  showActionButtonGroup: propTypes.bool.def(true),

  // 重置按钮配置
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,

  // 确认按钮配置
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,

  // 操作列Col配置
  actionColOptions: Object as PropType<Partial<ColEx>>,

  // 显示重置按钮
  showResetButton: propTypes.bool.def(true),

  // 显示确认按钮
  showSubmitButton: propTypes.bool.def(true),

  // 自定义重置函数
  resetFunc: Function as PropType<() => Promise<void>>,
  submitFunc: Function as PropType<() => Promise<void>>,

  // 转化时间
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => {
      return date._isAMomentObject ? date?.format('YYYY-MM-DD HH:mm:ss') : date;
    },
  },
  colon: propTypes.bool,

  // 以下为默认props
  hideRequiredMark: propTypes.bool,

  tableAction: {
    type: Object as PropType<TableActionType>,
  },
};