<template>
  <EntModal v-bind="$attrs" title="Modal Title" :help-message="['提示1', '提示2']" width="700px">
    <p v-for="index in 20" :key="index" class="h-20">根据屏幕高度自适应</p>
  </EntModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntModal } from 'fe-ent-core';
  export default defineComponent({
    components: { EntModal },
    setup() {
      return {};
    },
  });
</script>
