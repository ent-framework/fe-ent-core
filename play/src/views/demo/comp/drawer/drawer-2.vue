<template>
  <EntDrawer v-bind="$attrs" @register="register" title="Drawer Title" width="50%">
    Drawer Info.
    <a-button type="primary" @click="closeDrawer"> 内部关闭drawer </a-button>
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntDrawer, useDrawerInner } from 'fe-ent-core/lib/components/drawer';
  export default defineComponent({
    components: { EntDrawer },
    setup() {
      const [register, { closeDrawer }] = useDrawerInner();
      return { register, closeDrawer };
    },
  });
</script>
