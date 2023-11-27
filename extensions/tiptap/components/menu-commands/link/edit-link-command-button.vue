<template>
  <div>
    <command-button
      :command="openEditLinkDialog"
      :enable-tooltip="enableTooltip"
      :tooltip="t('editor.extensions.Link.edit.tooltip')"
      :icon="edit"
      :button-icon="buttonIcon"
    />

    <Modal
      v-model="editLinkDialogVisible"
      :title="t('editor.extensions.Link.edit.control.title')"
      :append-to-body="true"
      width="400px"
      class="ent-tiptap-edit-link-dialog"
    >
      <Form :model="linkAttrs" label-position="right" size="small">
        <FormItem :label="t('editor.extensions.Link.edit.control.href')" prop="href">
          <Input v-model="linkAttrs.href" autocomplete="off" :placeholder="placeholder" />
        </FormItem>

        <FormItem prop="openInNewTab">
          <Checkbox v-model="linkAttrs.openInNewTab">
            {{ t('editor.extensions.Link.edit.control.open_in_new_tab') }}
          </Checkbox>
        </FormItem>
      </Form>

      <template #footer>
        <Button size="small" round @click="closeEditLinkDialog">
          {{ t('editor.extensions.Link.edit.control.cancel') }}
        </Button>

        <Button type="primary" size="small" round @mousedown.prevent @click="updateLinkAttrs">
          {{ t('editor.extensions.Link.edit.control.confirm') }}
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { Editor } from '@tiptap/vue-3';
  import { Button, Checkbox, Form, FormItem, Input, Modal } from 'ant-design-vue';
  import edit from '../../../icons/edit.svg';
  import CommandButton from '../command-button.vue';

  export default defineComponent({
    name: 'EditLinkCommandButton',

    components: {
      Modal,
      Form,
      FormItem,
      Input,
      Checkbox,
      Button,
      CommandButton,
    },

    props: {
      editor: {
        type: Editor,
        required: true,
      },

      initLinkAttrs: {
        type: Object,
        required: true,
      },
      buttonIcon: {
        default: '',
        type: String,
      },
    },

    setup() {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);

      return { t, enableTooltip, edit };
    },

    data() {
      return {
        linkAttrs: this.initLinkAttrs,
        editLinkDialogVisible: false,
      };
    },
    computed: {
      placeholder() {
        return this.editor.extensionManager.extensions.find((item) => item.name === 'link')?.options
          ?.editLinkPlaceholder;
      },
    },
    methods: {
      updateLinkAttrs() {
        this.editor.commands.setLink(this.linkAttrs);

        this.closeEditLinkDialog();
      },

      openEditLinkDialog() {
        this.editLinkDialogVisible = true;
      },

      closeEditLinkDialog() {
        this.editLinkDialogVisible = false;
      },
    },
  });
</script>
