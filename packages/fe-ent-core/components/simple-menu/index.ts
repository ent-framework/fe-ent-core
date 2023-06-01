import { withInstall } from '@ent-core/utils';

import SimpleMenu from './src/index.vue';
import SimpleMenuTag from './src/simple-menu-tag.vue';

export const EntSimpleMenu = withInstall(SimpleMenu);
export const EntSimpleMenuTag = withInstall(SimpleMenuTag);

export default SimpleMenu;
