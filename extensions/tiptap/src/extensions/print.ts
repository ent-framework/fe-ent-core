import { Extension } from '@tiptap/core';
import { printEditorContent } from '../utils/print';
import CommandButton from '../components/menu-commands/command-button.vue';
import svg from '../components/icons/icon-print.vue';
import type { Editor } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    print: {
      /**
       * print the editor content
       */
      print: () => ReturnType;
    };
  }
}

const Print = Extension.create({
  name: 'print',

  addOptions() {
    return {
      buttonIcon: '',
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
              editor.commands.print();
            },
            buttonIcon: extension.options.buttonIcon,
            icon: svg,
            tooltip: t('editor.extensions.Print.tooltip')
          }
        };
      }
    };
  },

  addCommands() {
    return {
      print:
        () =>
        ({ view }) => {
          return printEditorContent(view);
        }
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-p': () => this.editor.commands.print()
    };
  }
});

export default Print;
