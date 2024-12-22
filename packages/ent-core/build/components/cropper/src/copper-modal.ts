
  import { defineComponent, ref } from 'vue';
  import { NAvatar, NSpace, NTooltip, NUpload } from 'naive-ui';
  import { isFunction } from '../../../utils/is';
  import { useDesign } from '../../../hooks/web/use-design';
  import { EntModal, useModalInner } from '../../../components/modal';
  import { Factory } from '../../../logics/factory';
  import { dataURLtoBlob } from '../../../utils/file/base64-convert';
  import { useI18n } from '../../../hooks/web/use-i18n';
  import CropperImage from './cropper';
  import type { PropType } from 'vue';
  import type { CropendResult, Cropper } from './typing';

  type apiFunParams = { file: Blob; name: string; filename: string };

  const props = {
    circled: { type: Boolean, default: true },
    uploadApi: {
      type: Function as PropType<(params: apiFunParams) => Promise<any>>
    }
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
              filename
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
        handleOk
      };
    }
  });
