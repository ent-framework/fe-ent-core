import TiptapCodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import CommandButton from '../components/menu-commands/command-button.vue';
import svg from '../components/icons/icon-code.vue';
import type { Editor } from '@tiptap/core';

export default TiptapCodeBlockLowlight.extend({
  name: 'codeBlockLowlight',
  addOptions() {
    return {
      ...this.parent?.(),
      lowlight: {},
      defaultLanguage: null,
      buttonIcon: '',
      commandList: [
        {
          title: 'codeBlockLowlight',
          command: ({ editor, range }: any) => {
            editor.chain().focus().deleteRange(range).run();
            editor.chain().focus().toggleCodeBlock().run();
          },
          disabled: false,
          isActive(editor: Editor) {
            return editor.isActive('codeBlockLowlight');
          }
        }
      ],
      button({
        editor,
        extension,
        t
      }: {
        editor: Editor;
        extension: any;
        t: (...args: any[]) => string;
      }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleCodeBlock();
            },
            buttonIcon: extension.options.buttonIcon,
            isActive: editor.isActive('codeBlockLowlight'),
            icon: svg,
            tooltip: t('editor.extensions.CodeBlock.tooltip')
          }
        };
      }
    };
  }
});
