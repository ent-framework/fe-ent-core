import { withInstall } from '@ent-core/utils';
import BasicDragVerify from './src/drag-verify.vue';
import RotateDragVerify from './src/img-rotate.vue';

export const EntDragVerify = withInstall(BasicDragVerify);
export const EntRotateDragVerify = withInstall(RotateDragVerify);
export default BasicDragVerify;
export { RotateDragVerify };
