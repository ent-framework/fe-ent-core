<script lang="ts">
  import { defineComponent, ref, toRefs } from 'vue';
  import {
    NDialogProvider,
    NLoadingBarProvider,
    NMessageProvider,
    NModalProvider,
    NNotificationProvider
  } from 'naive-ui';
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
      NLoadingBarProvider,
      NDialogProvider,
      NNotificationProvider,
      NMessageProvider,
      NModalProvider,
      EntAppProviderWrapper
    },
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
      //return () => slots.default?.();
    }
  });
</script>

<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <NNotificationProvider>
        <NMessageProvider>
          <NModalProvider>
            <EntAppProviderWrapper>
              <slot />
            </EntAppProviderWrapper>
          </NModalProvider>
        </NMessageProvider>
      </NNotificationProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>
