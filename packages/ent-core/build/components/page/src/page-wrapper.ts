
  import { computed, defineComponent, provide, ref, unref, watch } from 'vue';

  import { omit } from 'lodash-es';
  import { NPageHeader } from 'naive-ui';
  import { useDesign } from '../../../hooks/web/use-design';
  import { useContentHeight } from '../../../hooks/web/use-content-height';
  import { PageWrapperFixedHeightKey } from '../constant';
  import PageFooter from './page-footer';
  import type { CSSProperties, PropType } from 'vue';

  export default defineComponent({
    name: 'EntPageWrapper',
    components: { PageFooter, NPageHeader },
    inheritAttrs: false,
    props: {
      title: { type: String },
      dense: { type: Boolean },
      ghost: { type: Boolean },
      content: { type: String },
      contentStyle: {
        type: Object as PropType<CSSProperties>
      },
      contentBackground: { type: Boolean },
      contentFullHeight: { type: Boolean },
      contentClass: { type: String },
      fixedHeight: { type: Boolean },
      upwardSpace: {
        type: [String, Number] as PropType<string | number>,
        default: 0
      }
    },
    setup(props, { slots, attrs }) {
      const wrapperRef = ref(null);
      const headerRef = ref(null);
      const contentRef = ref(null);
      const footerRef = ref(null);
      const { prefixCls } = useDesign('page-wrapper');

      provide(
        PageWrapperFixedHeightKey,
        computed(() => props.fixedHeight)
      );

      const getIsContentFullHeight = computed(() => {
        return props.contentFullHeight;
      });

      const getUpwardSpace = computed(() => props.upwardSpace);
      const { redoHeight, setCompensation, contentHeight } = useContentHeight(
        getIsContentFullHeight as any,
        wrapperRef,
        [headerRef, footerRef],
        [contentRef],
        getUpwardSpace
      );
      setCompensation({ useLayoutFooter: true, elements: [footerRef] });

      const getClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--dense`]: props.dense
          },
          attrs.class ?? {}
        ];
      });

      const getShowFooter = computed(() => slots?.leftFooter || slots?.rightFooter);

      const getHeaderSlots = computed(() => {
        return Object.keys(omit(slots, 'default', 'leftFooter', 'rightFooter', 'headerContent'));
      });

      const getContentStyle = computed((): CSSProperties => {
        const { contentFullHeight, contentStyle, fixedHeight } = props;
        if (!contentFullHeight) {
          return { ...contentStyle };
        }

        const height = `${unref(contentHeight)}px`;
        return {
          ...contentStyle,
          minHeight: height,
          ...(fixedHeight ? { height } : {})
        };
      });

      const getContentClass = computed(() => {
        const { contentBackground, contentClass } = props;
        return [
          `${prefixCls}-content`,
          contentClass,
          {
            [`${prefixCls}-content-bg`]: contentBackground
          }
        ];
      });

      watch(
        () => [getShowFooter.value],
        () => {
          redoHeight();
        },
        {
          flush: 'post',
          immediate: true
        }
      );

      return {
        getContentStyle,
        wrapperRef,
        headerRef,
        contentRef,
        footerRef,
        getClass,
        getHeaderSlots,
        prefixCls,
        getShowFooter,
        omit,
        getContentClass
      };
    }
  });
