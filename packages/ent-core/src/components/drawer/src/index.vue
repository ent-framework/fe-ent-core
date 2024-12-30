<template>
  <NDrawer
    :class="prefixCls"
    v-bind="getBindValues"
    @after-leave="onClose"
    @update-show="onUpdateShow"
  >
    <NDrawerContent v-bind="getContentProps">
      <template #header>
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
      <slot />
      <template #footer>
        <DrawerFooter v-bind="getProps" @close="onClose" @ok="handleOk">
          <template v-for="item in Object.keys($slots)" #[item]="data">
            <slot :name="item" v-bind="data || {}" />
          </template>
        </DrawerFooter>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>
<script lang="ts">
  import { computed, defineComponent, nextTick, ref, toRaw, unref, watch } from 'vue';
  import { NDrawer, NDrawerContent } from 'naive-ui';
  import { useAttrs, useDesign, useI18n } from '../../../hooks';
  import { isFunction } from '../../../utils/is';
  import { deepMerge } from '../../../utils';
  import { basicProps } from './props';
  import DrawerHeader from './components/drawer-header.vue';
  import DrawerFooter from './components/drawer-footer.vue';
  import type { Nullable } from '../../../types';
  import { DrawerProps, DrawerActionType } from './typing';
  import type { DrawerContentProps } from 'naive-ui/es/drawer';

  export default defineComponent({
    name: 'EntDrawer',
    components: { NDrawer, NDrawerContent, DrawerFooter, DrawerHeader },
    extends: NDrawer,
    inheritAttrs: false,
    props: basicProps,
    emits: ['visible-change', 'ok', 'close'],
    setup(props, { emit, expose }) {
      const openRef = ref(false);
      const attrs = useAttrs();
      const propsRef = ref<Partial<Nullable<DrawerProps>>>(null);

      const { t } = useI18n();
      const { prefixCls } = useDesign('basic-drawer');

      const getMergeProps = computed((): DrawerProps => {
        return deepMerge(toRaw(props), unref(propsRef));
      });

      const getProps = computed((): DrawerProps => {
        const opt: DrawerProps = {
          placement: 'right',
          ...unref(attrs),
          ...unref(getMergeProps),
          show: unref(openRef)
        };
        opt.title = undefined;
        const { isDetail, width } = opt;
        if (isDetail) {
          if (!width) {
            opt.width = '100%';
          }
        }
        return opt;
      });

      const getContentProps = computed((): DrawerContentProps => {
        const props = unref(getProps);
        const { title, content = {} } = props;
        return { closable: true, title, ...content };
      });

      const getBindValues = computed((): DrawerProps => {
        return {
          ...attrs,
          ...unref(getProps)
        };
      });

      const getLoading = computed(() => {
        return !!unref(getProps)?.loading;
      });

      watch(
        () => props.show,
        (newVal, oldVal) => {
          if (newVal !== oldVal) openRef.value = !!newVal;
        },
        { deep: true }
      );

      watch(
        () => openRef.value,
        (visible) => {
          nextTick(() => {
            emit('visible-change', visible);
          });
        }
      );

      // Cancel event
      async function onClose() {
        const { closeFunc } = unref(getProps);
        emit('close');
        if (closeFunc && isFunction(closeFunc)) {
          const res = await closeFunc();
          openRef.value = !res;
          return;
        }
        openRef.value = false;
      }

      async function onUpdateShow(show: boolean) {
        openRef.value = show;
        if (!show) {
          await onClose();
        }
      }

      function setDrawerProps(props: Partial<DrawerProps>): void {
        // Keep the last setDrawerProps
        propsRef.value = deepMerge(unref(propsRef) || ({} as any), props);

        if (Reflect.has(props, 'show')) {
          openRef.value = !!props.show;
        }
      }
      function handleOk() {
        emit('ok');
      }

      const open = (show: boolean): void => {
        setDrawerProps({
          show
        });
      };

      const changeLoading = (loading: boolean): void => {
        setDrawerProps({
          loading
        });
      };

      const getOpen = computed((): boolean => {
        return unref(propsRef)?.show || false;
      });

      const drawerAction: DrawerActionType = {
        setDrawerProps,
        open,
        changeLoading,
        getOpen
      };

      expose(drawerAction);

      return {
        onClose,
        t,
        prefixCls,
        openRef,
        getMergeProps: getMergeProps as any,
        getProps: getProps as any,
        getContentProps,
        getLoading,
        getBindValues,
        handleOk,
        onUpdateShow
      };
    }
  });
</script>
