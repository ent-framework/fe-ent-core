import { withInstall } from '../../utils';

import ImagePreview from './src/preview.vue';
export { createImgPreview } from './src/functional';

export const EntImagePreview = withInstall(ImagePreview);
export default ImagePreview;
