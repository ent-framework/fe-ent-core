<template>
  <ent-page-wrapper
    title="后台权限示例"
    content-background
    content-class="p-4"
    content="目前mock了两组数据， id为1 和 2 具体返回的菜单可以在mock/sys/menu.ts内查看"
  >
    <CurrentPermissionMode />

    <Alert class="mt-4" type="info" message="点击后请查看左侧菜单变化" show-icon />

    <div class="mt-4">
      权限切换(请先切换权限模式为后台权限模式):
      <Space>
        <ent-button :disabled="!isBackPremissionMode" @click="switchToken(1)">
          获取用户id为1的菜单
        </ent-button>
        <ent-button :disabled="!isBackPremissionMode" @click="switchToken(2)">
          获取用户id为2的菜单
        </ent-button>
      </Space>
    </div>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import {
    EntPageWrapper,
    PermissionModeEnum,
    RoleEnum,
    useAppStore,
    usePermission,
    useUserStore,
  } from 'fe-ent-core';
  import { Alert, Space } from 'ant-design-vue';
  import CurrentPermissionMode from '../current-permission-mode.vue';
  export default defineComponent({
    components: { Space, Alert, CurrentPermissionMode, EntPageWrapper },
    setup() {
      const { refreshMenu } = usePermission();
      const userStore = useUserStore();
      const appStore = useAppStore();

      const isBackPremissionMode = computed(
        () => appStore.getProjectConfig.permissionMode === PermissionModeEnum.BACK,
      );

      async function switchToken(userId: number) {
        // 本函数切换用户登录Token的部分仅用于演示，实际生产时切换身份应当重新登录
        const token = `fakeToken${userId}`;
        userStore.setToken(token);

        // 重新获取用户信息和菜单
        userStore.getUserInfoAction();
        refreshMenu();
      }

      return {
        RoleEnum,
        refreshMenu,
        switchToken,
        isBackPremissionMode,
      };
    },
  });
</script>
<style lang="less" scoped>
  .demo {
    background-color: @component-background;
  }
</style>
