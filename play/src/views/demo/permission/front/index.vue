<template>
  <ent-page-wrapper
    title="前端权限示例"
    content-background
    content-class="p-4"
    content="由于刷新的时候会请求用户信息接口，会根据接口重置角色信息，所以刷新后界面会恢复原样，如果不需要，可以注释 src/layout/default/index内的获取用户信息接口"
  >
    <CurrentPermissionMode />

    <p>
      当前角色: <a> {{ userStore.getRoleList }} </a>
    </p>
    <Alert class="mt-4" type="info" message="点击后请查看左侧菜单变化" show-icon />

    <div class="mt-4">
      请通过切换账号来切换权限(请先切换权限模式为前端角色权限模式):
      <Space>
        <ent-button :type="isSuper ? 'primary' : 'default'" @click="handleLoginOut">
          super
        </ent-button>
        <ent-button :type="isTest ? 'primary' : 'default'" @click="handleLoginOut">
          test
        </ent-button>
      </Space>
    </div>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Alert, Space } from 'ant-design-vue';
  import { useUserStore } from 'fe-ent-core/es/store';
  import CurrentPermissionMode from '../current-permission-mode.vue';

  export default defineComponent({
    components: { Space, Alert, CurrentPermissionMode },
    setup() {
      const userStore = useUserStore();
      const isSuper = computed(() => userStore.getRoleList.includes('super'));
      const isTest = computed(() => userStore.getRoleList.includes('test'));
      function handleLoginOut() {
        userStore.confirmLoginOut();
      }
      return {
        userStore,
        isSuper,
        isTest,
        handleLoginOut,
      };
    },
  });
</script>
