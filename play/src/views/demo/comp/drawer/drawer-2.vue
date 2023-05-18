<template>
  <EntDrawer v-bind="$attrs" @register="register" title="Drawer Title" width="50%">
    Drawer Info.
    <ent-button type="primary" @click="closeDrawer"> 内部关闭drawer </ent-button>
  </EntDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntDrawer, useDrawerInner } from '@ent-core/components/drawer';
  export default defineComponent({
    components: { EntDrawer },
    setup() {
      const [register, { closeDrawer }] = useDrawerInner();
      return { register, closeDrawer };
    },
  });
</script>
