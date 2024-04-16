import type { basicProps } from './props';
import type { ComputedRef } from 'vue';
import type { ExtractPublicPropTypes } from '../../../types';
/**
 * @description: 弹窗对外暴露的方法
 */
export interface ModalMethods {
  setModalProps: (props: Partial<ModalProps>) => void;
  emitVisible?: (visible: boolean, uid: number) => void;
  redoModalHeight?: () => void;
}

export type RegisterModalFn = (modalMethods: ModalMethods, uuid: number) => void;

export interface ReturnModalMethods extends ModalMethods {
  openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void;
  closeModal: () => void;
  getVisible?: ComputedRef<boolean>;
}

export type UseModalReturnType = [RegisterModalFn, ReturnModalMethods];

export interface ReturnModalInnerMethods extends ModalMethods {
  closeModal: () => void;
  changeLoading: (loading: boolean) => void;
  changeOkLoading: (loading: boolean) => void;
  getVisible?: ComputedRef<boolean>;
  redoModalHeight: () => void;
}

export type UseModalInnerReturnType = [RegisterModalFn, ReturnModalInnerMethods];

export interface ModalProps extends ExtractPublicPropTypes<typeof basicProps> {}

export interface ModalWrapperProps {
  footerOffset?: number;
  loading: boolean;
  modalHeaderHeight: number;
  modalFooterHeight: number;
  minHeight: number;
  height: number;
  open: boolean;
  fullScreen: boolean;
  useWrapper: boolean;
}
