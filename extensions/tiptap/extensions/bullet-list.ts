import TiptapBulletList from '@tiptap/extension-bullet-list';
import CommandButton from '../components/menu-commands/command-button.vue';
import ListItem from './list-item';
import type { Editor } from '@tiptap/core';

const BulletList = TiptapBulletList.extend({
  nessesaryExtensions: [ListItem],
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: '',
      commandList: [
        {
          title: 'bulletList',
          command: ({ editor, range }: any) => {
            editor.chain().focus().deleteRange(range).run();
            editor.chain().focus().toggleBulletList().run();
          },
          disabled: false,
          isActive(editor: Editor) {
            return editor.isActive('bulletList');
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
              editor.commands.toggleBulletList();
            },
            buttonIcon: extension.options.buttonIcon,
            isActive: editor.isActive('bulletList'),
            icon: 'list-ul',
            tooltip: t('editor.extensions.BulletList.tooltip'),
          },
        };
      },
    };
  },
});

export default BulletList;
