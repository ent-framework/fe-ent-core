import { Transition, defineComponent } from 'vue';
import { getSlot } from '@ent-core/utils/helper/tsx-helper';
import type { PropType } from 'vue';
import type { Recordable } from '@ent-core/types';
import type { Mode } from './type';

export function createJavascriptTransition(
  name: string,
  functions: Recordable,
  mode: Mode = 'in-out',
) {
  return defineComponent({
    name,
    props: {
      mode: {
        type: String as PropType<Mode>,
        default: mode,
      },
    },
    setup(props, { attrs, slots }) {
      return () => {
        return (
          <Transition
            name={name}
            mode={props.mode}
            {...attrs}
            onBeforeEnter={functions.beforeEnter}
            onEnter={functions.enter}
            onLeave={functions.leave}
            onAfterLeave={functions.afterLeave}
            onLeaveCancelled={functions.afterLeave}
          >
            {() => getSlot(slots)}
          </Transition>
        );
      };
    },
  });
}
