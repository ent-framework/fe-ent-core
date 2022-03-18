import { withInstall } from '@ent-core/utils';
import svgIcon from './src/svg-icon.vue';
import icon from './src/icon.vue';
import iconPicker from './src/icon-picker.vue';

export const EntSvgIcon = withInstall(svgIcon);
export const EntIcon = withInstall(icon);
export const EntIconPicker = withInstall(iconPicker, 'EntIconPicker');

export default EntIcon;
