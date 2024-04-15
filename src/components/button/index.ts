import { withInstall } from '@ent-core/utils';
import BasicButton from './src/basic-button.vue';
import PopConfirmButton from './src/pop-confirm-button.vue';

export const EntButton = withInstall(BasicButton);
export const EntPopButton = withInstall(PopConfirmButton);

export default BasicButton;
export { PopConfirmButton };
