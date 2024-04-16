import { withInstall } from '../../utils';
import CropperImage from './src/cropper.vue';
import CropperAvatar from './src/cropper-avatar.vue';

export const EntCropperImage = withInstall(CropperImage);
export const EntCropperAvatar = withInstall(CropperAvatar);

export default EntCropperImage;
export { CropperAvatar };
