import type { Component } from 'vue';
import {
  Input,
  Select,
  Checkbox,
  InputNumber,
  Switch,
  DatePicker,
  TimePicker,
} from 'ant-design-vue';
import type { ComponentType } from './types/component-type';
import { ApiSelect, ApiTreeSelect } from '@ent-core/components/form';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('Input', Input);
componentMap.set('InputNumber', InputNumber);
componentMap.set('Select', Select);
componentMap.set('ApiSelect', ApiSelect);
componentMap.set('ApiTreeSelect', ApiTreeSelect);
componentMap.set('Switch', Switch);
componentMap.set('Checkbox', Checkbox);
componentMap.set('DatePicker', DatePicker);
componentMap.set('TimePicker', TimePicker);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
