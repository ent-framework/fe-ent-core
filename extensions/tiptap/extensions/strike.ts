import TiptapStrike from '@tiptap/extension-strike';
import CommandButton from '../components/menu-commands/command-button.vue';
import svg from '../icons/strikethrough.svg';
import type { Editor } from '@tiptap/core';
import type { StrikeOptions } from '@tiptap/extension-strike';

interface CustomStrikeOptions extends StrikeOptions {
  bubble: boolean;
}
const Strike = TiptapStrike.extend<CustomStrikeOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: '',
      commandList: [
        {
          title: 'strike',
          command: ({ editor, range }: any) => {
            editor.chain().focus().deleteRange(range).run();
            editor.chain().focus().toggleStrike().run();
          },
          disabled: false,
          isActive(editor: Editor) {
            return editor.isActive('strike');
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
              editor.commands.toggleStrike();
            },
            buttonIcon: extension.options.buttonIcon,
            isActive: editor.isActive('strike'),
            icon: svg,
            tooltip: t('editor.extensions.Strike.tooltip'),
          },
        };
      },
    };
  },
});

export default Strike;
