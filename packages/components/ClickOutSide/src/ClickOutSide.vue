<template>
  <div ref="wrap">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted, defineComponent } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  const emit = defineEmits(['mounted', 'clickOutside']);
  const wrap = ref<ElRef>(null);

  defineComponent({ name: 'EntClickOutSide' });
  onClickOutside(wrap, () => {
    emit('clickOutside');
  });

  onMounted(() => {
    emit('mounted');
  });
</script>
