<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { BackTop } from 'ant-design-vue';

  import { useRootSetting } from '@ent-core/hooks/setting/use-root-setting';
  import { useHeaderSetting } from '@ent-core/hooks/setting/use-header-setting';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useUserStoreWithOut } from '@ent-core/store/modules/user';

  import { SettingButtonPositionEnum } from '@ent-core/enums/app-enum';

  import SessionTimeoutLogin from '@ent-core/views/sys/login/session-timeout-login.vue';
  import LayoutLockPage from '@ent-core/views/sys/lock/index.vue';
  import SettingDrawer from '@ent-core/layouts/default/setting/index.vue';
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

<template>
  <LayoutLockPage />
  <BackTop v-if="getUseOpenBackTop" :target="getTarget" />
  <SettingDrawer v-if="getIsFixedSettingDrawer" :class="prefixCls" />
  <SessionTimeoutLogin v-if="getIsSessionTimeout" />
</template>
