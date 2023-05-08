import { h, defineComponent } from 'vue';
import { isString } from 'lodash-es';
import Icon from '@ent-core/components/icon/src/icon.vue';

// export type TreeIconProps = {
//   icon: VueNode | String;
// };
//
// export const TreeIcon: FunctionalComponent = (props: TreeIconProps) => {
//   if (!props.icon) return null;
//   if (isString(props.icon)) {
//     return h(Icon, { icon: props.icon, class: 'mr-1' });
//   }
//   return Icon;
// };

export const TreeIcon = defineComponent({
  props: {
    icon: {
      type: String,
    },
  },
  setup(props) {
    return () => {
      if (!props.icon) return null;
      if (isString(props.icon)) {
        return h(Icon, { icon: props.icon, class: 'mr-1' });
      }
      return Icon;
    };
  },
});
