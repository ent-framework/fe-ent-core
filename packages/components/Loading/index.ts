import { withInstall } from '@ent-core/utils/index';
import Loading from './src/Loading.vue';

export { Loading };
export { useLoading } from './src/useLoading';
export { createLoading } from './src/createLoading';
export const EntLoading = withInstall(Loading);
