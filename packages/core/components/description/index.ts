import { withInstall } from '@ent-core/utils';
import description from './src/description.vue';

export * from './src/typing';
export { useDescription } from './src/use-description';
export const EntDescription = withInstall(description);
