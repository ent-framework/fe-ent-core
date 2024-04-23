<template>
  <div>
    <Popover
      :disabled="isCodeViewMode"
      placement="bottom"
      trigger="click"
      popper-class="ent-tiptap-popper"
    >
      <template v-if="!isCodeViewMode" #content>
        <div class="ent-tiptap-popper__menu">
          <div class="ent-tiptap-popper__menu__item" @click="openUrlPrompt">
            <span>{{ t('editor.extensions.Image.buttons.insert_image.external') }}</span>
          </div>

          <div class="ent-tiptap-popper__menu__item" @click="imageUploadDialogVisible = true">
            <span>{{ t('editor.extensions.Image.buttons.insert_image.upload') }}</span>
          </div>
        </div>
      </template>
      <span>
        <command-button
          :enable-tooltip="enableTooltip"
          :tooltip="t('editor.extensions.Image.buttons.insert_image.tooltip')"
          :readonly="isCodeViewMode"
          :icon="image"
          :button-icon="buttonIcon"
        />
      </span>
    </Popover>

    <Modal
      v-model="imageUploadDialogVisible"
      :title="t('editor.extensions.Image.control.upload_image.title')"
      :append-to-body="true"
    >
      <Upload
        :http-request="uploadImage"
        :show-file-list="false"
        class="ent-tiptap-upload"
        action="#"
        drag
        accept="image/*"
      >
        <div class="ent-tiptap-upload__icon">
          <i class="fa fa-upload" />
        </div>
        <div class="ent-tiptap-upload__text">
          {{ t('editor.extensions.Image.control.upload_image.button') }}
        </div>
      </Upload>
    </Modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { Modal, Popover, Upload } from 'ant-design-vue';
  import { Editor } from '@tiptap/core';
  import CommandButton from '../command-button.vue';
  import { readFileDataUrl } from '../../../utils/shared';
  import image from '../../icons/icon-image.vue';
  import Logger from '../../../utils/logger';

  export default defineComponent({
    name: 'ImageCommandButton',

    components: {
      Modal,
      Upload,
      Popover,
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
      }
    },

    setup() {
      const t = inject('t');
      const enableTooltip = inject('enableTooltip', true);
      const isCodeViewMode = inject('isCodeViewMode', false);

      return { t, enableTooltip, isCodeViewMode, image };
    },

    data() {
      return {
        imageUploadDialogVisible: false,
        uploading: false
      };
    },

    computed: {
      imageNodeOptions() {
        return this.editor.extensionManager.extensions.find((e) => e.name === 'image')!.options;
      }
    },

    methods: {
      openUrlPrompt(): void {
        ElMessageBox.prompt('', this.t('editor.extensions.Image.control.insert_by_url.title'), {
          confirmButtonText: this.t('editor.extensions.Image.control.insert_by_url.confirm'),
          cancelButtonText: this.t('editor.extensions.Image.control.insert_by_url.cancel'),
          inputPlaceholder: this.t('editor.extensions.Image.control.insert_by_url.placeholder'),
          inputPattern: this.imageNodeOptions.urlPattern,
          inputErrorMessage: this.t('editor.extensions.Image.control.insert_by_url.invalid_url'),
          roundButton: true
        })
          .then(({ value: url }) => {
            this.editor.commands.setImage({ src: url });
          })
          .catch((e) => {
            Logger.error(String(e));
          });
      },

      async uploadImage(requestOptions: any) {
        const { file } = requestOptions;

        const uploadRequest = this.imageNodeOptions.uploadRequest;

        const loadingInstance = ElLoading.service({
          target: '.ent-tiptap-upload'
        });
        try {
          const url = await (uploadRequest ? uploadRequest(file) : readFileDataUrl(file));
          this.editor.commands.setImage({ src: url });
          this.imageUploadDialogVisible = false;
        } catch (e) {
          Logger.error(String(e));
        } finally {
          this.$nextTick(() => {
            loadingInstance.close();
          });
        }
      }
    }
  });
</script>
