<template>
  <div
    v-if="editor"
    :style="editorStyle"
    :class="[
      {
        'ent-tiptap-editor': true,
        'ent-tiptap-editor--fullscreen': isFullscreen,
        'ent-tiptap-editor--with-footer': showFooter
      },
      editorClass
    ]"
  >
    <div>
      <menu-bubble :editor="editor" :class="editorBubbleMenuClass" />
    </div>
    <div>
      <menu-bar :editor="editor" :class="editorMenubarClass" />
    </div>
    <div
      v-if="isCodeViewMode"
      :class="{
        'ent-tiptap-editor__codemirror': true,
        'border-bottom-radius': isCodeViewMode
      }"
    >
      <textarea ref="cmTextAreaRef" />
    </div>
    <editor-content
      v-show="!isCodeViewMode"
      :editor="editor"
      :class="[
        {
          'ent-tiptap-editor__content': true
        },
        editorContentClass
      ]"
    />

    <div
      v-if="showFooter"
      :class="[
        {
          'ent-tiptap-editor__footer': true
        },
        editorFooterClass
      ]"
    >
      <span class="ent-tiptap-editor__characters">
        {{ t('editor.characters') }}: {{ characters }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, provide, ref, unref, watchEffect } from 'vue';
  import { EditorContent, useEditor } from '@tiptap/vue-3';
  import TiptapPlaceholder from '@tiptap/extension-placeholder';
  import CharacterCount from '@tiptap/extension-character-count';
  import { useCharacterCount, useCodeView, useEditorStyle } from '../hooks';
  import { Trans } from '../i18n';
  import MenuBar from './menu-bar/index.vue';
  import MenuBubble from './menu-bubble/index.vue';
  import type { PropType } from 'vue';
  import type { EditorProps } from '@tiptap/pm/view';
  import type { Editor, Extension } from '@tiptap/core';

  export default defineComponent({
    name: 'EntTiptap',

    components: {
      EditorContent,
      MenuBar,
      MenuBubble
    },

    props: {
      content: {
        validator: (prop) => typeof prop === 'object' || typeof prop === 'string',
        default: ''
      },
      extensions: {
        type: Array as PropType<Extension[]>,
        default: () => []
      },
      placeholder: {
        type: String,
        default: ''
      },
      lang: {
        type: String,
        default: 'en'
      },
      width: {
        type: [String, Number],
        default: undefined
      },
      height: {
        type: [String, Number],
        default: undefined
      },
      output: {
        type: String,
        default: 'html',
        validator(output: string): boolean {
          return ['html', 'json'].includes(output);
        }
      },
      spellcheck: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      tooltip: {
        type: Boolean,
        default: true
      },
      enableCharCount: {
        type: Boolean,
        default: true
      },
      editorProps: {
        type: Object as PropType<EditorProps>,
        default: () => {}
      },
      charCountMax: {
        type: Number,
        default: undefined
      },
      // ----- Editor Class -----
      editorClass: {
        type: [String, Array, Object],
        default: undefined
      },
      editorContentClass: {
        type: [String, Array, Object],
        default: undefined
      },
      editorMenubarClass: {
        type: [String, Array, Object],
        default: undefined
      },
      editorBubbleMenuClass: {
        type: [String, Array, Object],
        default: undefined
      },
      editorFooterClass: {
        type: [String, Array, Object],
        default: undefined
      }
    },
    setup(props, { emit }) {
      const extensions = props.extensions.concat([
        TiptapPlaceholder.configure({
          emptyEditorClass: 'ent-tiptap-editor--empty',
          emptyNodeClass: 'ent-tiptap-editor__placeholder',
          showOnlyCurrent: false,
          placeholder: () => {
            return props.placeholder;
          }
        })
      ]);
      if (props.enableCharCount) {
        extensions.push(
          CharacterCount.configure({
            limit: props.charCountMax,
            mode: 'textSize'
          })
        );
      }

      const onUpdate = ({ editor }: { editor: Editor }) => {
        let output;
        if (props.output === 'html') {
          output = editor.getHTML();
        } else {
          output = editor.getJSON();
        }

        emit('update:content', output);

        emit('onUpdate', output, editor);
      };
      let additionalExtensions: Extension[] = [];
      extensions.forEach((extension) => {
        if (
          extension?.parent?.config?.nessesaryExtensions ||
          extension?.config?.nessesaryExtensions
        ) {
          additionalExtensions = [
            ...additionalExtensions,
            ...(extension?.parent?.config?.nessesaryExtensions ||
              extension?.config?.nessesaryExtensions)
          ];
        }
      });
      const uniqueObjects: Extension[] = [];
      const seenValues = {} as { [key: string]: boolean };
      // remove duplicate extensions
      for (const obj of additionalExtensions) {
        const value = obj.name;

        if (!seenValues[value]) {
          seenValues[value] = true;
          uniqueObjects.push(obj);
        }
      }
      const allExtensions = [...extensions, ...uniqueObjects];
      const editor = useEditor({
        content: props.content,
        extensions: allExtensions.map((item, index) => {
          if (!item.options.priority) {
            return item.configure({ priority: allExtensions.length - index });
          } else {
            return item;
          }
        }),
        editable: !props.readonly,
        onCreate: (options) => {
          emit('onCreate', options);
        },
        onTransaction: (options) => {
          emit('onTransaction', options);
        },
        onFocus: (options) => {
          emit('onFocus', options);
        },
        onBlur: (options) => {
          emit('onBlur', options);
        },
        onDestroy: (options) => {
          emit('onDestroy', options);
        },
        onUpdate
      });

      watchEffect(() => {
        unref(editor)?.setOptions({
          editorProps: {
            attributes: {
              spellcheck: String(props.spellcheck)
            },
            ...props.editorProps
          },
          editable: !props.readonly
        });
      });

      // i18n
      const i18nHandler = Trans.buildI18nHandler(props.lang);
      const t = (...args: any[]): string => {
        return i18nHandler.apply(Trans, args);
      };

      const isFullscreen = ref(false);
      const toggleFullscreen = (val: boolean) => {
        isFullscreen.value = val;
      };
      provide('isFullscreen', isFullscreen);
      provide('toggleFullscreen', toggleFullscreen);

      provide('enableTooltip', props.tooltip);

      const { isCodeViewMode, cmTextAreaRef } = useCodeView(editor);

      provide('isCodeViewMode', isCodeViewMode);

      const { characters } = useCharacterCount(editor);

      const showFooter = computed(() => {
        return props.enableCharCount && !unref(isCodeViewMode);
      });
      // Reactive prop content
      function setContent(value: any) {
        if (editor.value) {
          editor.value.commands.setContent(value);
        }
      }
      const editorStyle = useEditorStyle({
        width: props.width,
        height: props.height
      });

      provide('t', t);
      provide('et', this);

      return {
        t,
        editor,
        characters,
        showFooter,
        isFullscreen,
        isCodeViewMode,
        cmTextAreaRef,
        editorStyle,
        setContent
      };
    }
  });
</script>

<style lang="less">
  @import '../styles/editor.less';
  @import '../styles/command-button.less';
</style>
