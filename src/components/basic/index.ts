import { withInstall } from '../../utils';
import BasicArrow from './src/basic-arrow.vue';
import BasicTitle from './src/basic-title.vue';
import BasicHelp from './src/basic-help.vue';

export const EntArrow = withInstall(BasicArrow);
export const EntTitle = withInstall(BasicTitle);
export const EntHelp = withInstall(BasicHelp);

export { BasicArrow, BasicHelp, BasicTitle };
