<template>
  <EntDrawer v-bind="$attrs" :is-detail="true" title="Drawer Title5">
    <p class="h-20">Content Message</p>
    <template #titleToolbar> toolbar </template>
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntDrawer } from 'fe-ent-core';
  export default defineComponent({
    components: { EntDrawer },
  });
</script>
