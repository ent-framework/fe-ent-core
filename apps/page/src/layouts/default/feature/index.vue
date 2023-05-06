<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { BackTop } from 'ant-design-vue';

  import { useRootSetting } from 'fe-ent-core/lib/hooks';
  import { useHeaderSetting } from 'fe-ent-core/lib/hooks';
  import { useDesign } from 'fe-ent-core/lib/hooks';
  import { useUserStoreWithOut } from 'fe-ent-core/lib/store';

  import { SettingButtonPositionEnum } from 'fe-ent-core/lib/logics';

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

<template>
  <LayoutLockPage />
  <BackTop v-if="getUseOpenBackTop" :target="getTarget" />
  <SettingDrawer v-if="getIsFixedSettingDrawer" :class="prefixCls" />
  <SessionTimeoutLogin v-if="getIsSessionTimeout" />
</template>
