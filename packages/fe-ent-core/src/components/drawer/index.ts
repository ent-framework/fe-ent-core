import { withInstall } from '@ent-core/utils';
import basicDrawer from './src/index.vue';

export const EntDrawer = withInstall(basicDrawer);
export { useDrawer, useDrawerInner } from './src/use-drawer';
export default basicDrawer;
