<template>
  <NModal v-bind="getBindValue" @update-show="onUpdateShow">
    <template #header>
      <div id="basic-modal-bar" class="w-full cursor-move">
        <ModalHeader
          :help-message="getProps.helpMessage"
          :title="getMergeProps.title"
          @dblclick="handleTitleDbClick"
        />
      </div>
    </template>
    <template #default>
      <slot name="default" />
    </template>
    <template v-if="!$slots.action" #action>
      <ModalFooter v-bind="getBindValue" @ok="handleOk" @cancel="handleCancel">
        <template v-for="item in Object.keys($slots)" #[item]="data">
          <slot :name="item" v-bind="data || {}" />
        </template>
      </ModalFooter>
    </template>
    <template v-else #action>
      <slot name="action" />
    </template>
  </NModal>
</template>
<script lang="ts">
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    nextTick,
    ref,
    toRef,
    unref,
    watch,
    watchEffect,
  } from 'vue';
  import { omit } from 'lodash-es';
  import { NModal } from 'naive-ui';
  import { deepMerge } from '@ent-core/utils';
  import ModalFooter from './components/modal-footer.vue';
  import ModalHeader from './components/modal-header.vue';
  import { basicProps } from './props';
  import { useFullScreen } from './hooks/use-modal-full-screen';
  import type { ModalMethods, ModalProps } from './typing';
  import type { Nullable, Recordable } from '@ent-core/types';

  /**
   * @docLocation https://raw.githubusercontent.com/vueComponent/ant-design-vue/4.0.0/components/modal/index.zh-CN.md
   * @extends Modal
   * @docLink https://next.antdv.com/components/modal-cn
   */
  export default defineComponent({
    name: 'EntModal',
    components: { ModalHeader, NModal, ModalFooter },
    inheritAttrs: false,
    props: basicProps,
    emits: ['visible-change', 'height-change', 'cancel', 'ok', 'register', 'update:visible'],
    setup(props, { emit, attrs }) {
      const openRef = ref(false);
      const propsRef = ref<Partial<Nullable<ModalProps>>>(null);
      const modalWrapperRef = ref<any>(null);

      // modal   Bottom and top height
      const extHeightRef = ref(0);
      const modalMethods: ModalMethods = {
        setModalProps,
        emitVisible: undefined,
        redoModalHeight: () => {
          nextTick(() => {
            if (unref(modalWrapperRef)) {
              (unref(modalWrapperRef) as any).setModalHeight();
            }
          });
        },
      };

      const instance = getCurrentInstance();
      if (instance) {
        emit('register', modalMethods, instance.uid);
      }

      // Custom title component: get title
      const getMergeProps = computed((): Recordable => {
        return {
          ...props,
          ...(unref(propsRef) as any),
        };
      });

      const { handleFullScreen, getWrapClassName, fullScreenRef } = useFullScreen({
        modalWrapperRef,
        extHeightRef,
        wrapClassName: toRef(getMergeProps.value, 'wrapClassName'),
      });

      // modal component does not need title and origin buttons
      const getProps = computed((): Recordable => {
        const opt = {
          ...unref(getMergeProps),
          show: unref(openRef),
          okButtonProps: undefined,
          cancelButtonProps: undefined,
          title: undefined,
        };
        return {
          ...opt,
          wrapClassName: unref(getWrapClassName),
        };
      });

      const getBindValue = computed((): Recordable => {
        const attr = {
          closable: true,
          ...attrs,
          ...unref(getMergeProps),
          show: unref(openRef),
          wrapClassName: unref(getWrapClassName),
          preset: 'card',
        };
        if (unref(fullScreenRef)) {
          return omit(attr, ['height', 'title', 'onOk']);
        }
        return omit(attr, 'title', 'onOk');
      });

      const getWrapperHeight = computed(() => {
        if (unref(fullScreenRef)) return undefined;
        return unref(getProps).height;
      });

      watchEffect(() => {
        openRef.value = !!props.show;
        fullScreenRef.value = props.defaultFullscreen;
      });

      watch(
        () => unref(openRef),
        (v) => {
          emit('visible-change', v);
          emit('update:visible', v);
          instance && modalMethods.emitVisible?.(v, instance.uid);
          nextTick(() => {
            if (props.scrollTop && v && unref(modalWrapperRef)) {
              (unref(modalWrapperRef) as any).scrollTop();
            }
          });
        },
        {
          immediate: false,
        },
      );

      // 取消事件
      async function handleCancel() {
        openRef.value = false;
        emit('cancel');
      }

      async function onUpdateShow(show: boolean) {
        openRef.value = show;
      }

      /**
       * @description: 设置modal参数
       */
      function setModalProps(props: Partial<ModalProps>): void {
        // Keep the last setModalProps
        propsRef.value = deepMerge(unref(propsRef) || ({} as any), props);
        if (Reflect.has(props, 'show')) {
          openRef.value = !!props.show;
        }
        if (Reflect.has(props, 'defaultFullscreen')) {
          fullScreenRef.value = !!props.defaultFullscreen;
        }
      }

      function handleOk(e: Event) {
        emit('ok', e);
      }

      function handleHeightChange(height: string) {
        emit('height-change', height);
      }

      function handleExtHeight(height: number) {
        extHeightRef.value = height;
      }

      function handleTitleDbClick(e) {
        if (!props.canFullscreen) return;
        e.stopPropagation();
        handleFullScreen(e);
      }

      return {
        handleCancel,
        getBindValue,
        getProps,
        handleFullScreen,
        fullScreenRef,
        getMergeProps,
        handleOk,
        openRef,
        omit,
        modalWrapperRef,
        handleExtHeight,
        handleHeightChange,
        handleTitleDbClick,
        getWrapperHeight,
        onUpdateShow,
      };
    },
  });
</script>
