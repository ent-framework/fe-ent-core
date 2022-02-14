import { withInstall } from 'fe-ent-core/utils';
import description from './src/Description.vue';

export * from './src/typing';
export { useDescription } from './src/useDescription';
export const Description = withInstall(description);