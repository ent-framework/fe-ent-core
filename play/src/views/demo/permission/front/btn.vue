<template>
  <ent-page-wrapper
    title="前端权限按钮示例"
    content-background
    content-class="p-4"
    content="由于刷新的时候会请求用户信息接口，会根据接口重置角色信息，所以刷新后界面会恢复原样，如果不需要，可以注释 src/layout/default/index内的获取用户信息接口"
  >
    <CurrentPermissionMode />

    <p>
      当前角色: <a> {{ userStore.getRoleList }} </a>
    </p>
    <Alert class="mt-4" type="info" message="点击后请查看按钮变化" show-icon />

    <div class="mt-4">
      权限切换(请先切换权限模式为前端角色权限模式):
      <Space>
        <ent-button :type="isSuper ? 'primary' : 'default'" @click="changeRole(RoleEnum.SUPER)">
          {{ RoleEnum.SUPER }}
        </ent-button>
        <ent-button :type="isTest ? 'primary' : 'default'" @click="changeRole(RoleEnum.TEST)">
          {{ RoleEnum.TEST }}
        </ent-button>
      </Space>
    </div>
    <Divider>组件方式判断权限(有需要可以自行全局注册)</Divider>
    <ent-authority :value="RoleEnum.SUPER">
      <ent-button type="primary" class="mx-4"> 拥有super角色权限可见 </ent-button>
    </ent-authority>

    <ent-authority :value="RoleEnum.TEST">
      <ent-button color="success" class="mx-4"> 拥有test角色权限可见 </ent-button>
    </ent-authority>

    <ent-authority :value="[RoleEnum.TEST, RoleEnum.SUPER]">
      <ent-button color="error" class="mx-4"> 拥有[test,super]角色权限可见 </ent-button>
    </ent-authority>

    <Divider>函数方式方式判断权限(适用于函数内部过滤)</Divider>
    <ent-button v-if="hasPermission(RoleEnum.SUPER)" type="primary" class="mx-4">
      拥有super角色权限可见
    </ent-button>

    <ent-button v-if="hasPermission(RoleEnum.TEST)" color="success" class="mx-4">
      拥有test角色权限可见
    </ent-button>

    <ent-button v-if="hasPermission([RoleEnum.TEST, RoleEnum.SUPER])" color="error" class="mx-4">
      拥有[test,super]角色权限可见
    </ent-button>

    <Divider>指令方式方式判断权限(该方式不能动态修改权限.)</Divider>
    <ent-button v-auth="RoleEnum.SUPER" type="primary" class="mx-4">
      拥有super角色权限可见
    </ent-button>

    <ent-button v-auth="RoleEnum.TEST" color="success" class="mx-4">
      拥有test角色权限可见
    </ent-button>

    <ent-button v-auth="[RoleEnum.TEST, RoleEnum.SUPER]" color="error" class="mx-4">
      拥有[test,super]角色权限可见
    </ent-button>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Alert, Divider, Space } from 'ant-design-vue';
  import { RoleEnum } from 'fe-ent-core/es/logics/enums';
  import { useUserStore } from 'fe-ent-core/es/store';
  import { usePermission } from 'fe-ent-core/es/hooks';
  import CurrentPermissionMode from '../current-permission-mode.vue';

  export default defineComponent({
    components: { Space, Alert, CurrentPermissionMode, Divider },
    setup() {
      const { changeRole, hasPermission } = usePermission();
      const userStore = useUserStore();

      return {
        userStore,
        RoleEnum,
        isSuper: computed(() => userStore.getRoleList.includes(RoleEnum.SUPER)),
        isTest: computed(() => userStore.getRoleList.includes(RoleEnum.TEST)),
        changeRole,
        hasPermission,
      };
    },
  });
</script>
<style lang="less" scoped>
  .demo {
    background-color: @component-background;
  }
</style>
