import { withInstall } from '@ent-core/utils';
import BasicForm from './src/index.vue';

export { useComponentRegister } from './src/hooks/use-component-register';
export { useForm } from './src/hooks/use-form';

export { default as ApiSelect } from './src/components/api-select.vue';
export { default as RadioButtonGroup } from './src/components/radio-button-group.vue';
export { default as ApiTreeSelect } from './src/components/api-tree-select.vue';
export { default as ApiTree } from './src/components/api-tree.vue';
export { default as ApiRadioGroup } from './src/components/api-radio-group.vue';
export { default as ApiCascader } from './src/components/api-cascader.vue';
export { default as ApiTransfer } from './src/components/api-transfer.vue';

export const EntForm = withInstall(BasicForm);
export default BasicForm;
