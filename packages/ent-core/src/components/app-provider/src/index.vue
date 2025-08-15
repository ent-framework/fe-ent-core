<script lang="ts">
  import { defineComponent, ref, toRefs } from 'vue';
  import { createBreakpointListen } from '../../../hooks/event/use-breakpoint';
  import { createAppProviderContext } from './use-app-context';
  import EntAppProviderWrapper from './wrapper.vue';

  const props = {
    /**
     * class style prefix
     */
    prefixCls: { type: String, default: 'ent' }
  };

  export default defineComponent({
    name: 'EntAppProvider',
    components: {
      EntAppProviderWrapper
    },
    inheritAttrs: false,
    props,
    setup(props) {
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
      //return () => slots.default?.();
    }
  });
</script>
<template>
    <EntAppProviderWrapper>
      <slot />
    </EntAppProviderWrapper>
</template>
