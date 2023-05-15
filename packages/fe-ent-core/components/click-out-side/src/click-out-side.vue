<template>
  <div ref="wrap">
    <slot />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import type { ElRef } from '@ent-core/types';

  defineOptions({
    name: 'EntClickOutSide',
  });

  const emit = defineEmits(['mounted', 'clickOutside']);
  const wrap = ref<ElRef>(null);

  onClickOutside(wrap, () => {
    emit('clickOutside');
  });

  onMounted(() => {
    emit('mounted');
  });
</script>
