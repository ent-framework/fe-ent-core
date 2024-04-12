import { inputGroupProps, inputProps } from 'naive-ui/es/input';
import { inputNumberProps } from 'naive-ui/es/input-number';
import { selectProps } from 'naive-ui/es/select';
import { dividerProps } from 'naive-ui/es/divider';
import { countDownInputProps } from '@ent-core/components/count-down';

export type ComponentType =
  | 'Input'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSearch'
  | 'InputTextArea'
  | 'InputNumber'
  | 'InputCountDown'
  | 'Select'
  | 'ApiSelect'
  | 'TreeSelect'
  | 'ApiTree'
  | 'ApiTreeSelect'
  | 'ApiRadioGroup'
  | 'Radio'
  | 'RadioButtonGroup'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'AutoComplete'
  | 'ApiCascader'
  | 'Cascader'
  | 'DatePicker'
  | 'RangePicker'
  | 'DateTimePicker'
  | 'DateTimeRangePicker'
  | 'MonthPicker'
  | 'MonthRangePicker'
  | 'QuarterPicker'
  | 'QuarterRangePicker'
  | 'YearPicker'
  | 'YearRangePicker'
  | 'WeekPicker'
  | 'TimePicker'
  | 'Switch'
  | 'StrengthMeter'
  | 'Upload'
  | 'IconPicker'
  | 'Render'
  | 'Slider'
  | 'Rate'
  | 'Divider'
  | 'Transfer'
  | 'ApiTransfer';

export const componentsRegistry = {
  Input: {
    // Input组件的props定义
    props: inputProps,
  },
  InputGroup: {
    // Select组件的props定义
    props: inputGroupProps,
  },
  InputPassword: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  InputSearch: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  InputTextArea: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  InputNumber: {
    // InputGroup组件的props定义
    props: inputNumberProps,
  },
  InputCountDown: {
    // InputGroup组件的props定义
    props: countDownInputProps,
  },
  Select: {
    // InputGroup组件的props定义
    props: selectProps,
  },
  ApiSelect: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  TreeSelect: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  ApiTree: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  ApiTreeSelect: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  ApiRadioGroup: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  Radio: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  RadioButtonGroup: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  RadioGroup: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  Checkbox: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  CheckboxGroup: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  AutoComplete: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  ApiCascader: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  Cascader: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  DatePicker: {
    // InputGroup组件的props定义
    props: inputProps,
  },
  RangePicker: {
    props: inputProps,
  },
  DateTimePicker: {
    props: inputProps,
  },
  DateTimeRangePicker: {
    props: inputProps,
  },
  MonthPicker: {
    props: inputProps,
  },
  MonthRangePicker: {
    props: inputProps,
  },
  QuarterPicker: {
    props: inputProps,
  },
  QuarterRangePicker: {
    props: inputProps,
  },
  YearPicker: {
    props: inputProps,
  },
  YearRangePicker: {
    props: inputProps,
  },
  WeekPicker: {
    props: inputProps,
  },
  TimePicker: {
    props: inputProps,
  },
  Switch: {
    props: inputProps,
  },
  StrengthMeter: {
    props: inputProps,
  },
  Upload: {
    props: inputProps,
  },
  IconPicker: {
    props: inputProps,
  },
  Render: {
    props: inputProps,
  },
  Slider: {
    props: inputProps,
  },
  Rate: {
    props: inputProps,
  },
  Divider: {
    props: dividerProps,
  },
  Transfer: {
    props: inputProps,
  },
  ApiTransfer: {
    props: inputProps,
  },
  // ...其他组件
};
