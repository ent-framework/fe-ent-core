import { withInstall } from '@ent-core/utils';
import cropperImage from './src/Cropper.vue';
import avatarCropper from './src/CropperAvatar.vue';

export * from './src/typing';
export const EntCropperImage = withInstall(cropperImage);
export const EntCropperAvatar = withInstall(avatarCropper);
