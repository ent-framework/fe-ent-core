<template>
  <command-button
    :command="openLink"
    :enable-tooltip="enableTooltip"
    :tooltip="t('editor.extensions.Link.open.tooltip')"
    :icon="externalLink"
    :button-icon="buttonIcon"
  />
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { Editor } from '@tiptap/vue-3';
  import CommandButton from '../command-button.vue';
  import externalLink from '../../icons/icon-external-link.vue';

  export default defineComponent({
    name: 'OpenLinkCommandButton',

    components: {
      CommandButton
    },

    props: {
      editor: {
        type: Editor,
        required: true
      },

      url: {
        type: String,
        required: true
      },
      buttonIcon: {
        default: '',
        type: String
      }
    },

    setup() {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);

      return { t, enableTooltip, externalLink };
    },

    methods: {
      openLink() {
        if (this.url) {
          // prevent attack
          const newTab = window.open();
          if (newTab) {
            newTab.opener = null;
            newTab.location.href = this.url;
          }
        }
      }
    }
  });
</script>
