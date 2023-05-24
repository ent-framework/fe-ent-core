<template>
  <ent-modal v-bind="$attrs" title="Modal Title" :help-message="['提示1', '提示2']" width="700px">
    <p v-for="index in 20" :key="index" class="h-20">根据屏幕高度自适应</p>
  </ent-modal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    setup() {
      return {};
    },
  });
</script>
