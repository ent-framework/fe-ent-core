import { withInstall } from '@ent-core/utils';
import BasicForm from './src/basic-form.vue';

export * from './src/types/form';
export * from './src/types/form-item';

export { useComponentRegister } from './src/hooks/use-component-register';
export { useForm } from './src/hooks/use-form';

export { default as ApiSelect } from './src/components/api-select.vue';
export { default as RadioButtonGroup } from './src/components/radio-button-group.vue';
export { default as ApiTreeSelect } from './src/components/api-tree-select.vue';
export { default as ApiRadioGroup } from './src/components/api-radio-group.vue';
export { default as ApiCascader } from './src/components/api-cascader.vue';

export const EntForm = withInstall(BasicForm);
