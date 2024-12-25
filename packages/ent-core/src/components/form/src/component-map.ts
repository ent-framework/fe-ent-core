/**
 * Component list, register here to setting it in the form
 */
import {
  NAutoComplete,
  NCascader,
  NCheckbox,
  NDatePicker,
  NDivider,
  NInput,
  NInputGroup,
  NInputNumber,
  NRadio,
  NRate,
  NSelect,
  NSlider,
  NSwitch,
  NTimePicker,
  NTransfer,
  NTreeSelect
} from 'naive-ui';

import EntUpload from '../../upload/src/index.vue';
import EntStrengthMeter from '../../strength-meter/src/index.vue';
import EntIconPicker from '../../icon/src/icon-picker.vue';
import EntCountDownInput from '../../count-down/src/countdown-input.vue';
import DateRangePicker from './components/date-range-picker.vue';
import DateTimePicker from './components/datetime-picker.vue';
import DateTimeRangePicker from './components/datetime-range-picker.vue';
import MonthPicker from './components/month-picker.vue';
import MonthRangePicker from './components/month-range-picker.vue';
import QuarterPicker from './components/quarter-picker.vue';
import QuarterRangePicker from './components/quarter-range-picker.vue';
import YearPicker from './components/year-picker.vue';
import YearRangePicker from './components/year-range-picker.vue';
import WeekPicker from './components/week-picker.vue';

import CheckboxGroup from './components/checkbox-group.vue';
import InputTextArea from './components/input-text-area.vue';
import InputPassword from './components/input-password.vue';
import RadioGroup from './components/radio-group.vue';
import ApiRadioGroup from './components/api-radio-group.vue';
import RadioButtonGroup from './components/radio-button-group.vue';
import ApiSelect from './components/api-select.vue';
import ApiTree from './components/api-tree.vue';
import ApiTreeSelect from './components/api-tree-select.vue';
import ApiCascader from './components/api-cascader.vue';
import ApiTransfer from './components/api-transfer.vue';
import type { ComponentType } from './types';
import type { Component } from 'vue';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('Input', NInput);
componentMap.set('InputGroup', NInputGroup);
componentMap.set('InputPassword', InputPassword);
//componentMap.set('InputSearch', Input.Search);
componentMap.set('InputTextArea', InputTextArea);
componentMap.set('InputNumber', NInputNumber);
componentMap.set('AutoComplete', NAutoComplete);

componentMap.set('Select', NSelect);
componentMap.set('ApiSelect', ApiSelect);
componentMap.set('ApiTree', ApiTree);
componentMap.set('TreeSelect', NTreeSelect);
componentMap.set('ApiTreeSelect', ApiTreeSelect);
componentMap.set('ApiRadioGroup', ApiRadioGroup);
componentMap.set('Switch', NSwitch);
componentMap.set('Radio', NRadio);
componentMap.set('RadioButtonGroup', RadioButtonGroup);
componentMap.set('RadioGroup', RadioGroup);
componentMap.set('Checkbox', NCheckbox);
componentMap.set('CheckboxGroup', CheckboxGroup);
componentMap.set('ApiCascader', ApiCascader);
componentMap.set('Cascader', NCascader);
componentMap.set('Slider', NSlider);
componentMap.set('Rate', NRate);
componentMap.set('ApiTransfer', ApiTransfer);
componentMap.set('Transfer', NTransfer);

componentMap.set('DatePicker', NDatePicker);
componentMap.set('RangePicker', DateRangePicker);
componentMap.set('DateTimePicker', DateTimePicker);
componentMap.set('DateTimeRangePicker', DateTimeRangePicker);
componentMap.set('MonthPicker', MonthPicker);
componentMap.set('MonthRangePicker', MonthRangePicker);
componentMap.set('QuarterPicker', QuarterPicker);
componentMap.set('QuarterRangePicker', QuarterRangePicker);
componentMap.set('YearPicker', YearPicker);
componentMap.set('YearRangePicker', YearRangePicker);
componentMap.set('WeekPicker', WeekPicker);
componentMap.set('TimePicker', NTimePicker);
componentMap.set('StrengthMeter', EntStrengthMeter);
componentMap.set('IconPicker', EntIconPicker);
componentMap.set('InputCountDown', EntCountDownInput);

componentMap.set('Upload', EntUpload);
componentMap.set('Divider', NDivider);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
