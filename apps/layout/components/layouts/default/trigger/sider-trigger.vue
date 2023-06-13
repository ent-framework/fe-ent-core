<template>
  <div @click.stop="toggleCollapsed">
    <EntIcon v-if="getCollapsed" icon="ant-design:double-right-outlined" />
    <EntIcon v-else icon="ant-design:double-left-outlined" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntIcon } from 'fe-ent-core';
  import { useMenuSetting } from '../../../../hooks';

  export default defineComponent({
    name: 'SiderTrigger',
    components: { EntIcon },
    setup() {
      const { getCollapsed, toggleCollapsed } = useMenuSetting();

      return { getCollapsed, toggleCollapsed };
    },
  });
</script>
