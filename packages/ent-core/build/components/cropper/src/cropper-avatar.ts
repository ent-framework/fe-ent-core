
  import { computed, defineComponent, ref, unref, watch, watchEffect } from 'vue';
  import { useDesign } from '../../../hooks/web/use-design';
  import { useModal } from '../../../components/modal';
  import { useMessage } from '../../../hooks/web/use-message';
  import { useI18n } from '../../../hooks/web/use-i18n';
  import Icon from '../../../components/icon';
  import CopperModal from './copper-modal';
  import type { ButtonProps } from '../../../components/button/interface';
  import type { CSSProperties, PropType } from 'vue';

  type apiFunParams = { file: Blob; name: string; filename: string };

  const props = {
    /**
     * 图片宽
     */
    width: { type: [String, Number], default: '200px' },
    /**
     * 当前头像地址(v-model)
     */
    value: { type: String },
    /**
     * 是否显示按钮
     */
    showBtn: { type: Boolean, default: true },
    /**
     * 按钮的其它属性
     */
    btnProps: { type: Object as PropType<ButtonProps> },
    /**
     * 按钮显示文本
     */
    btnText: { type: String, default: '' },
    /**
     * 图片上传接口
     */
    uploadApi: { type: Function as PropType<(params: apiFunParams) => Promise<void>> }
  };

  export default defineComponent({
    name: 'EntCropperAvatar',
    components: { CopperModal, Icon },
    props,
    emits: ['update:value', 'change'],
    setup(props, { emit, expose }) {
      const sourceValue = ref(props.value || '');
      const { prefixCls } = useDesign('cropper-avatar');
      const [register, { openModal, closeModal }] = useModal();
      const { createMessage } = useMessage();
      const { t } = useI18n();

      const getClass = computed(() => [prefixCls]);

      const getWidth = computed(() => `${`${props.width}`.replace(/px/, '')}px`);

      const getIconWidth = computed(
        () => `${Number.parseInt(`${props.width}`.replace(/px/, '')) / 2}px`
      );

      const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }));

      const getImageWrapperStyle = computed(
        (): CSSProperties => ({ width: unref(getWidth), height: unref(getWidth) })
      );

      watchEffect(() => {
        sourceValue.value = props.value || '';
      });

      watch(
        () => sourceValue.value,
        (v: string) => {
          emit('update:value', v);
        }
      );

      function handleUploadSuccess({ source }) {
        sourceValue.value = source;
        emit('change', source);
        createMessage.success(t('component.cropper.uploadSuccess'));
      }

      expose({ openModal: openModal.bind(null, true), closeModal });

      return {
        t,
        prefixCls,
        register,
        openModal: openModal as any,
        getIconWidth,
        sourceValue,
        getClass,
        getImageWrapperStyle,
        getStyle,
        handleUploadSuccess
      };
    }
  });
