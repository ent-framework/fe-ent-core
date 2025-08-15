import type { basicProps, footerProps } from './props';
import type { ComputedRef } from 'vue';
import type { ExtractPublicPropTypes } from '../../../types';

export interface DrawerActionType {
  setDrawerProps: (props: Partial<DrawerProps>) => void;
  open: (show: boolean) => void;
  changeLoading: (loading: boolean) => void;
  getOpen?: ComputedRef<boolean>;
}

export interface DrawerFooterProps extends ExtractPublicPropTypes<typeof footerProps> {}

export type DrawerProps = ExtractPublicPropTypes<typeof basicProps>;
