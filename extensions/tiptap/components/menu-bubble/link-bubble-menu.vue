<template>
  <div class="link-bubble-menu">
    <slot name="prepend" />

    <open-link-command-button :url="linkAttrs.href" :editor="editor" />
    <edit-link-command-button :editor="editor" :init-link-attrs="linkAttrs" />
    <unlink-command-button :editor="editor" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Editor } from '@tiptap/vue-3';
  import OpenLinkCommandButton from '../menu-commands/link/open-link-command-button.vue';
  import EditLinkCommandButton from '../menu-commands/link/edit-link-command-button.vue';
  import UnlinkCommandButton from '../menu-commands/link/unlink-command-button.vue';

  export default defineComponent({
    name: 'LinkBubbleMenu',

    components: {
      OpenLinkCommandButton,
      EditLinkCommandButton,
      UnlinkCommandButton,
    },

    props: {
      editor: {
        type: Editor,
        required: true,
      },
    },
    computed: {
      linkAttrs() {
        return this.editor.getAttributes('link');
      },
    },
  });
</script>

<style lang="scss">
  .link-bubble-menu {
    display: flex;
  }
</style>
