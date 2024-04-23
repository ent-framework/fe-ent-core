import TiptapOrderedList from '@tiptap/extension-ordered-list';
import CommandButton from '../components/menu-commands/command-button.vue';
import svg from '../components/icons/icon-list-ol.vue';
import ListItem from './list-item';
import type { Editor } from '@tiptap/core';
import type { OrderedListOptions } from '@tiptap/extension-ordered-list';

interface CustomOrderedListOptions extends OrderedListOptions {
  bubble: boolean;
}

const OrderedList = TiptapOrderedList.extend<CustomOrderedListOptions>({
  nessesaryExtensions: [ListItem],
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: '',
      commandList: [
        {
          title: 'orderedList',
          command: ({ editor, range }: any) => {
            editor.chain().focus().deleteRange(range).run();
            editor.chain().focus().toggleOrderedList().run();
          },
          disabled: false,
          isActive(editor: Editor) {
            return editor.isActive('orderedList');
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
              editor.commands.toggleOrderedList();
            },
            buttonIcon: extension.options.buttonIcon,
            isActive: editor.isActive('orderedList'),
            icon: svg,
            tooltip: t('editor.extensions.OrderedList.tooltip')
          }
        };
      }
    };
  }
});

export default OrderedList;
