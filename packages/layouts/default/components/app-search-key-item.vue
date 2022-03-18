<template>
  <span :class="$attrs.class">
    <EntIcon :icon="icon" />
  </span>
</template>
<script lang="ts" setup>
  import { EntIcon } from '@ent-core/components/icon';
  defineProps({
    icon: String,
  });
</script>
