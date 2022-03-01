import { withInstall } from '@ent-core/utils/index';
import basicDragVerify from './src/DragVerify.vue';
import rotateDragVerify from './src/ImgRotate.vue';

export const EntBasicDragVerify = withInstall(basicDragVerify);
export const EntRotateDragVerify = withInstall(rotateDragVerify);
export * from './src/typing';
