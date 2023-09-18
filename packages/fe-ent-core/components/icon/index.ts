import { withInstall } from '@ent-core/utils';
import Icon from './src/icon.vue';
import IconPicker from './src/icon-picker.vue';

export const EntIcon = withInstall(Icon);
export const EntIconPicker = withInstall(IconPicker);

export default Icon;
export { IconPicker };
