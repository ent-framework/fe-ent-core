<template>
  <NTooltip placement="top">
    <template #trigger>
      <EntIcon
        :icon="
          !isFullscreen ? 'ant-design:fullscreen-outlined' : 'ant-design:fullscreen-exit-outlined'
        "
        @click="toggle"
      />
    </template>
    {{ t('component.table.settingFullScreen') }}
  </NTooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NTooltip } from 'naive-ui';
  import { useFullscreen } from '@vueuse/core';
  import { EntIcon } from '@ent-core/components/icon';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useTableContext } from '../../hooks/use-table-context';

  export default defineComponent({
    name: 'FullScreenSetting',
    components: {
      NTooltip,
      EntIcon,
    },

    setup() {
      const table = useTableContext();
      const { t } = useI18n();
      const { toggle, isFullscreen } = useFullscreen(table.wrapRef);

      return {
        toggle,
        isFullscreen,
        t,
      };
    },
  });
</script>
