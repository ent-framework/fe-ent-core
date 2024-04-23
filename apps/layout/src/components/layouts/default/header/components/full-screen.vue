<template>
  <div :class="prefixCls">
    <NTooltip :title="getTitle" placement="bottom">
      <template #trigger>
        <EntIcon v-if="!isFullscreen" icon="ant-design:fullscreen-outlined" @click="toggle" />
        <EntIcon v-else icon="ant-design:fullscreen-exit-outlined" @click="toggle" />
      </template>
      {{ getTitle }}
    </NTooltip>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { NTooltip } from 'naive-ui';
  import { useDesign, useI18n } from 'fe-ent-core/es/hooks';
  import { useFullscreen } from '@vueuse/core';
  import { EntIcon } from 'fe-ent-core';

  export default defineComponent({
    name: 'FullScreen',
    components: { EntIcon, NTooltip },
    setup() {
      const { t } = useI18n();
      const { toggle, isFullscreen } = useFullscreen();
      const { prefixCls } = useDesign('header-fullscreen');
      const getTitle = computed(() => {
        return unref(isFullscreen)
          ? t('layout.header.tooltipExitFull')
          : t('layout.header.tooltipEntryFull');
      });

      return {
        prefixCls,
        getTitle,
        isFullscreen,
        toggle
      };
    }
  });
</script>
