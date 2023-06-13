<template>
  <section
    v-if="loading"
    class="full-loading"
    :class="{ absolute, [theme]: !!theme }"
    :style="[background ? `background-color: ${background}` : '']"
  >
    <Spin v-bind="$attrs" :tip="tip" :size="size" :spinning="loading" />
  </section>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Spin } from 'ant-design-vue';
  import { SizeEnum } from '@ent-core/logics/enums/size-enum';
  import type { PropType } from 'vue';

  export default defineComponent({
    name: 'EntLoading',
    components: { Spin },
    props: {
      /**
       * 加载文本
       */
      tip: {
        type: String as PropType<string>,
        default: '',
      },
      /**
       * 大小
       */
      size: {
        type: String as PropType<SizeEnum>,
        default: SizeEnum.LARGE,
        validator: (v: SizeEnum): boolean => {
          return [SizeEnum.DEFAULT, SizeEnum.SMALL, SizeEnum.LARGE].includes(v);
        },
      },
      /**
       * 绝对定位，为 false 时可以全屏
       */
      absolute: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      /**
       * 当前加载状态
       */
      loading: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      /**
       * 背景色
       */
      background: {
        type: String as PropType<string>,
      },
      /**
       * 背景色主题 ，当背景色不为空时使用背景色
       */
      theme: {
        type: String as PropType<'dark' | 'light'> | any,
      },
    },
  });
</script>
