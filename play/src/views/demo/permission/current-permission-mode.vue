<template>
  <div class="mt-2">
    当前权限模式：
    <ent-button type="link">
      {{ permissionMode === PermissionModeEnum.BACK ? '后台权限模式' : '前端角色权限模式' }}
    </ent-button>
    <ent-button class="ml-4" type="primary" @click="togglePermissionMode">
      切换权限模式
    </ent-button>
    <Divider />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { PermissionModeEnum, useAppStore, usePermission } from 'fe-ent-core';
  import { Divider } from 'ant-design-vue';
  export default defineComponent({
    name: 'CurrentPermissionMode',
    components: { Divider },
    setup() {
      const appStore = useAppStore();
      const permissionMode = computed(() => appStore.getProjectConfig.permissionMode);
      const { togglePermissionMode } = usePermission();

      return {
        permissionMode,
        PermissionModeEnum,
        togglePermissionMode,
      };
    },
  });
</script>
