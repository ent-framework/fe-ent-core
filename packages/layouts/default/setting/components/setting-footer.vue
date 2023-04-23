<template>
  <div :class="prefixCls">
    <a-button type="primary" block @click="handleCopy">
      <CopyOutlined class="mr-2" />
      {{ t('layout.setting.copyBtn') }}
    </a-button>

    <a-button color="warning" block @click="handleResetSetting" class="my-3">
      <RedoOutlined class="mr-2" />
      {{ t('common.resetText') }}
    </a-button>

    <a-button color="error" block @click="handleClearAndRedo">
      <RedoOutlined class="mr-2" />
      {{ t('layout.setting.clearBtn') }}
    </a-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';

  import { CopyOutlined, RedoOutlined } from '@ant-design/icons-vue';

  import { useAppStore } from '@ent-core/store/modules/app';
  import { usePermissionStore } from '@ent-core/store/modules/permission';
  import { useMultipleTabStore } from '@ent-core/store/modules/multiple-tab';
  import { useUserStore } from '@ent-core/store/modules/user';

  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useMessage } from '@ent-core/hooks/web/use-message';

  import { updateColorWeak } from '@ent-core/logics/theme/update-color-weak';
  import { updateGrayMode } from '@ent-core/logics/theme/update-gray-mode';
  import defaultSetting from '@ent-core/logics/settings/project-setting';
  import { userBridge } from '@ent-core/logics/bridge';
  export default defineComponent({
    name: 'SettingFooter',
    components: { CopyOutlined, RedoOutlined },
    setup() {
      const permissionStore = usePermissionStore();
      const { prefixCls } = useDesign('setting-footer');
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const tabStore = useMultipleTabStore();
      const userStore = useUserStore();
      const appStore = useAppStore();

      function handleCopy() {
        // const { isSuccessRef } = useCopyToClipboard(
        //   JSON.stringify(unref(appStore.getProjectConfig), null, 2),
        // );
        console.log(JSON.stringify(unref(appStore.getProjectConfig), null, 2));
        // unref(isSuccessRef) &&
        //   createSuccessModal({
        //     title: t('layout.setting.operatingTitle'),
        //     content: t('layout.setting.operatingContent'),
        //   });
      }
      function handleResetSetting() {
        try {
          appStore.setProjectConfig(defaultSetting);
          const { colorWeak, grayMode } = defaultSetting;
          // updateTheme(themeColor);
          updateColorWeak(colorWeak);
          updateGrayMode(grayMode);
          createMessage.success(t('layout.setting.resetSuccess'));
        } catch (error: any) {
          createMessage.error(error);
        }
      }

      function handleClearAndRedo() {
        localStorage.clear();
        appStore.resetAllState();
        permissionStore.resetState();
        tabStore.resetState();
        userStore.resetState();
        location.reload();
      }
      return {
        prefixCls,
        t,
        handleCopy,
        handleResetSetting,
        handleClearAndRedo,
      };
    },
  });
</script>
