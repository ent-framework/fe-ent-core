<template>
  <div :class="prefixCls" :style="getWrapStyle">
    <NSpin :show="loading" size="large" :style="getWrapStyle">
      <iframe ref="frameRef" :src="frameSrc" :class="`${prefixCls}__main`" @load="hideLoading" />
    </NSpin>
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { NSpin } from 'naive-ui';
  import { useDesign, useLayoutHeight, useWindowSizeFn } from 'fe-ent-core/es/hooks';
  import { propTypes } from 'fe-ent-core/es/utils';
  import type { CSSProperties } from 'vue';

  defineProps({
    frameSrc: propTypes.string.def(''),
  });

  const loading = ref(true);
  const topRef = ref(50);
  const heightRef = ref(window.innerHeight);
  const frameRef = ref<HTMLFrameElement>();
  const { headerHeightRef } = useLayoutHeight();

  const { prefixCls } = useDesign('iframe-page');
  useWindowSizeFn(calcHeight, { wait: 150, immediate: true });

  const getWrapStyle = computed((): CSSProperties => {
    return {
      height: `${unref(heightRef)}px`,
    };
  });

  function calcHeight() {
    const iframe = unref(frameRef);
    if (!iframe) {
      return;
    }
    const top = headerHeightRef.value;
    topRef.value = top;
    heightRef.value = window.innerHeight - top;
    const clientHeight = document.documentElement.clientHeight - top;
    iframe.style.height = `${clientHeight}px`;
  }

  function hideLoading() {
    loading.value = false;
    calcHeight();
  }
</script>
