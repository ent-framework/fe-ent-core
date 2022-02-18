<template>
  <VueJsonPretty :path="'res'" :deep="3" :showLength="true" :data="data" />
</template>

<script lang="ts">
  import VueJsonPretty from './src';

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'JsonPreview',
    components: { VueJsonPretty },
    props: {
      data: Object,
    },
  });
</script>
