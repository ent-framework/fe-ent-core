import TiptapHighlight from '@tiptap/extension-highlight';
import HighlightPopover from '../components/menu-commands/highlight-popover.vue';
import { COLOR_SET } from '../utils/color';
import type { Editor } from '@tiptap/core';

const Highlight = TiptapHighlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: '',
      multicolor: true,
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
          component: HighlightPopover,
          componentProps: {
            editor,
            buttonIcon: extension.options.buttonIcon,
          },
        };
      },
    };
  },
});

export default Highlight;
