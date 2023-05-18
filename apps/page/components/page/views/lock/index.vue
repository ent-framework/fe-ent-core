<template>
  <transition name="fade-bottom" mode="out-in">
    <LockPage v-if="getIsLock" />
  </transition>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { useLockStore } from 'fe-ent-core/lib/store';
  import LockPage from './lock-page.vue';

  const lockStore = useLockStore();
  const getIsLock = computed(() => lockStore?.getLockInfo?.isLock ?? false);
</script>
