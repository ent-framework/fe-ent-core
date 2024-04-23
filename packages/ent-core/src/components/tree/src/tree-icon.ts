import { defineComponent, h } from 'vue';
import { isString } from 'lodash-es';
import Icon from '../../../components/icon/src/icon.vue';

export const TreeIcon = defineComponent({
  props: {
    icon: {
      type: String
    }
  },
  setup(props) {
    return () => {
      if (!props.icon) return null;
      if (isString(props.icon)) {
        return h(Icon, { icon: props.icon, class: 'mr-1' });
      }
      return Icon;
    };
  }
});
