<template>
  <div ref="wrap">
    <slot></slot>
  </div>
</template>
<script lang="ts">
  import { ref, onMounted } from 'vue';
  import { onClickOutside } from '@vueuse/core';

  export default {
    emits: ['mounted', 'clickOutside'],
    setup(_, { emit }) {
      const wrap = ref(null);
      onClickOutside(wrap, () => {
        emit('clickOutside');
      });

      onMounted(() => {
        emit('mounted');
      });
      return {
        wrap,
      };
    },
  };
</script>
