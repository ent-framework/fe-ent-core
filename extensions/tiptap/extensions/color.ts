import TiptapColor from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { COLOR_SET } from '../utils/color';
import ColorPopover from '../components/menu-commands/color-popover.vue';
import type { Editor } from '@tiptap/core';

const Color = TiptapColor.extend({
  nessesaryExtensions: [TextStyle],
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: '',
      colors: COLOR_SET,
      button({
        editor,
        extension,
      }: {
        editor: Editor;
        extension: any;
        t: (...args: any[]) => string;
      }) {
        return {
          component: ColorPopover,
          componentProps: {
            editor,
            buttonIcon: extension.options.buttonIcon,
          },
        };
      },
    };
  },
});

export default Color;
