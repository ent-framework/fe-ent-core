<template>
  <Drawer :class="prefixCls" v-bind="getBindValues" @close="onClose">
    <template v-if="!$slots.title" #title>
      <DrawerHeader
        :title="getMergeProps.title"
        :is-detail="isDetail"
        :show-detail-back="showDetailBack"
        @close="onClose"
      >
        <template #titleToolbar>
          <slot name="titleToolbar" />
        </template>
      </DrawerHeader>
    </template>
    <template v-else #title>
      <slot name="title" />
    </template>

    <EntScrollContainer
      v-loading="getLoading"
      :style="getScrollContentStyle"
      :loading-tip="loadingText || t('common.loadingText')"
    >
      <slot />
    </EntScrollContainer>
    <DrawerFooter v-bind="getProps" :height="getFooterHeight" @close="onClose" @ok="handleOk">
      <template v-for="item in Object.keys($slots)" #[item]="data">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </DrawerFooter>
  </Drawer>
</template>
<script lang="ts">
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    nextTick,
    ref,
    toRaw,
    unref,
    watch,
  } from 'vue';
  import { Drawer } from 'ant-design-vue';
  import { isFunction } from '@vueuse/shared';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { isNumber } from '@ent-core/utils/is';
  import { deepMerge } from '@ent-core/utils';
  import { EntScrollContainer } from '@ent-core/components/container';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useAttrs } from '@ent-core/hooks/core/use-attrs';
  import { basicProps } from './props';
  import DrawerHeader from './components/drawer-header.vue';
  import DrawerFooter from './components/drawer-footer.vue';
  import type { Nullable, Recordable } from '@ent-core/types';
  import type { CSSProperties } from 'vue';
  import type { DrawerInstance, DrawerProps } from './typing';

  /**
   * @docLocation https://raw.githubusercontent.com/vueComponent/ant-design-vue/4.0.0-rc.5/components/drawer/index.zh-CN.md
   * @extends Drawer
   * @docLink https://next.antdv.com/components/drawer-cn
   */
  export default defineComponent({
    name: 'EntDrawer',
    components: { Drawer, EntScrollContainer, DrawerFooter, DrawerHeader },
    inheritAttrs: false,
    props: basicProps,
    emits: ['visible-change', 'ok', 'close', 'register'],
    setup(props, { emit }) {
      const visibleRef = ref(false);
      const attrs = useAttrs();
      const propsRef = ref<Partial<Nullable<DrawerProps>>>(null);

      const { t } = useI18n();
      const { prefixVar, prefixCls } = useDesign('basic-drawer');

      const drawerInstance: DrawerInstance = {
        setDrawerProps,
        emitVisible: undefined,
      };

      const instance = getCurrentInstance();

      instance && emit('register', drawerInstance, instance.uid);

      const getMergeProps = computed((): DrawerProps => {
        return deepMerge(toRaw(props), unref(propsRef));
      });

      const getProps = computed((): DrawerProps => {
        const opt = {
          placement: 'right',
          ...unref(attrs),
          ...unref(getMergeProps),
          visible: unref(visibleRef),
        };
        opt.title = undefined;
        const { isDetail, width, wrapClassName, getContainer } = opt;
        if (isDetail) {
          if (!width) {
            opt.width = '100%';
          }
          const detailCls = `${prefixCls}__detail`;
          opt.class = wrapClassName ? `${wrapClassName} ${detailCls}` : detailCls;

          if (!getContainer) {
            // TODO type error?
            opt.getContainer = `.${prefixVar}-layout-content` as any;
          }
        }
        return opt as DrawerProps;
      });

      const getBindValues = computed((): DrawerProps => {
        return {
          ...attrs,
          ...unref(getProps),
        };
      });

      // Custom implementation of the bottom button,
      const getFooterHeight = computed(() => {
        const { footerHeight, showFooter } = unref(getProps);
        if (showFooter && footerHeight) {
          return isNumber(footerHeight)
            ? `${footerHeight}px`
            : `${footerHeight.replace('px', '')}px`;
        }
        return `0px`;
      });

      const getScrollContentStyle = computed((): CSSProperties => {
        const footerHeight = unref(getFooterHeight);
        return {
          position: 'relative',
          height: `calc(100% - ${footerHeight})`,
        };
      });

      const getLoading = computed(() => {
        return !!unref(getProps)?.loading;
      });

      watch(
        () => props.visible,
        (newVal, oldVal) => {
          if (newVal !== oldVal) visibleRef.value = !!newVal;
        },
        { deep: true },
      );

      watch(
        () => visibleRef.value,
        (visible) => {
          nextTick(() => {
            emit('visible-change', visible);
            instance && drawerInstance.emitVisible?.(visible, instance.uid);
          });
        },
      );

      // Cancel event
      async function onClose(e: Recordable) {
        const { closeFunc } = unref(getProps);
        emit('close', e);
        if (closeFunc && isFunction(closeFunc)) {
          const res = await closeFunc();
          visibleRef.value = !res;
          return;
        }
        visibleRef.value = false;
      }

      function setDrawerProps(props: Partial<DrawerProps>): void {
        // Keep the last setDrawerProps
        propsRef.value = deepMerge(unref(propsRef) || ({} as any), props);

        if (Reflect.has(props, 'visible')) {
          visibleRef.value = !!props.visible;
        }
      }

      function handleOk() {
        emit('ok');
      }

      return {
        onClose,
        t,
        prefixCls,
        getMergeProps: getMergeProps as any,
        getScrollContentStyle,
        getProps: getProps as any,
        getLoading,
        getBindValues,
        getFooterHeight,
        handleOk,
      };
    },
  });
</script>
