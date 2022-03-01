import { withInstall } from '@ent-core/utils';
import basicArrow from './src/BasicArrow.vue';
import basicTitle from './src/BasicTitle.vue';
import basicHelp from './src/BasicHelp.vue';

export const EntArrow = withInstall(basicArrow);
export const EntTitle = withInstall(basicTitle);
export const EntHelp = withInstall(basicHelp);
