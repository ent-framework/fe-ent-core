import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  props: {
    data: {
      required: true,
      type: String
    },
    onClick: Function as PropType<(e: MouseEvent) => void>
  },

  render() {
    const { data } = this;

    const { onClick } = this;

    return (
      <span class="vjs-tree__brackets" onClick={onClick}>
        {data}
      </span>
    );
  }
});
