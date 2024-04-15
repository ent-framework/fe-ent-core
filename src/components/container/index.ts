import { withInstall } from '../../utils';
import CollapseContainer from './src/collapse/collapse-container.vue';
import ScrollContainer from './src/scroll-container.vue';
import LazyContainer from './src/lazy-container.vue';

export const EntCollapseContainer = withInstall(CollapseContainer);
export const EntScrollContainer = withInstall(ScrollContainer);
export const EntLazyContainer = withInstall(LazyContainer);

export default CollapseContainer;
export { ScrollContainer, LazyContainer };
