<template>
  <Scrollbar ref="scrollbarRef" class="scroll-container" :style="getContentStyle" v-bind="$attrs">
    <slot />
  </Scrollbar>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, ref, unref } from 'vue';
  import Scrollbar from '@ent-core/components/scroll-bar';
  import { propTypes } from '@ent-core/es/utils';
  import { useTheme } from '@ent-core/hooks/web/use-theme';
  import { useScrollTo } from '@ent-core/hooks/event/use-scroll-to';
  import type { ScrollbarType } from '@ent-core/components/scroll-bar/interface';
  import type { Nullable } from '@ent-core/types';
  import type { CSSProperties } from 'vue';

  export default defineComponent({
    name: 'EntScrollContainer',
    components: { Scrollbar },
    props: {
      theme: propTypes.oneOf(['light', 'dark']).def('light'),
    },
    setup(props) {
      const scrollbarRef = ref<Nullable<ScrollbarType>>(null);

      /**
       * Scroll to the specified position
       */
      function scrollTo(to: number, duration = 500) {
        const scrollbar = unref(scrollbarRef);
        if (!scrollbar) {
          return;
        }
        nextTick(() => {
          const wrap = unref(scrollbar.wrap);
          if (!wrap) {
            return;
          }
          const { start } = useScrollTo({
            el: wrap,
            to,
            duration,
          });
          start();
        });
      }
      const { token } = useTheme();
      //const calcedToken = calcToken(props.theme, { colorPrimary: token.value.colorBgContainer });
      const getContentStyle = computed((): CSSProperties => {
        return {
          backgroundColor:
            props.theme == 'light' ? token.value.colorBgContainer : token.value.colorBgSpotlight,
        };
      });

      function getScrollWrap() {
        const scrollbar = unref(scrollbarRef);
        if (!scrollbar) {
          return null;
        }
        return scrollbar.wrap;
      }

      /**
       * Scroll to the bottom
       */
      function scrollBottom() {
        const scrollbar = unref(scrollbarRef);
        if (!scrollbar) {
          return;
        }
        nextTick(() => {
          const wrap = unref(scrollbar.wrap) as any;
          if (!wrap) {
            return;
          }
          const scrollHeight = wrap.scrollHeight as number;
          const { start } = useScrollTo({
            el: wrap,
            to: scrollHeight,
          });
          start();
        });
      }

      return {
        scrollbarRef,
        scrollTo,
        scrollBottom,
        getScrollWrap,
        getContentStyle,
      };
    },
  });
</script>
