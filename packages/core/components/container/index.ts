import { withInstall } from '@ent-core/utils';
import collapseContainer from './src/collapse/collapse-container.vue';
import scrollContainer from './src/scroll-container.vue';
import lazyContainer from './src/lazy-container.vue';

export const EntCollapseContainer = withInstall(collapseContainer, 'EntCollapseContainer');
export const EntScrollContainer = withInstall(scrollContainer);
export const EntLazyContainer = withInstall(lazyContainer);

export * from './src/typing';
