<template>
  <command-button
    :command="openInsertVideoControl"
    :enable-tooltip="enableTooltip"
    :tooltip="t('editor.extensions.Iframe.tooltip')"
    :readonly="isCodeViewMode"
    :button-icon="buttonIcon"
    :icon="video"
  />
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { Editor } from '@tiptap/vue-3';
  import { message } from 'ant-design-vue';
  import video from '../../icons/video.svg';
  import CommandButton from './command-button.vue';

  export default defineComponent({
    name: 'IframeCommandButton',

    components: {
      CommandButton,
    },

    props: {
      editor: {
        type: Editor,
        required: true,
      },
      buttonIcon: {
        default: '',
        type: String,
      },
    },

    setup(props) {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);
      const isCodeViewMode = inject('isCodeViewMode', false);

      const openInsertVideoControl = async () => {
        const { value: href } = await ElMessageBox.prompt(
          '',
          t('editor.extensions.Iframe.control.title'),
          {
            confirmButtonText: t('editor.extensions.Iframe.control.confirm'),
            cancelButtonText: t('editor.extensions.Iframe.control.cancel'),
            inputPlaceholder: t('editor.extensions.Iframe.control.placeholder'),
            roundButton: true,
          },
        );

        props.editor.commands.setIframe({ src: href });
      };
      return { t, enableTooltip, isCodeViewMode, video, openInsertVideoControl };
    },
  });
</script>
