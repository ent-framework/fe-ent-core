<template>
  <div class="h-full">
    <CodeMirrorEditor
      :value="getValue"
      :mode="mode"
      :readonly="readonly"
      @change="handleValueChange"
    />
  </div>
</template>
<script lang="ts" setup>
  import { computed, defineComponent } from 'vue';
  import { isString } from 'fe-ent-core/es/utils';
  import { MODE } from '../typing';
  import CodeMirrorEditor from './code-mirror-editor.vue';
  import type { PropType } from 'vue';

  const props = defineProps({
    value: { type: [Object, String] as PropType<Record<string, any> | string> },
    mode: {
      type: String as PropType<MODE>,
      default: MODE.JSON,
      validator(value: any) {
        // 这个值必须匹配下列字符串中的一个
        return Object.values(MODE).includes(value);
      },
    },
    readonly: { type: Boolean },
    autoFormat: { type: Boolean, default: true },
  });

  defineComponent({
    name: 'EntCodeEditor',
    components: { CodeMirrorEditor },
  });

  const emit = defineEmits(['change', 'update:value', 'format-error']);

  const getValue = computed(() => {
    const { value, mode, autoFormat } = props;
    if (!autoFormat || mode !== MODE.JSON) {
      return value as string;
    }
    let result = value;
    if (isString(value)) {
      try {
        result = JSON.parse(value);
      } catch {
        emit('format-error', value);
        return value as string;
      }
    }
    return JSON.stringify(result, null, 2);
  });

  function handleValueChange(v) {
    emit('update:value', v);
    emit('change', v);
  }
</script>
