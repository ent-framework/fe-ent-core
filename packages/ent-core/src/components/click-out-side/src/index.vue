<template>
  <div ref="wrap">
    <slot />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import type { ElRef } from '../../../types';

  export default defineComponent({
    name: 'EntClickOutSide',
    emits: [
      /**
       * 组件mounted是触发
       */
      'mounted',
      /**
       * 鼠标在元素外点击时触发
       */
      'clickOutside',
    ],
    /**
     * @zh 默认
     * @slot default
     */
    setup(props, { emit }) {
      const wrap = ref<ElRef>(null);
      onClickOutside(wrap, () => {
        emit('clickOutside');
      });

      onMounted(() => {
        emit('mounted');
      });
      return { wrap };
    },
  });
</script>
