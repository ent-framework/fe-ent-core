<template>
  <NTooltip placement="top">
    <template #trigger>
      <NIcon>
        <FullscreenOutlined v-if="!isFullscreen" @click="toggle" />
        <FullscreenExitOutlined v-else @click="toggle" />
      </NIcon>
    </template>
    {{ t('component.table.settingFullScreen') }}
  </NTooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NIcon, NTooltip } from 'naive-ui';
  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
  import { useFullscreen } from '@vueuse/core';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useTableContext } from '../../hooks/use-table-context';

  export default defineComponent({
    name: 'FullScreenSetting',
    components: {
      FullscreenExitOutlined,
      FullscreenOutlined,
      NTooltip,
      NIcon,
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
