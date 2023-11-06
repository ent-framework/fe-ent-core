<template>
  <div class="mt-2">
    <Text>当前权限模式：</Text>
    <ent-button type="link">
      {{ permissionMode === PermissionModeEnum.BACK ? '后台权限模式' : '前端角色权限模式' }}
    </ent-button>
    <ent-button class="ml-4" type="primary" @click="togglePermissionMode">
      切换权限模式
    </ent-button>
    <Divider />
    <Card>
      <div>mock 登录账号: admin, 密码: 123456, role: super</div>
      <div>mock 登录账号: test, 密码: 123456, role: test</div>
      <div>mock 登录账号: super, 密码: 123456, role: super, test</div>
    </Card>
    <Divider />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { PermissionModeEnum } from 'fe-ent-core/es/logics/enums';
  import { useAppStore } from 'fe-ent-core/es/store';
  import { usePermission } from 'fe-ent-core/es/hooks';
  import { Divider, Card, Typography } from 'ant-design-vue';
  export default defineComponent({
    name: 'CurrentPermissionMode',
    components: { Divider, Card, Text: Typography.Text },
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
