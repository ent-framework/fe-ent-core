<template>
  <div>
    <Space>
      <ent-button type="primary" pre-icon="carbon:cloud-upload" @click="openUploadModal">
        {{ t('component.upload.upload') }}
      </ent-button>
      <Tooltip v-if="showPreview" placement="bottom">
        <template #title>
          {{ t('component.upload.uploaded') }}
          <template v-if="fileList.length">
            {{ fileList.length }}
          </template>
        </template>
        <ent-button @click="openPreviewModal">
          <EntIcon icon="bi:eye" />
          <template v-if="fileList.length && showPreviewNumber">
            {{ fileList.length }}
          </template>
        </ent-button>
      </Tooltip>
    </Space>

    <UploadModal
      v-bind="bindValue"
      :preview-file-list="fileList"
      @register="registerUploadModal"
      @change="handleChange"
      @delete="handleDelete"
    />

    <UploadPreviewModal
      :value="fileList"
      @register="registerPreviewModal"
      @list-change="handlePreviewChange"
      @delete="handlePreviewDelete"
    />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref, watch } from 'vue';
  import { Space, Tooltip } from 'ant-design-vue';
  import { omit } from 'lodash-es';
  import { EntIcon } from '@ent-core/components/icon';
  import { useModal } from '@ent-core/components/modal';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { isArray } from '@ent-core/utils/is';
  import { uploadContainerProps } from './props';
  import UploadPreviewModal from './upload-preview-modal.vue';
  import UploadModal from './upload-modal.vue';
  import type { Recordable } from '@ent-core/types';
  export default defineComponent({
    name: 'EntUpload',
    components: { UploadModal, UploadPreviewModal, EntIcon, Tooltip, Space },
    props: uploadContainerProps,
    emits: ['change', 'delete', 'preview-delete', 'update:value'],

    setup(props, { emit, attrs }) {
      const { t } = useI18n();
      // 上传modal
      const [registerUploadModal, { openModal: openUploadModal }] = useModal();

      //   预览modal
      const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();

      const fileList = ref<string[]>([]);

      const showPreview = computed(() => {
        const { emptyHidePreview } = props;
        if (!emptyHidePreview) return true;
        return emptyHidePreview ? fileList.value.length > 0 : true;
      });

      const bindValue = computed(() => {
        const value = { ...attrs, ...props };
        return omit(value, 'onChange');
      });

      watch(
        () => props.value,
        (value = []) => {
          fileList.value = isArray(value) ? value : [];
        },
        { immediate: true },
      );

      // 上传modal保存操作
      function handleChange(urls: string[]) {
        fileList.value = [...unref(fileList), ...(urls || [])];
        emit('update:value', fileList.value);
        emit('change', fileList.value);
      }

      // 预览modal保存操作
      function handlePreviewChange(urls: string[]) {
        fileList.value = [...(urls || [])];
        emit('update:value', fileList.value);
        emit('change', fileList.value);
      }

      function handleDelete(record: Recordable) {
        emit('delete', record);
      }

      function handlePreviewDelete(url: string) {
        emit('preview-delete', url);
      }

      return {
        registerUploadModal,
        openUploadModal,
        handleChange,
        handlePreviewChange,
        registerPreviewModal,
        openPreviewModal,
        fileList,
        showPreview,
        bindValue,
        handleDelete,
        handlePreviewDelete,
        t,
      };
    },
  });
</script>
