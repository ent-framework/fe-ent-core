<template>
  <EntModal v-bind="$attrs" title="Modal Title" :helpMessage="['提示1', '提示2']" width="700px">
    <p class="h-20" v-for="index in 20" :key="index">根据屏幕高度自适应</p>
  </EntModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntModal } from 'fe-ent-core/lib/components/modal';
  export default defineComponent({
    components: { EntModal },
    setup() {
      return {};
    },
  });
</script>
