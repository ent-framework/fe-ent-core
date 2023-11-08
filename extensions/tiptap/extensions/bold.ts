import TiptapBold from '@tiptap/extension-bold';
import CommandButton from '../components/menu-commands/command-button.vue';
import svg from '../icons/bold.svg';
import type { Editor } from '@tiptap/core';
import type { BoldOptions } from '@tiptap/extension-bold';
export interface CustomBoldOptions extends BoldOptions {
  bubble: boolean;
}
const Bold = TiptapBold.extend<CustomBoldOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: '',
      commandList: [
        {
          title: 'bold',
          command: ({ editor, range }: any) => {
            editor.chain().focus().deleteRange(range).toggleBold().run();
          },
          disabled: false,
          isActive(editor: Editor) {
            return editor.isActive('bold');
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
              editor.commands.toggleBold();
            },
            buttonIcon: extension.options.buttonIcon,
            isActive: editor.isActive('bold'),
            icon: svg,
            tooltip: t('editor.extensions.Bold.tooltip'),
          },
        };
      },
    };
  },
});

export default Bold;
