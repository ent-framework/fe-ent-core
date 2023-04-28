import { withInstall } from '@ent-core/utils';
import BasicTree from './src/tree.vue';

export { BasicTree };
export const EntTree = withInstall(BasicTree);
export * from './src/typing';
