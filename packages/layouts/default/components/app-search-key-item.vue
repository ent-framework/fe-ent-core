<template>
  <span :class="$attrs.class">
    <Icon :icon="icon" />
  </span>
</template>
<script lang="ts" setup>
  import { Icon } from '@ent-core/components/icon';
  defineProps({
    icon: String,
  });
</script>
