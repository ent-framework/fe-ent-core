<template>
  <LayoutLockPage />
  <NBackTop v-if="getUseOpenBackTop" :listen-to="getTarget" :right="100" />
  <SettingDrawer v-if="getIsFixedSettingDrawer" :class="prefixCls" />
  <SessionTimeoutLogin v-if="getIsSessionTimeout" />
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { NBackTop } from 'naive-ui';

  import { useDesign } from 'fe-ent-core/es/hooks';
  import { SettingButtonPositionEnum } from 'fe-ent-core/es/logics';
  import { useUserStore } from 'fe-ent-core/es/store';
  import { useHeaderSetting, useLayoutThemeSetting } from '../../../../hooks';

  import SessionTimeoutLogin from '../../../views/login/session-timeout-login.vue';
  import LayoutLockPage from '../../../views/lock/index.vue';
  import SettingDrawer from '../setting/index.vue';
  export default defineComponent({
    name: 'LayoutFeatures',
    components: {
      NBackTop,
      LayoutLockPage,
      SettingDrawer,
      SessionTimeoutLogin
    },
    setup() {
      const { getUseOpenBackTop, getShowSettingButton, getSettingButtonPosition, getFullContent } =
        useLayoutThemeSetting();
      const userStore = useUserStore();
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
        getIsSessionTimeout
      };
    }
  });
</script>
