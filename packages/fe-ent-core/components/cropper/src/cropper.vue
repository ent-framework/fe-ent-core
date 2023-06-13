<template>
  <div :class="getClass" :style="getWrapperStyle">
    <img
      v-show="isReady"
      ref="imgElRef"
      :src="src"
      :alt="alt"
      :crossorigin="crossorigin"
      :style="getImageStyle"
    />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, onMounted, onUnmounted, ref, unref } from 'vue';
  import Cropper from 'cropperjs';
  import { useDebounceFn } from '@vueuse/shared';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import type { CSSProperties, PropType } from 'vue';
  import type { ElRef, Nullable } from '@ent-core/types';

  type Options = Cropper.Options;

  const defaultOptions: Options = {
    aspectRatio: 1,
    zoomable: true,
    zoomOnTouch: true,
    zoomOnWheel: true,
    cropBoxMovable: true,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: true,
    autoCrop: true,
    background: true,
    highlight: true,
    center: true,
    responsive: true,
    restore: true,
    checkCrossOrigin: true,
    checkOrientation: true,
    scalable: true,
    modal: true,
    guides: true,
    movable: true,
    rotatable: true,
  };

  const props = {
    /**
     * 图片源
     */
    src: { type: String, required: true },
    /**
     * 图片 alt
     */
    alt: { type: String },
    /**
     * 圆形裁剪框
     */
    circled: { type: Boolean, default: false },
    /**
     * 实时触发预览
     */
    realTimePreview: { type: Boolean, default: true },
    /**
     * 高度
     */
    height: { type: [String, Number], default: '360px' },
    /**
     * crossorigin
     */
    crossorigin: {
      type: String as PropType<'' | 'anonymous' | 'use-credentials' | undefined>,
      default: undefined,
    },
    /**
     * 图片样式
     */
    imageStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
    /**
     * corpperjs 配置项
     */
    options: { type: Object as PropType<Options>, default: () => ({}) },
  };

  export default defineComponent({
    name: 'EntCropperImage',
    props,
    emits: ['cropend', 'ready', 'cropendError'],
    setup(props, { attrs, emit }) {
      const imgElRef = ref<ElRef<HTMLImageElement>>();
      const cropper = ref<Nullable<Cropper>>();
      const isReady = ref(false);

      const { prefixCls } = useDesign('cropper-image');
      const debounceRealTimeCroppered = useDebounceFn(realTimeCroppered, 80);

      const getImageStyle = computed((): CSSProperties => {
        return {
          height: props.height,
          maxWidth: '100%',
          ...props.imageStyle,
        };
      });

      const getClass = computed(() => {
        return [
          prefixCls,
          attrs.class,
          {
            [`${prefixCls}--circled`]: props.circled,
          },
        ];
      });

      const getWrapperStyle = computed((): CSSProperties => {
        return { height: `${`${props.height}`.replace(/px/, '')}px` };
      });

      onMounted(init);

      onUnmounted(() => {
        cropper.value?.destroy();
      });

      async function init() {
        const imgEl = unref(imgElRef);
        if (!imgEl) {
          return;
        }
        cropper.value = new Cropper(imgEl, {
          ...defaultOptions,
          ready: () => {
            isReady.value = true;
            realTimeCroppered();
            emit('ready', cropper.value);
          },
          crop() {
            debounceRealTimeCroppered();
          },
          zoom() {
            debounceRealTimeCroppered();
          },
          cropmove() {
            debounceRealTimeCroppered();
          },
          ...props.options,
        });
      }

      // Real-time display preview
      function realTimeCroppered() {
        props.realTimePreview && croppered();
      }

      // event: return base64 and width and height information after cropping
      function croppered() {
        if (!cropper.value) {
          return;
        }
        const imgInfo = cropper.value.getData();
        const canvas = props.circled ? getRoundedCanvas() : cropper.value.getCroppedCanvas();
        canvas.toBlob((blob) => {
          if (!blob) {
            return;
          }
          const fileReader: FileReader = new FileReader();
          fileReader.readAsDataURL(blob);
          fileReader.onloadend = (e) => {
            emit('cropend', {
              imgBase64: e.target?.result ?? '',
              imgInfo,
            });
          };
          fileReader.onerror = () => {
            emit('cropendError');
          };
        }, 'image/png');
      }

      // Get a circular picture canvas
      function getRoundedCanvas() {
        const sourceCanvas = cropper.value!.getCroppedCanvas();
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        const width = sourceCanvas.width;
        const height = sourceCanvas.height;
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();
        return canvas;
      }

      return { getClass, imgElRef, getWrapperStyle, getImageStyle, isReady, croppered };
    },
  });
</script>
