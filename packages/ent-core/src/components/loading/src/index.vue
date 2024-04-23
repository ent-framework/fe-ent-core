<template>
  <section
    v-if="loading"
    class="full-loading"
    :class="{ absolute, [theme]: !!theme }"
    :style="[background ? `background-color: ${background}` : '']"
  >
    <NSpin v-bind="$attrs" :description="tip" :size="size" :show="loading" />
  </section>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NSpin } from 'naive-ui';
  import type { PropType } from 'vue';

  export default defineComponent({
    name: 'EntLoading',
    components: { NSpin },
    props: {
      /**
       * 加载文本
       */
      tip: {
        type: String as PropType<string>,
        default: ''
      },
      /**
       * 大小
       */
      size: {
        type: [String, Number] as PropType<'small' | 'medium' | 'large' | number>,
        default: 'medium'
      },
      /**
       * 绝对定位，为 false 时可以全屏
       */
      absolute: {
        type: Boolean as PropType<boolean>,
        default: false
      },
      /**
       * 当前加载状态
       */
      loading: {
        type: Boolean as PropType<boolean>,
        default: false
      },
      /**
       * 背景色
       */
      background: {
        type: String as PropType<string>
      },
      /**
       * 背景色主题 ，当背景色不为空时使用背景色
       */
      theme: {
        type: String as PropType<'dark' | 'light'> | any
      }
    }
  });
</script>
