import { withInstall } from '@ent-core/utils';
import basicArrow from './src/basic-arrow.vue';
import basicTitle from './src/basic-title.vue';
import basicHelp from './src/basic-help.vue';

export const EntArrow = withInstall(basicArrow, 'EntArrow');
export const EntTitle = withInstall(basicTitle, 'EntTitle');
export const EntHelp = withInstall(basicHelp);
