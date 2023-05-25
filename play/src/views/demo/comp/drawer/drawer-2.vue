<template>
  <ent-drawer v-bind="$attrs" title="Drawer Title" width="50%" @register="register">
    Drawer Info.
    <ent-button type="primary" @click="closeDrawer"> 内部关闭drawer </ent-button>
  </ent-drawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDrawerInner } from 'fe-ent-core/es/components/drawer';
  export default defineComponent({
    setup() {
      const [register, { closeDrawer }] = useDrawerInner();
      return { register, closeDrawer };
    },
  });
</script>
