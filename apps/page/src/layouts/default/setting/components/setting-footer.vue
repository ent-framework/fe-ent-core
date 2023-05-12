<template>
  <div :class="prefixCls">
    <a-button type="primary" block @click="handleCopy">
      <CopyOutlined class="mr-2" />
      {{ t('layout.setting.copyBtn') }}
    </a-button>

    <a-button color="warning" block class="my-3" @click="handleResetSetting">
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
  import { defineComponent } from 'vue';
  import { CopyOutlined, RedoOutlined } from '@ant-design/icons-vue';
  import {
    useAppStore,
    useMultipleTabStore,
    usePermissionStore,
    useUserStore,
  } from 'fe-ent-core/lib/store';

  import { useDesign, useI18n, useMessage } from 'fe-ent-core/lib/hooks';

  import { defaultProjectSetting, updateColorWeak, updateGrayMode } from 'fe-ent-core/lib/logics';
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
        // console.log(JSON.stringify(unref(appStore.getProjectConfig), null, 2));
        // unref(isSuccessRef) &&
        //   createSuccessModal({
        //     title: t('layout.setting.operatingTitle'),
        //     content: t('layout.setting.operatingContent'),
        //   });
      }
      function handleResetSetting() {
        try {
          appStore.setProjectConfig(defaultProjectSetting);
          const { colorWeak, grayMode } = defaultProjectSetting;
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
