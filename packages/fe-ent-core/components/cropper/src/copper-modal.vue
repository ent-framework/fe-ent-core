<template>
  <EntModal
    v-bind="$attrs"
    :title="t('component.cropper.modalTitle')"
    width="800px"
    :can-fullscreen="false"
    :ok-text="t('component.cropper.okText')"
    @register="register"
    @ok="handleOk"
  >
    <div :class="prefixCls">
      <div :class="`${prefixCls}-container`">
        <div :class="`${prefixCls}-left`">
          <div :class="`${prefixCls}-cropper`">
            <CropperImage
              v-if="src"
              :src="src"
              height="300px"
              :circled="circled"
              @cropend="handleCropend"
              @ready="handleReady"
            />
          </div>
        </div>
        <div :class="`${prefixCls}-right`">
          <div :class="`${prefixCls}-preview`">
            <img v-if="previewSource" :src="previewSource" :alt="t('component.cropper.preview')" />
          </div>
          <template v-if="previewSource">
            <div :class="`${prefixCls}-group`">
              <NAvatar :src="previewSource" size="large" />
              <NAvatar :src="previewSource" :size="48" />
              <NAvatar :src="previewSource" :size="64" />
              <NAvatar :src="previewSource" :size="80" />
            </div>
          </template>
        </div>
      </div>
      <div :class="`${prefixCls}-toolbar`">
        <NSpace :size="[4, 4]" justify="start">
          <NUpload :file-list="[]" accept="image/*" @before-upload="handleBeforeUpload">
            <NTooltip placement="bottom">
              <template #trigger>
                <ent-button size="small" pre-icon="ant-design:upload-outlined" type="primary" />
              </template>
              <span>{{ t('component.cropper.selectImage') }}</span>
            </NTooltip>
          </NUpload>
          <NTooltip placement="bottom">
            <template #trigger>
              <ent-button
                type="primary"
                pre-icon="ant-design:reload-outlined"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('reset')"
              />
            </template>
            <span>{{ t('component.cropper.btn_reset') }}</span>
          </NTooltip>
          <NTooltip placement="bottom">
            <template #trigger>
              <ent-button
                type="primary"
                pre-icon="ant-design:rotate-left-outlined"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('rotate', -45)"
              />
            </template>
            <span>{{ t('component.cropper.btn_rotate_left') }}</span>
          </NTooltip>
          <NTooltip placement="bottom">
            <template #trigger>
              <ent-button
                type="primary"
                pre-icon="ant-design:rotate-right-outlined"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('rotate', 45)"
              />
            </template>
            <span>{{ t('component.cropper.btn_rotate_right') }}</span>
          </NTooltip>
          <NTooltip placement="bottom">
            <template #trigger>
              <ent-button
                type="primary"
                pre-icon="vaadin:arrows-long-h"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('scaleX')"
              />
            </template>
            <span>{{ t('component.cropper.btn_scale_x') }}</span>
          </NTooltip>
          <NTooltip placement="bottom">
            <template #trigger>
              <ent-button
                type="primary"
                pre-icon="vaadin:arrows-long-v"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('scaleY')"
              />
            </template>
            <span>{{ t('component.cropper.btn_scale_y') }}</span>
          </NTooltip>
          <NTooltip placement="bottom">
            <template #trigger>
              <ent-button
                type="primary"
                pre-icon="ant-design:zoom-in-outlined"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('zoom', 0.1)"
              />
            </template>
            <span>{{ t('component.cropper.btn_zoom_in') }}</span>
          </NTooltip>
          <NTooltip placement="bottom">
            <template #trigger>
              <ent-button
                type="primary"
                pre-icon="ant-design:zoom-out-outlined"
                size="small"
                :disabled="!src"
                @click="handlerToolbar('zoom', -0.1)"
              />
            </template>
            <span>{{ t('component.cropper.btn_zoom_out') }}</span>
          </NTooltip>
        </NSpace>
      </div>
    </div>
  </EntModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { NAvatar, NSpace, NTooltip, NUpload } from 'naive-ui';
  import { isFunction } from '@ent-core/utils/is';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { EntModal, useModalInner } from '@ent-core/components/modal';
  import { Factory } from '@ent-core/logics/factory';
  import { dataURLtoBlob } from '@ent-core/utils/file/base64-convert';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import CropperImage from './cropper.vue';
  import type { PropType } from 'vue';
  import type { CropendResult, Cropper } from './typing';

  type apiFunParams = { file: Blob; name: string; filename: string };

  const props = {
    circled: { type: Boolean, default: true },
    uploadApi: {
      type: Function as PropType<(params: apiFunParams) => Promise<any>>,
    },
  };

  export default defineComponent({
    name: 'CropperModal',
    components: { EntModal, NSpace, CropperImage, NUpload, NAvatar, NTooltip },
    props,
    emits: ['uploadSuccess', 'register'],
    setup(props, { emit }) {
      let filename = '';
      const src = ref('');
      const previewSource = ref('');
      const cropper = ref<Cropper>();
      let scaleX = 1;
      let scaleY = 1;

      const { prefixCls } = useDesign('cropper-am');
      const [register, { closeModal, setModalProps }] = useModalInner();
      const { t } = useI18n();

      // Block upload
      function handleBeforeUpload(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        src.value = '';
        previewSource.value = '';
        reader.onload = function (e) {
          src.value = (e.target?.result as string) ?? '';
          filename = file.name;
        };
        return false;
      }

      function handleCropend({ imgBase64 }: CropendResult) {
        previewSource.value = imgBase64;
      }

      function handleReady(cropperInstance: Cropper) {
        cropper.value = cropperInstance;
      }

      function handlerToolbar(event: string, arg?: number) {
        if (event === 'scaleX') {
          scaleX = arg = scaleX === -1 ? 1 : -1;
        }
        if (event === 'scaleY') {
          scaleY = arg = scaleY === -1 ? 1 : -1;
        }
        cropper?.value?.[event]?.(arg);
      }

      async function handleOk() {
        const uploadApi = props.uploadApi;
        try {
          const blob = dataURLtoBlob(previewSource.value);
          setModalProps({ confirmLoading: true });
          let result;
          if (uploadApi && isFunction(uploadApi)) {
            result = await uploadApi({ name: 'file', file: blob, filename });
          } else {
            result = await Factory.getHttpFactory().uploadApi({
              name: 'file',
              file: blob,
              filename,
            });
          }
          emit('uploadSuccess', { source: previewSource.value, data: result.data });
          closeModal();
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        t,
        prefixCls,
        src,
        register,
        previewSource,
        handleBeforeUpload,
        handleCropend,
        handleReady,
        handlerToolbar,
        handleOk,
      };
    },
  });
</script>
