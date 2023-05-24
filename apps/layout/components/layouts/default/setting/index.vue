<template>
  <div @click="openDrawer(true)">
    <EntIcon icon="ion:settings-outline" />
    <SettingDrawer @register="register" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntIcon, useDrawer } from 'fe-ent-core';

  import SettingDrawer from './setting-drawer';

  export default defineComponent({
    name: 'SettingButton',
    components: { SettingDrawer, EntIcon },
    setup() {
      const [register, { openDrawer }] = useDrawer();

      return {
        register,
        openDrawer,
      };
    },
  });
</script>
