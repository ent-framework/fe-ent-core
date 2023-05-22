<template>
  <LayoutLockPage />
  <BackTop v-if="getUseOpenBackTop" :target="getTarget" />
  <SettingDrawer v-if="getIsFixedSettingDrawer" :class="prefixCls" />
  <SessionTimeoutLogin v-if="getIsSessionTimeout" />
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { BackTop } from 'ant-design-vue';

  import { useDesign, useHeaderSetting, useRootSetting } from 'fe-ent-core';
  import { useUserStoreWithOut } from 'fe-ent-core';

  import { SettingButtonPositionEnum } from 'fe-ent-core';

  import SessionTimeoutLogin from '../../../views/login/session-timeout-login.vue';
  import LayoutLockPage from '../../../views/lock/index.vue';
  import SettingDrawer from '../setting/index.vue';
  export default defineComponent({
    name: 'LayoutFeatures',
    components: {
      BackTop,
      LayoutLockPage,
      SettingDrawer,
      SessionTimeoutLogin,
    },
    setup() {
      const { getUseOpenBackTop, getShowSettingButton, getSettingButtonPosition, getFullContent } =
        useRootSetting();
      const userStore = useUserStoreWithOut();
      const { prefixCls } = useDesign('setting-drawer-feature');
      const { getShowHeader } = useHeaderSetting();

      const getIsSessionTimeout = computed(() => userStore.getSessionTimeout);

      const getIsFixedSettingDrawer = computed(() => {
        if (!unref(getShowSettingButton)) {
          return false;
        }
        const settingButtonPosition = unref(getSettingButtonPosition);

        if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
          return !unref(getShowHeader) || unref(getFullContent);
        }
        return settingButtonPosition === SettingButtonPositionEnum.FIXED;
      });

      return {
        getTarget: () => document.body,
        getUseOpenBackTop,
        getIsFixedSettingDrawer,
        prefixCls,
        getIsSessionTimeout,
      };
    },
  });
</script>
<style lang="less">
  @setting-drawer-feature-prefix-cls: ~'@{vben-prefix}-setting-drawer-feature';

  .@{setting-drawer-feature-prefix-cls} {
    position: absolute;
    top: 45%;
    right: 0;
    z-index: 10;
    display: flex;
    padding: 10px;
    color: @white;
    cursor: pointer;
    background-color: @primary-color;
    border-radius: 6px 0 0 6px;
    justify-content: center;
    align-items: center;

    svg {
      width: 1em;
      height: 1em;
    }
  }
</style>
