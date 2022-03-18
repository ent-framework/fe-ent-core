import { withInstall } from '@ent-core/utils/index';
import Loading from './src/loading.vue';

export { Loading };
export { useLoading } from './src/use-loading';
export { createLoading } from './src/create-loading';
export const EntLoading = withInstall(Loading);
