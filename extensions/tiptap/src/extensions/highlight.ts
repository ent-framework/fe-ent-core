import TiptapHighlight from '@tiptap/extension-highlight';
import HighlightPopover from '../components/menu-commands/highlight-popover.vue';
import { COLOR_SET } from '../utils/color';
import type { Editor } from '@tiptap/core';
import type { HighlightOptions } from '@tiptap/extension-highlight';

interface CustomHighlightOptions extends HighlightOptions {
  bubble: boolean;
}

const Highlight = TiptapHighlight.extend<CustomHighlightOptions>({
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
