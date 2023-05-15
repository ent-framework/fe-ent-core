import type { Ref } from 'vue';
import type { Fn } from '@ent-core/types';

export interface Props {
  theme: string;
  activeName?: string | number | undefined;
  openNames: string[];
  accordion: boolean;
  width: string;
  collapsedWidth: string;
  indentSize: number;
  collapse: boolean;
  activeSubMenuNames: (string | number)[];
}

export interface SubMenuProvider {
  addSubMenu: (name: string, update?: boolean) => void;
  removeSubMenu: (name: string, update?: boolean) => void;
  removeAll: () => void;
  sliceIndex: (index: number) => void;
  isRemoveAllPopup: Ref<boolean>;
  getOpenNames: () => (string | number)[];
  handleMouseleave?: Fn;
  level: number;
  props: Props;
}
