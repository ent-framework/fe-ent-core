import { withInstall } from '@ent-core/utils';
import basicModal from './src/BasicModal.vue';

export const EntModal = withInstall(basicModal);
export { useModalContext } from './src/hooks/useModalContext';
export { useModal, useModalInner } from './src/hooks/useModal';
export * from './src/typing';
