import TiptapBlockquote from '@tiptap/extension-blockquote';
import CommandButton from '../components/menu-commands/command-button.vue';
import svg from '../icons/quote-right.svg';
import type { Editor } from '@tiptap/core';

export interface BlockquoteOptions {
  buttonIcon: string;
}
const Blockquote = TiptapBlockquote.extend<BlockquoteOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: '',
      commandList: [
        {
          title: 'blockquote',
          command: ({ editor, range }: any) => {
            editor.chain().focus().deleteRange(range).toggleBlockquote().run();
          },
          disabled: false,
          isActive(editor: Editor) {
            return editor.isActive('blockquote');
          },
        },
      ],
      button({
        editor,
        extension,
        t,
      }: {
        editor: Editor;
        extension: any;
        t: (...args: any[]) => string;
      }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleBlockquote();
            },
            buttonIcon: extension.options.buttonIcon,
            isActive: editor.isActive('blockquote'),
            icon: svg,
            tooltip: t('editor.extensions.Blockquote.tooltip'),
          },
        };
      },
    };
  },
});

export default Blockquote;
