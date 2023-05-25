import { withInstall } from '@ent-core/utils';
import SvgIcon from './src/svg-icon.vue';
import Icon from './src/icon.vue';
import IconPicker from './src/icon-picker.vue';

export const EntSvgIcon = withInstall(SvgIcon);
export const EntIcon = withInstall(Icon);
export const EntIconPicker = withInstall(IconPicker);

export default Icon;
export { SvgIcon, IconPicker };
