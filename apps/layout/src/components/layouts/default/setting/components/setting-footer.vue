<template>
  <div :class="prefixCls">
    <ent-button type="primary" block @click="handleCopy">
      <EntIcon icon="ant-design:copy-outlined" class="mr-2" />
      {{ t('layout.setting.copyBtn') }}
    </ent-button>

    <ent-button color="warning" block class="my-3" @click="handleResetSetting">
      <EntIcon icon="ant-design:redo-outlined" class="mr-2" />
      {{ t('common.resetText') }}
    </ent-button>

    <ent-button color="error" block @click="handleClearAndRedo">
      <EntIcon icon="ant-design:redo-outlined" class="mr-2" />
      {{ t('layout.setting.clearBtn') }}
    </ent-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { defaultProjectSetting } from 'fe-ent-core/es/logics';
  import { EntIcon } from 'fe-ent-core';
  import { useAppStore, usePermissionStore, useUserStore } from 'fe-ent-core/es/store';
  import { useDesign, useI18n, useMessage } from 'fe-ent-core/es/hooks';
  import { useMultipleTabStore } from '../../../../../store/multiple-tab';

  export default defineComponent({
    name: 'SettingFooter',
    components: { EntIcon },
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
        handleClearAndRedo
      };
    }
  });
</script>
