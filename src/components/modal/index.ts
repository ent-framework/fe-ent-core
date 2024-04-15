import { withInstall } from '@ent-core/utils';
import basicModal from './src/index.vue';

export const EntModal = withInstall(basicModal);
export { useModalContext } from './src/hooks/use-modal-context';
export { useModal, useModalInner } from './src/hooks/use-modal';
export default basicModal;
