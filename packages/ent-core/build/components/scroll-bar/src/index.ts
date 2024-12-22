
  import {
    computed,
    defineComponent,
    nextTick,
    onBeforeUnmount,
    onMounted,
    provide,
    ref,
    unref
  } from 'vue';
  import { addResizeListener, removeResizeListener } from '../../../utils/event';
  import componentSetting from '../../../logics/settings/component-setting';
  import { toObject } from './util';
  import Bar from './bar';
  const { scrollbar } = componentSetting;

  export default defineComponent({
    name: 'EntScrollbar',
    // inheritAttrs: false,
    components: { Bar },
    props: {
      native: {
        type: Boolean,
        default: scrollbar?.native ?? false
      },
      wrapStyle: {
        type: [String, Array],
        default: ''
      },
      wrapClass: {
        type: [String, Array],
        default: ''
      },
      viewClass: {
        type: [String, Array],
        default: ''
      },
      viewStyle: {
        type: [String, Array],
        default: ''
      },
      noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
      tag: {
        type: String,
        default: 'div'
      }
    },
    setup(props) {
      const sizeWidth = ref('0');
      const sizeHeight = ref('0');
      const moveX = ref(0);
      const moveY = ref(0);
      const wrap = ref();
      const resize = ref();

      provide('scroll-bar-wrap', wrap);

      const style = computed(() => {
        if (Array.isArray(props.wrapStyle)) {
          return toObject(props.wrapStyle);
        }
        return props.wrapStyle;
      });

      const handleScroll = () => {
        if (!props.native) {
          moveY.value = (unref(wrap).scrollTop * 100) / unref(wrap).clientHeight;
          moveX.value = (unref(wrap).scrollLeft * 100) / unref(wrap).clientWidth;
        }
      };

      const update = () => {
        if (!unref(wrap)) return;

        const heightPercentage = (unref(wrap).clientHeight * 100) / unref(wrap).scrollHeight;
        const widthPercentage = (unref(wrap).clientWidth * 100) / unref(wrap).scrollWidth;

        sizeHeight.value = heightPercentage < 100 ? `${heightPercentage}%` : '';
        sizeWidth.value = widthPercentage < 100 ? `${widthPercentage}%` : '';
      };

      onMounted(() => {
        if (props.native) return;
        nextTick(update);
        if (!props.noresize) {
          addResizeListener(unref(resize), update);
          addResizeListener(unref(wrap), update);
          addEventListener('resize', update);
        }
      });

      onBeforeUnmount(() => {
        if (props.native) return;
        if (!props.noresize) {
          removeResizeListener(unref(resize), update);
          removeResizeListener(unref(wrap), update);
          removeEventListener('resize', update);
        }
      });

      return {
        moveX,
        moveY,
        sizeWidth,
        sizeHeight,
        style,
        wrap,
        resize,
        update,
        handleScroll
      };
    }
  });
