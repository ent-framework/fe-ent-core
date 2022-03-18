<template>
  <EntDrawer v-bind="$attrs" :isDetail="true" title="Drawer Title5">
    <p class="h-20">Content Message</p>
    <template #titleToolbar> toolbar </template>
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntDrawer } from 'fe-ent-core/lib/components/drawer';
  export default defineComponent({
    components: { EntDrawer },
  });
</script>
