import { withInstall } from '@ent-core/utils/index';
import basicDragVerify from './src/drag-verify.vue';
import rotateDragVerify from './src/img-rotate.vue';

export const EntDragVerify = withInstall(basicDragVerify);
export const EntRotateDragVerify = withInstall(rotateDragVerify);
export * from './src/typing';
