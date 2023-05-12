import { Transition, TransitionGroup, defineComponent } from 'vue';
import { getSlot } from '@ent-core/utils/helper/tsx-helper';
import type { PropType } from 'vue';
import type { Mode } from './type';

export function createSimpleTransition(name: string, origin = 'top center 0', mode?: Mode) {
  return defineComponent({
    name,
    props: {
      group: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      mode: {
        type: String as PropType<Mode>,
        default: mode,
      },
      origin: {
        type: String as PropType<string>,
        default: origin,
      },
    },
    setup(props, { slots, attrs }) {
      const onBeforeEnter = (el: HTMLElement) => {
        el.style.transformOrigin = props.origin;
      };

      return () => {
        const Tag = !props.group ? Transition : TransitionGroup;
        return (
          <Tag name={name} mode={props.mode} {...attrs} onBeforeEnter={onBeforeEnter}>
            {() => getSlot(slots)}
          </Tag>
        );
      };
    },
  });
}
