<template>
  <span :class="$attrs.class">
    <EntIcon :icon="icon" />
  </span>
</template>
<script lang="ts" setup>
  import { EntIcon } from 'fe-ent-core';
  defineProps({
    icon: String
  });
</script>
