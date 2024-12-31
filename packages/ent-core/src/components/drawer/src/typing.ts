import type { basicProps, footerProps } from './props';
import type { ComputedRef } from 'vue';
import type { ExtractPublicPropTypes } from '../../../types';

export interface DrawerActionType {
  setDrawerProps: (props: Partial<DrawerProps>) => void;
  open: (show: boolean) => void;
  changeLoading: (loading: boolean) => void;
  getOpen?: ComputedRef<boolean>;
}

export interface DrawerInstance {
  setDrawerProps: (props: Partial<DrawerProps>) => void;
  emitVisible?: (visible: boolean, uid: number) => void;
}

export interface ReturnDrawerMethods extends DrawerInstance {
  openDrawer: <T = any>(open?: boolean, data?: T, openOnSet?: boolean) => void;
  closeDrawer: () => void;
  getOpen?: ComputedRef<boolean>;
}

export type RegisterDrawerFn = (drawerInstance: DrawerInstance, uuid: number) => void;

export interface ReturnDrawerInnerMethods extends DrawerInstance {
  closeDrawer: () => void;
  changeLoading: (loading: boolean) => void;
  changeOkLoading: (loading: boolean) => void;
  getOpen?: ComputedRef<boolean>;
}

export type UseDrawerReturnType = [RegisterDrawerFn, ReturnDrawerMethods];

export type UseDrawerInnerReturnType = [RegisterDrawerFn, ReturnDrawerInnerMethods];

export interface DrawerFooterProps extends ExtractPublicPropTypes<typeof footerProps> {}

export type DrawerProps = ExtractPublicPropTypes<typeof basicProps>;
