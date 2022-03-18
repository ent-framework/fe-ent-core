import { withInstall } from '@ent-core/utils';
import cropperImage from './src/cropper.vue';
import avatarCropper from './src/cropper-avatar.vue';

export * from './src/typing';
export const EntCropperImage = withInstall(cropperImage);
export const EntCropperAvatar = withInstall(avatarCropper);
