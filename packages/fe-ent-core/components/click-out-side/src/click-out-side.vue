<template>
  <div ref="wrap">
    <slot />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import type { ElRef } from '@ent-core/types';

  export default defineComponent({
    name: 'EntClickOutSide',
    emits: [
      /**
       * 组件mounted是触发
       * @param {Date | string | number | undefined} value
       * @param {Date | undefined} date
       * @param {string | undefined} dateString
       */
      'mounted',
      /**
       * 鼠标在元素外点击时触发
       * @param {Date | string | number | undefined} value
       * @param {Date | undefined} date
       * @param {string | undefined} dateString
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
    },
  });
</script>
