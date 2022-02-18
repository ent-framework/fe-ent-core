<template>
  <VueJsonPretty :path="'res'" :deep="3" :showLength="true" :data="data" />
</template>

<script lang="ts" setup>
  import VueJsonPretty from './src';

  defineProps({
    data: Object,
  });
</script>
