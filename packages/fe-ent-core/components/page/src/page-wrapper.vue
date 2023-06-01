<template>
  <div ref="wrapperRef" :class="getClass">
    <PageHeader
      v-if="content || $slots.headerContent || title || getHeaderSlots.length"
      v-bind="omit($attrs, 'class')"
      ref="headerRef"
      :ghost="ghost"
      :title="title"
    >
      <template #default>
        <template v-if="content">
          {{ content }}
        </template>
        <slot v-else name="headerContent" />
      </template>
      <template v-for="item in getHeaderSlots" #[item]="data">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </PageHeader>

    <div ref="contentRef" class="overflow-hidden" :class="getContentClass" :style="getContentStyle">
      <slot />
    </div>

    <PageFooter v-if="getShowFooter" ref="footerRef">
      <template #left>
        <slot name="leftFooter" />
      </template>
      <template #right>
        <slot name="rightFooter" />
      </template>
    </PageFooter>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, provide, ref, unref, watch } from 'vue';

  import { omit } from 'lodash-es';
  import { PageHeader } from 'ant-design-vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useTheme } from '@ent-core/hooks/web/use-theme';
  import { propTypes } from '@ent-core/utils/prop-types';
  import { useContentHeight } from '@ent-core/hooks/web/use-content-height';
  import { PageWrapperFixedHeightKey } from '../constant';
  import PageFooter from './page-footer.vue';
  import type { CSSProperties, PropType } from 'vue';

  export default defineComponent({
    name: 'EntPageWrapper',
    components: { PageFooter, PageHeader },
    inheritAttrs: false,
    props: {
      title: propTypes.string,
      dense: propTypes.bool,
      ghost: propTypes.bool,
      content: propTypes.string,
      contentStyle: {
        type: Object as PropType<CSSProperties>,
      },
      contentBackground: propTypes.bool,
      contentFullHeight: propTypes.bool,
      contentClass: propTypes.string,
      fixedHeight: propTypes.bool,
      upwardSpace: propTypes.oneOfType([propTypes.number, propTypes.string]).def(0),
    },
    setup(props, { slots, attrs }) {
      const wrapperRef = ref(null);
      const headerRef = ref(null);
      const contentRef = ref(null);
      const footerRef = ref(null);
      const { prefixCls } = useDesign('page-wrapper');

      provide(
        PageWrapperFixedHeightKey,
        computed(() => props.fixedHeight),
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
        getUpwardSpace,
      );
      setCompensation({ useLayoutFooter: true, elements: [footerRef] });

      const getClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--dense`]: props.dense,
          },
          attrs.class ?? {},
        ];
      });

      const { token } = useTheme();

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
          ...(fixedHeight ? { height } : {}),
          backgroundColor: token.value.colorBgContainer,
        };
      });

      const getContentClass = computed(() => {
        const { contentBackground, contentClass } = props;
        return [
          `${prefixCls}-content`,
          contentClass,
          {
            [`${prefixCls}-content-bg`]: contentBackground,
          },
        ];
      });

      watch(
        () => [getShowFooter.value],
        () => {
          redoHeight();
        },
        {
          flush: 'post',
          immediate: true,
        },
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
        getContentClass,
      };
    },
  });
</script>
