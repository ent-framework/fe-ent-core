<template>
  <div class="h-full">
    <CodeMirrorEditor
      :value="getValue"
      @change="handleValueChange"
      :mode="mode"
      :readonly="readonly"
    />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import CodeMirrorEditor from './codemirror/CodeMirror.vue';
  import { isString } from 'fe-ent-core/utils/is';
  import { MODE } from './typing';

  const props = {
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
  };

  export default defineComponent({
    name: 'CodeEditor',
    components: { CodeMirrorEditor },
    props,
    emits: ['change', 'update:value', 'format-error'],
    setup(props, { emit }) {
      const getValue = computed(() => {
        const { value, mode, autoFormat } = props;
        if (!autoFormat || mode !== MODE.JSON) {
          return value as string;
        }
        let result = value;
        if (isString(value)) {
          try {
            result = JSON.parse(value);
          } catch (e) {
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
      return {
        getValue,
        handleValueChange,
      };
    },
  });
</script>
