<template>
  <div :class="getClass" :style="getStyle">
    <div :class="`${prefixCls}-image-wrapper`" :style="getImageWrapperStyle" @click="openModal">
      <div :class="`${prefixCls}-image-mask`" :style="getImageWrapperStyle">
        <Icon
          icon="ant-design:cloud-upload-outlined"
          :size="getIconWidth"
          :style="getImageWrapperStyle"
          color="#d6d6d6"
        />
      </div>
      <img v-if="sourceValue" :src="sourceValue" alt="avatar" />
    </div>
    <a-button
      v-if="showBtn"
      :class="`${prefixCls}-upload-btn`"
      v-bind="btnProps"
      @click="openModal"
    >
      {{ btnText ? btnText : t('component.cropper.selectImage') }}
    </a-button>

    <CopperModal
      :upload-api="uploadApi"
      :src="sourceValue"
      @register="register"
      @upload-success="handleUploadSuccess"
    />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref, watch, watchEffect } from 'vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useModal } from '@ent-core/components/modal';
  import { useMessage } from '@ent-core/hooks/web/use-message';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import Icon from '@ent-core/components/icon';
  import CopperModal from './copper-modal.vue';
  import type { ButtonProps } from '@ent-core/components/button';
  import type { CSSProperties, PropType } from 'vue';

  const props = {
    width: { type: [String, Number], default: '200px' },
    value: { type: String },
    showBtn: { type: Boolean, default: true },
    btnProps: { type: Object as PropType<ButtonProps> },
    btnText: { type: String, default: '' },
    uploadApi: { type: Function as PropType<({ file: Blob, name: string }) => Promise<void>> },
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
        () => `${Number.parseInt(`${props.width}`.replace(/px/, '')) / 2}px`,
      );

      const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }));

      const getImageWrapperStyle = computed(
        (): CSSProperties => ({ width: unref(getWidth), height: unref(getWidth) }),
      );

      watchEffect(() => {
        sourceValue.value = props.value || '';
      });

      watch(
        () => sourceValue.value,
        (v: string) => {
          emit('update:value', v);
        },
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
        handleUploadSuccess,
      };
    },
  });
</script>
