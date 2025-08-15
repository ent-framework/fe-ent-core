<template>
  <SettingCard />
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
  import { EntIcon } from 'fe-ent-core';

  import SettingCard from './setting-card';
import type {Nullable} from "fe-ent-core/es/types";
import type {DrawerActionType} from "fe-ent-core/es/components/drawer";


import './components/input-number-item.less';
import './components/select-item.less';
import './components/setting-footer.less';
import './components/switch-item.less';
import './components/theme-color-picker.less';
import './components/type-picker.less';

  export default defineComponent({
    name: 'SettingButton',
    components: { SettingCard, EntIcon },
    setup() {
      const drawerElRef = ref<Nullable<DrawerActionType>>(null);

      const openDrawer = (open: boolean) => {
        drawerElRef.value?.open(open);
      }
      return {
        drawerElRef,
        openDrawer
      };
    }
  });
</script>
