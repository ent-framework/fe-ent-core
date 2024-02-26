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

  export interface CodeMirrorProps {
    /**
     * 值
     */
    value: string | Record<string, any>;
    /**
     * 模式
     * @type string
     * @default JSON
     */
    mode: MODE;
    /**
     * 是否只读
     */
    readonly?: boolean;
    /**
     * 是否开启自动格式化
     * @default true
     */
    autoFormat?: boolean;
  }

  const props = withDefaults(defineProps<CodeMirrorProps>(), {
    mode: MODE.JSON,
    autoFormat: true,
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
