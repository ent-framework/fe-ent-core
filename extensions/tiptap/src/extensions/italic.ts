import TiptapItalic from '@tiptap/extension-italic';
import CommandButton from '../components/menu-commands/command-button.vue';
import svg from '../components/icons/icon-italic.vue';
import type { Editor } from '@tiptap/core';
import type { ItalicOptions } from '@tiptap/extension-italic';

interface CustomItalicOptions extends ItalicOptions {
  bubble: boolean;
}

const Italic = TiptapItalic.extend<CustomItalicOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: '',
      commandList: [
        {
          title: 'italic',
          command: ({ editor, range }: any) => {
            editor.chain().focus().deleteRange(range).run();
            editor.chain().focus().toggleItalic().run();
          },
          disabled: false,
          isActive(editor: Editor) {
            return editor.isActive('italic');
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
              editor.commands.toggleItalic();
            },
            isActive: editor.isActive('italic'),
            icon: svg,
            buttonIcon: extension.options.buttonIcon,
            tooltip: t('editor.extensions.Italic.tooltip')
          }
        };
      }
    };
  }
});

export default Italic;
