import { withInstall } from '@ent-core/utils';
import collapseContainer from './src/collapse/CollapseContainer.vue';
import scrollContainer from './src/ScrollContainer.vue';
import lazyContainer from './src/LazyContainer.vue';

export const EntCollapseContainer = withInstall(collapseContainer);
export const EntScrollContainer = withInstall(scrollContainer);
export const EntLazyContainer = withInstall(lazyContainer);

export * from './src/typing';
