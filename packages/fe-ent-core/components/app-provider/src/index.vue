<script lang="ts">
  import { defineComponent, ref, toRefs } from 'vue';
  import { createBreakpointListen } from '@ent-core/hooks/event/use-breakpoint';
  import { createAppProviderContext } from './use-app-context';

  const props = {
    /**
     * class style prefix
     */
    prefixCls: { type: String, default: 'ent' },
  };

  export default defineComponent({
    name: 'EntAppProvider',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const isMobile = ref(false);

      // Monitor screen breakpoint information changes
      createBreakpointListen(({ screenMap, sizeEnum, width }) => {
        const lgWidth = screenMap.get(sizeEnum.LG);
        if (lgWidth) {
          isMobile.value = width.value - 1 < lgWidth;
        }
      });

      const { prefixCls } = toRefs(props);

      // Inject variables into the global
      createAppProviderContext({ prefixCls, isMobile });

      return () => slots.default?.();
    },
  });
</script>
