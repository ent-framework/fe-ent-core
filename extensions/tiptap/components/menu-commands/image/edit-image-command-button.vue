<template>
  <div>
    <command-button
      :command="openEditImageDialog"
      :enable-tooltip="enableTooltip"
      :tooltip="t('editor.extensions.Image.buttons.image_options.tooltip')"
      icon="ellipsis-h"
      :button-icon="buttonIcon"
    />

    <Modal
      v-model="editImageDialogVisible"
      :title="t('editor.extensions.Image.control.edit_image.title')"
      :append-to-body="true"
      width="400px"
      class="ent-tiptap-edit-image-dialog"
      @open="syncImageAttrs"
    >
      <Form :model="imageAttrs" label-position="top" size="small">
        <FormItem :label="t('editor.extensions.Image.control.edit_image.form.src')">
          <Input :value="imageAttrs.src" autocomplete="off" disabled />
        </FormItem>

        <FormItem :label="t('editor.extensions.Image.control.edit_image.form.alt')">
          <Input v-model="imageAttrs.alt" autocomplete="off" />
        </FormItem>

        <FormItem>
          <el-col :span="11">
            <el-form-item :label="t('editor.extensions.Image.control.edit_image.form.width')">
              <el-input v-model="imageAttrs.width" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item :label="t('editor.extensions.Image.control.edit_image.form.height')">
              <el-input v-model="imageAttrs.height" type="number" />
            </el-form-item>
          </el-col>
        </FormItem>
      </Form>

      <template #footer>
        <Button size="small" round @click="closeEditImageDialog">
          {{ t('editor.extensions.Image.control.edit_image.cancel') }}
        </Button>

        <Button type="primary" size="small" round @click="updateImageAttrs">
          {{ t('editor.extensions.Image.control.edit_image.confirm') }}
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { nodeViewProps } from '@tiptap/vue-3';
  import { Button, Form, FormItem, Input, Modal } from 'ant-design-vue';
  import CommandButton from '../command-button.vue';

  export default defineComponent({
    components: {
      Modal,
      Form,
      FormItem,
      Input,
      Button,
      CommandButton,
    },

    props: {
      node: nodeViewProps['node'],
      updateAttrs: nodeViewProps['updateAttributes'],
      buttonIcon: {
        default: '',
        type: String,
      },
    },

    setup() {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);

      return { t, enableTooltip };
    },

    data() {
      return {
        editImageDialogVisible: false,

        imageAttrs: this.getImageAttrs(),
      };
    },

    methods: {
      syncImageAttrs() {
        this.imageAttrs = this.getImageAttrs();
      },

      getImageAttrs() {
        return {
          src: this.node!.attrs.src,
          alt: this.node!.attrs.alt,
          width: this.node!.attrs.width,
          height: this.node!.attrs.height,
        };
      },

      updateImageAttrs() {
        let { width, height } = this.imageAttrs;

        // input converts it to string
        width = Number.parseInt(width as string, 10);
        height = Number.parseInt(height as string, 10);

        this.updateAttrs!({
          alt: this.imageAttrs.alt,
          width: width >= 0 ? width : null,
          height: height >= 0 ? height : null,
        });

        this.closeEditImageDialog();
      },

      openEditImageDialog() {
        this.editImageDialogVisible = true;
      },

      closeEditImageDialog() {
        this.editImageDialogVisible = false;
      },
    },
  });
</script>
