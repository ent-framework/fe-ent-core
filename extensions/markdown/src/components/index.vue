<template>
  <div ref="wrapRef" />
</template>
<script lang="ts">
  import {
    computed,
    defineComponent,
    nextTick,
    onBeforeUnmount,
    onDeactivated,
    ref,
    unref,
    watch
  } from 'vue';
  import Vditor from 'vditor';
  import { onMountedOrActivated, useRootSetting } from 'fe-ent-core/es/hooks';
  import { useLocale } from 'fe-ent-core/es/locales';
  import { useModalContext } from 'fe-ent-core/es/components/modal';
  import type { Ref } from 'vue';
  import type { ElRef, Nullable } from 'fe-ent-core/es/types';

  type Lang = 'zh_CN' | 'en_US' | 'ja_JP' | 'ko_KR' | undefined;

  export default defineComponent({
    name: 'EntMarkdown',
    inheritAttrs: false,
    props: {
      height: { type: Number, default: 360 },
      value: { type: String, default: '' }
    },
    emits: ['change', 'get', 'update:value'],
    setup(props, { attrs, emit }) {
      const wrapRef = ref<ElRef>(null);
      const vditorRef = ref(null) as Ref<Nullable<Vditor>>;
      const initedRef = ref(false);

      const modalFn = useModalContext();

      const { getLocale } = useLocale();
      const { getTheme } = useRootSetting();
      const valueRef = ref(props.value || '');

      watch(
        [() => getTheme.value, () => initedRef.value],
        ([val, inited]) => {
          if (!inited) {
            return;
          }
          const theme = val === 'dark' ? 'dark' : 'classic';
          instance.getVditor()?.setTheme(theme);
        },
        {
          immediate: true,
          flush: 'post'
        }
      );

      watch(
        () => props.value,
        (v) => {
          if (v !== valueRef.value) {
            instance.getVditor()?.setValue(v);
          }
          valueRef.value = v;
        }
      );

      const getCurrentLang = computed((): 'zh_CN' | 'en_US' | 'ja_JP' | 'ko_KR' => {
        let lang: Lang;
        switch (unref(getLocale)) {
          case 'en':
            lang = 'en_US';
            break;
          default:
            lang = 'zh_CN';
        }
        return lang;
      });
      function init() {
        const wrapEl = unref(wrapRef) as HTMLElement;
        if (!wrapEl) return;
        const bindValue = { ...attrs, ...props };
        const insEditor = new Vditor(wrapEl, {
          theme: getTheme.value === 'dark' ? 'dark' : 'classic',
          lang: unref(getCurrentLang),
          mode: 'sv',
          fullscreen: {
            index: 520
          },
          preview: {
            actions: []
          },
          input: (v) => {
            valueRef.value = v;
            emit('update:value', v);
            emit('change', v);
          },
          after: () => {
            nextTick(() => {
              modalFn?.redoModalHeight?.();
              insEditor.setValue(valueRef.value);
              vditorRef.value = insEditor;
              initedRef.value = true;
              emit('get', instance);
            });
          },
          blur: () => {
            //unref(vditorRef)?.setValue(props.value);
          },
          ...bindValue,
          cache: {
            enable: false
          }
        });
      }

      const instance = {
        getVditor: (): Vditor => vditorRef.value!
      };

      function destroy() {
        const vditorInstance = unref(vditorRef);
        if (!vditorInstance) return;
        try {
          vditorInstance?.destroy?.();
        } catch {}
        vditorRef.value = null;
        initedRef.value = false;
      }

      onMountedOrActivated(init);

      onBeforeUnmount(destroy);
      onDeactivated(destroy);
      return {
        wrapRef,
        ...instance
      };
    }
  });
</script>
