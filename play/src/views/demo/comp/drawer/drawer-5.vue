<template>
  <ent-drawer v-bind="$attrs" :is-detail="true" title="Drawer Title5">
    <p class="h-20">Content Message</p>
    <template #titleToolbar> toolbar </template>
  </ent-drawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
  });
</script>
