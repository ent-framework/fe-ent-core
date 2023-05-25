import { withInstall } from '@ent-core/utils';

import pageWrapper from './src/page-wrapper.vue';
export const EntPageWrapper = withInstall(pageWrapper);
export default pageWrapper;
export { PageWrapperFixedHeightKey } from './constant';
