<template>
  <div>
    <command-button
      :command="() => toggleFullscreen(!isFullscreen)"
      :enable-tooltip="enableTooltip"
      :tooltip="buttonTooltip"
      :button-icon="buttonIcon"
      :icon="getIcon"
      :is-active="isFullscreen"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import compress from '../icons/icon-compress.vue';
  import expand from '../icons/icon-expand.vue';
  import CommandButton from './command-button.vue';

  export default defineComponent({
    name: 'FullscreenCommandButton',

    components: {
      CommandButton
    },
    props: {
      buttonIcon: {
        default: '',
        type: String
      }
    },
    setup() {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);
      const isFullscreen = inject('isFullscreen', false);
      const toggleFullscreen = inject('toggleFullscreen');

      return { t, enableTooltip, isFullscreen, toggleFullscreen };
    },

    computed: {
      buttonTooltip() {
        return this.isFullscreen
          ? this.t('editor.extensions.Fullscreen.tooltip.exit_fullscreen')
          : this.t('editor.extensions.Fullscreen.tooltip.fullscreen');
      },
      getIcon() {
        return this.isFullscreen ? compress : expand;
      }
    }
  });
</script>
