import { withInstall } from '@ent-core/utils';
import basicDrawer from './src/BasicDrawer.vue';

export const BasicDrawer = withInstall(basicDrawer);
export * from './src/typing';
export { useDrawer, useDrawerInner } from './src/useDrawer';
