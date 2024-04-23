<template>
  <div ref="el" class="relative !h-full w-full overflow-hidden" />
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, onUnmounted, ref, unref, watch, watchEffect } from 'vue';
  import { useDebounceFn } from '@vueuse/core';
  import { useAppStore } from 'fe-ent-core/es/store';
  import { useWindowSizeFn } from 'fe-ent-core/es/hooks';
  import { MODE } from '../typing';
  import { CodeMirror } from './codemirror';
  import type { Nullable } from 'fe-ent-core/es/types';

  export interface CodeMirrorEditorProps {
    mode: MODE;
    value: string;
    readonly: boolean;
  }

  const props = withDefaults(defineProps<CodeMirrorEditorProps>(), {
    mode: MODE.JSON,
    value: '',
    readonly: false
  });

  const emit = defineEmits(['change']);

  const el = ref();
  let editor: Nullable<CodeMirror.Editor>;

  const debounceRefresh = useDebounceFn(refresh, 100);
  const appStore = useAppStore();

  watch(
    () => props.value,
    async (value) => {
      await nextTick();
      const oldValue = editor?.getValue();
      if (value !== oldValue) {
        editor?.setValue(value ? value : '');
      }
    },
    { flush: 'post' }
  );

  watchEffect(() => {
    editor?.setOption('mode', props.mode);
  });

  watch(
    () => appStore.getThemeSetting.theme,
    async () => {
      setTheme();
    },
    {
      immediate: true
    }
  );

  function setTheme() {
    unref(editor)?.setOption(
      'theme',
      appStore.getThemeSetting.theme === 'light' ? 'idea' : 'material-palenight'
    );
  }

  function refresh() {
    editor?.refresh();
  }

  async function init() {
    const addonOptions = {
      autoCloseBrackets: true,
      autoCloseTags: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers']
    };

    editor = CodeMirror(el.value!, {
      value: '',
      mode: props.mode,
      readOnly: props.readonly,
      tabSize: 2,
      theme: 'material-palenight',
      lineWrapping: true,
      lineNumbers: true,
      ...addonOptions
    });
    editor?.setValue(props.value);
    setTheme();
    editor?.on('change', () => {
      emit('change', editor?.getValue());
    });
  }

  onMounted(async () => {
    await nextTick();
    init();
    useWindowSizeFn(debounceRefresh);
  });

  onUnmounted(() => {
    editor = null;
  });
</script>
