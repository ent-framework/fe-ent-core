<template>
  <div :class="prefixCls" :style="getWrapStyle">
    <Spin :spinning="loading" size="large" :style="getWrapStyle">
      <iframe
        :src="frameSrc"
        :class="`${prefixCls}__main`"
        ref="frameRef"
        @load="hideLoading"
      ></iframe>
    </Spin>
  </div>
</template>
<script lang="ts" setup>
  import type { CSSProperties } from 'vue';
  import { ref, unref, computed } from 'vue';
  import { Spin } from 'ant-design-vue';
  import { useWindowSizeFn } from 'fe-ent-core/lib/hooks';
  import { propTypes } from 'fe-ent-core/lib/utils';
  import { useDesign } from 'fe-ent-core/lib/hooks';
  import { useLayoutHeight } from 'fe-ent-core/lib/hooks';

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
