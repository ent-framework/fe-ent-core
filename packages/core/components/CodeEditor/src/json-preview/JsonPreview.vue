<template>
  <vue-json-pretty :path="'res'" :deep="3" :showLength="true" :data="data" />
</template>

<script lang="ts" setup>
  import VueJsonPretty from './src';
  //import 'vue-json-pretty/lib/styles.css';

  defineProps({
    data: Object,
  });
</script>
