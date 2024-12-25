<template>
  <EntScrollbar
    ref="scrollbarRef"
    class="scroll-container"
    :style="getContentStyle"
    v-bind="$attrs"
  >
    <slot />
  </EntScrollbar>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, ref, unref } from 'vue';
  import EntScrollbar from '../../../components/scroll-bar/src/index.vue';
  import { useScrollTo } from '../../../hooks/event/use-scroll-to';
  import type { ScrollbarType } from '../../../components/scroll-bar/interface';
  import type { Nullable } from '../../../types';
  import type { CSSProperties } from 'vue';

  export default defineComponent({
    name: 'EntScrollContainer',
    components: { EntScrollbar },
    setup() {
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
            duration
          });
          start();
        });
      }
      //const { getToken } = useTheme();
      //const token = getToken(props.theme);
      const getContentStyle = computed((): CSSProperties => {
        // return {
        //   backgroundColor: token.colorBgContainer,
        // };
        return {};
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
            to: scrollHeight
          });
          start();
        });
      }

      return {
        scrollbarRef,
        scrollTo,
        scrollBottom,
        getScrollWrap,
        getContentStyle
      };
    }
  });
</script>
