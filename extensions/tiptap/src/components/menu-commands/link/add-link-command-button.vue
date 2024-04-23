<template>
  <div>
    <command-button
      :is-active="editor.isActive('link')"
      :readonly="isCodeViewMode"
      :command="openAddLinkDialog"
      :enable-tooltip="enableTooltip"
      :tooltip="t('editor.extensions.Link.add.tooltip')"
      :icon="link"
      :button-icon="buttonIcon"
    />

    <Modal
      v-model:open="addLinkDialogVisible"
      :title="t('editor.extensions.Link.add.control.title')"
      :append-to-body="true"
      width="400px"
      class="ent-tiptap-edit-link-dialog"
    >
      <Form :model="linkAttrs" label-position="right" size="small">
        <FormItem :label="t('editor.extensions.Link.add.control.href')" name="href">
          <Input v-model:value="linkAttrs.href" autocomplete="off" :placeholder="placeholder" />
        </FormItem>

        <FormItem name="openInNewTab">
          <Checkbox v-model:checked="linkAttrs.openInNewTab">
            {{ t('editor.extensions.Link.add.control.open_in_new_tab') }}
          </Checkbox>
        </FormItem>
      </Form>

      <template #footer>
        <a-button size="small" round @click="closeAddLinkDialog">
          {{ t('editor.extensions.Link.add.control.cancel') }}
        </a-button>

        <a-button type="primary" size="small" round @mousedown.prevent @click="addLink">
          {{ t('editor.extensions.Link.add.control.confirm') }}
        </a-button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { Button, Checkbox, Form, FormItem, Input, Modal } from 'ant-design-vue';
  import { Editor } from '@tiptap/core';
  import CommandButton from '../command-button.vue';
  import link from '../../icons/icon-link.vue';

  const AButton = Button;

  export default defineComponent({
    name: 'AddLinkCommandButton',

    components: {
      Modal,
      Form,
      FormItem,
      Input,
      Checkbox,
      AButton,
      CommandButton
    },

    props: {
      editor: {
        type: Editor,
        required: true
      },
      buttonIcon: {
        default: '',
        type: String
      },
      placeholder: {
        default: '',
        type: String
      }
    },

    setup() {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);
      const isCodeViewMode = inject('isCodeViewMode', true);

      return { t, enableTooltip, isCodeViewMode, link };
    },

    data() {
      return {
        linkAttrs: {
          href: '',
          openInNewTab: true
        },
        addLinkDialogVisible: false
      };
    },

    watch: {
      addLinkDialogVisible() {
        this.linkAttrs = { href: '', openInNewTab: true };
      }
    },

    methods: {
      openAddLinkDialog() {
        this.addLinkDialogVisible = true;
      },

      closeAddLinkDialog() {
        this.addLinkDialogVisible = false;
      },

      addLink() {
        if (this.linkAttrs.openInNewTab) {
          this.editor.commands.setLink({
            href: this.linkAttrs.href,
            target: '_blank'
          });
        } else {
          this.editor.commands.setLink({ href: this.linkAttrs.href });
        }

        this.closeAddLinkDialog();
      }
    }
  });
</script>
