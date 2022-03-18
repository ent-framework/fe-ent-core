<template>
  <EntDrawer v-bind="$attrs" title="Drawer Title" width="50%"> Drawer Info. </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntDrawer } from 'fe-ent-core/lib/components/drawer';
  export default defineComponent({
    components: { EntDrawer },
    setup() {
      return {};
    },
  });
</script>
