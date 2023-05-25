import { withInstall } from '@ent-core/utils/base';
import Loading from './src/index.vue';

export { useLoading } from './src/use-loading';
export { createLoading } from './src/create-loading';
export const EntLoading = withInstall(Loading);

export default Loading;
