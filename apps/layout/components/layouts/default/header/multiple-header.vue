<template>
  <div v-if="getIsShowPlaceholderDom" :style="getPlaceholderDomStyle" />
  <div :style="getWrapStyle" :class="getClass">
    <LayoutHeader v-if="getShowInsetHeaderRef" />
    <MultipleTabs v-if="getShowTabs" />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';

  import {
    useAppInject,
    useDesign,
    useFullContent,
    useHeaderSetting,
    useLayoutHeight,
    useMenuSetting,
    useMultipleTabSetting,
    useTheme,
  } from 'fe-ent-core/es/hooks';
  import MultipleTabs from '../tabs/index.vue';
  import LayoutHeader from './index.vue';
  import type { CSSProperties } from 'vue';

  const HEADER_HEIGHT = 48;

  const TABS_HEIGHT = 32;
  export default defineComponent({
    name: 'LayoutMultipleHeader',
    components: { LayoutHeader, MultipleTabs },
    setup() {
      const { setHeaderHeight } = useLayoutHeight();
      const { prefixCls } = useDesign('layout-multiple-header');

      const { getCalcContentWidth, getSplit } = useMenuSetting();
      const { getIsMobile } = useAppInject();
      const { getFixed, getShowInsetHeaderRef, getShowFullHeaderRef, getShowHeader } =
        useHeaderSetting();

      const { getActualHeaderTheme } = useTheme();

      const { getFullContent } = useFullContent();

      const { getShowMultipleTab } = useMultipleTabSetting();

      const getShowTabs = computed(() => {
        return unref(getShowMultipleTab) && !unref(getFullContent);
      });

      const getIsShowPlaceholderDom = computed(() => {
        return unref(getFixed) || unref(getShowFullHeaderRef);
      });

      const getWrapStyle = computed((): CSSProperties => {
        const style: CSSProperties = {};
        if (unref(getFixed)) {
          style.width = unref(getIsMobile) ? '100%' : unref(getCalcContentWidth);
        }
        if (unref(getShowFullHeaderRef)) {
          style.top = `${HEADER_HEIGHT}px`;
        }
        return style;
      });

      const getIsFixed = computed(() => {
        return unref(getFixed) || unref(getShowFullHeaderRef);
      });

      const getPlaceholderDomStyle = computed((): CSSProperties => {
        let height = 0;
        if (
          (unref(getShowFullHeaderRef) || !unref(getSplit)) &&
          unref(getShowHeader) &&
          !unref(getFullContent)
        ) {
          height += HEADER_HEIGHT;
        }
        if (unref(getShowMultipleTab) && !unref(getFullContent)) {
          height += TABS_HEIGHT;
        }
        setHeaderHeight(height);
        return {
          height: `${height}px`,
        };
      });

      const getClass = computed(() => {
        return [
          prefixCls,
          `${prefixCls}--${unref(getActualHeaderTheme)}`,
          { [`${prefixCls}--fixed`]: unref(getIsFixed) },
        ];
      });

      return {
        getClass,
        prefixCls,
        getPlaceholderDomStyle,
        getIsFixed,
        getWrapStyle,
        getIsShowPlaceholderDom,
        getShowTabs,
        getShowInsetHeaderRef,
      };
    },
  });
</script>
