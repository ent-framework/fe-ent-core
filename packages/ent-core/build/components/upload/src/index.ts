
  import { computed, defineComponent, ref, unref, watch } from 'vue';
  import { NSpace, NTooltip } from 'naive-ui';
  import { omit } from 'lodash-es';
  import { EntIcon } from '../../../components/icon';
  import { EntButton } from '../../../components/button';
  import { useModal } from '../../../components/modal';
  import { useI18n } from '../../../hooks/web/use-i18n';
  import { isArray } from '../../../utils/is';
  import { uploadContainerProps } from './props';
  import UploadPreviewModal from './upload-preview-modal';
  import UploadModal from './upload-modal';
  import type { Recordable } from '../../../types';
  export default defineComponent({
    name: 'EntUpload',
    components: { UploadModal, UploadPreviewModal, EntIcon, NSpace, NTooltip, EntButton },
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
        { immediate: true }
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
        t
      };
    }
  });
