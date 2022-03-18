import type { VNode, FunctionalComponent } from 'vue';

import { h } from 'vue';
import { isString } from '@ent-core/utils/is';
import Icon from '@ent-core/components/icon/src/icon.vue';

export interface ComponentProps {
  icon: VNode | string;
}

export const TreeIcon: FunctionalComponent = ({ icon }: ComponentProps) => {
  if (!icon) return null;
  if (isString(icon)) {
    return h(Icon, { icon, class: 'mr-1' });
  }
  return Icon;
};
