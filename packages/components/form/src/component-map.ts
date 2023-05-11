import type { Component } from 'vue';
import type { ComponentType } from './types';

/**
 * Component list, register here to setting it in the form
 */
import {
  Input,
  Select,
  Radio,
  Checkbox,
  AutoComplete,
  Cascader,
  DatePicker,
  InputNumber,
  Switch,
  TimePicker,
  TreeSelect,
  Slider,
  Rate,
  Divider,
} from 'ant-design-vue';

import ApiRadioGroup from './components/api-radio-group.vue';
import RadioButtonGroup from './components/radio-button-group.vue';
import ApiSelect from './components/api-select.vue';
import ApiTree from './components/api-tree.vue';
import ApiTreeSelect from './components/api-tree-select.vue';
import ApiCascader from './components/api-cascader.vue';
import ApiTransfer from './components/api-transfer.vue';
import { EntUpload } from '@ent-core/components/upload';
import { EntStrengthMeter } from '@ent-core/components/strength-meter';
import { EntIconPicker } from '@ent-core/components/icon';
import { EntCountdownInput } from '@ent-core/components/count-down';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('Input', Input);
componentMap.set('InputGroup', Input.Group);
componentMap.set('InputPassword', Input.Password);
componentMap.set('InputSearch', Input.Search);
componentMap.set('InputTextArea', Input.TextArea);
componentMap.set('InputNumber', InputNumber);
componentMap.set('AutoComplete', AutoComplete);

componentMap.set('Select', Select);
componentMap.set('ApiSelect', ApiSelect);
componentMap.set('ApiTree', ApiTree);
componentMap.set('TreeSelect', TreeSelect);
componentMap.set('ApiTreeSelect', ApiTreeSelect);
componentMap.set('ApiRadioGroup', ApiRadioGroup);
componentMap.set('Switch', Switch);
componentMap.set('RadioButtonGroup', RadioButtonGroup);
componentMap.set('RadioGroup', Radio.Group);
componentMap.set('Checkbox', Checkbox);
componentMap.set('CheckboxGroup', Checkbox.Group);
componentMap.set('ApiCascader', ApiCascader);
componentMap.set('Cascader', Cascader);
componentMap.set('Slider', Slider);
componentMap.set('Rate', Rate);
componentMap.set('ApiTransfer', ApiTransfer);

componentMap.set('DatePicker', DatePicker);
componentMap.set('MonthPicker', DatePicker.MonthPicker);
componentMap.set('RangePicker', DatePicker.RangePicker);
componentMap.set('WeekPicker', DatePicker.WeekPicker);
componentMap.set('TimePicker', TimePicker);
componentMap.set('StrengthMeter', EntStrengthMeter);
componentMap.set('IconPicker', EntIconPicker);
componentMap.set('InputCountDown', EntCountdownInput);

componentMap.set('Upload', EntUpload);
componentMap.set('Divider', Divider);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
