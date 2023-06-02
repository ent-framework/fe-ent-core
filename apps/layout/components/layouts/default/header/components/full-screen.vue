<template>
  <Tooltip :title="getTitle" placement="bottom" :mouse-enter-delay="0.5">
    <span @click="toggle">
      <EntIcon
        v-if="!isFullscreen"
        icon="ant-design:fullscreen-outlined"
        width="1em"
        height="1em"
      />
      <EntIcon v-else icon="ant-design:fullscreen-exit-outlined" width="1em" height="1em" />
    </span>
  </Tooltip>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { useI18n } from 'fe-ent-core/es/hooks';
  import { useFullscreen } from '@vueuse/core';
  import { EntIcon } from 'fe-ent-core';

  export default defineComponent({
    name: 'FullScreen',
    components: { EntIcon, Tooltip },

    setup() {
      const { t } = useI18n();
      const { toggle, isFullscreen } = useFullscreen();

      const getTitle = computed(() => {
        return unref(isFullscreen)
          ? t('layout.header.tooltipExitFull')
          : t('layout.header.tooltipEntryFull');
      });

      return {
        getTitle,
        isFullscreen,
        toggle,
      };
    },
  });
</script>
