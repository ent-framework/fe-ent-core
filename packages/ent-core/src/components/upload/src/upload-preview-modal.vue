<template>
  <EntModal
    width="800px"
    :title="t('component.upload.preview')"
    wrap-class-name="upload-preview-modal"
    v-bind="$attrs"
    :show-ok-btn="false"
    @register="register"
  >
    <FileList :data-source="fileListRef" :columns="columns" :action-column="actionColumn" />
  </EntModal>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  //   import { BasicTable, useTable } from '../../../components/Table';
  import { EntModal, useModalInner } from '../../../components/modal';
  import { downloadByUrl } from '../../../utils/file/download';
  import { useI18n } from '../../../hooks/web/use-i18n';
  import { isArray } from '../../../utils/is';
  import FileList from './file-list.vue';
  import { previewProps } from './props';
  import { createPreviewActionColumn, createPreviewColumns } from './data';
  import type { PreviewFileItem } from './typing';

  export default defineComponent({
    components: { EntModal, FileList },
    props: previewProps,
    emits: ['list-change', 'register', 'delete'],
    setup(props, { emit }) {
      const [register, { closeModal }] = useModalInner();
      const { t } = useI18n();

      const fileListRef = ref<PreviewFileItem[]>([]);
      watch(
        () => props.value,
        (value) => {
          if (!isArray(value)) value = [];
          fileListRef.value = value
            .filter((item) => !!item)
            .map((item) => {
              return {
                url: item,
                type: item.split('.').pop() || '',
                name: item.split('/').pop() || ''
              };
            });
        },
        { immediate: true }
      );

      // 删除
      function handleRemove(record: PreviewFileItem) {
        const index = fileListRef.value.findIndex((item) => item.url === record.url);
        if (index !== -1) {
          const removed = fileListRef.value.splice(index, 1);
          emit('delete', removed[0].url);
          emit(
            'list-change',
            fileListRef.value.map((item) => item.url)
          );
        }
      }

      // // 预览
      // function handlePreview(record: PreviewFileItem) {
      //   const { url = '' } = record;
      //   createImgPreview({
      //     imageList: [url],
      //   });
      // }

      // 下载
      function handleDownload(record: PreviewFileItem) {
        const { url = '' } = record;
        downloadByUrl({ url });
      }

      return {
        t,
        register,
        closeModal,
        fileListRef,
        columns: createPreviewColumns() as any[],
        actionColumn: createPreviewActionColumn({ handleRemove, handleDownload }) as any
      };
    }
  });
</script>
