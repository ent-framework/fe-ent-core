<template>
  <EntDrawer v-bind="$attrs" title="Drawer Title" width="50%" @register="register">
    Drawer Info.
    <ent-button type="primary" @click="closeDrawer"> 内部关闭drawer </ent-button>
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntDrawer, useDrawerInner } from 'fe-ent-core';
  export default defineComponent({
    components: { EntDrawer },
    setup() {
      const [register, { closeDrawer }] = useDrawerInner();
      return { register, closeDrawer };
    },
  });
</script>
