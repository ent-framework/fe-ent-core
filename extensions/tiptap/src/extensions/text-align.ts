import TiptapTextAlign from '@tiptap/extension-text-align';
import CommandButton from '../components/menu-commands/command-button.vue';
import alignLeft from '../components/icons/icon-align-left.vue';
import alignCenter from '../components/icons/icon-align-center.vue';
import alignRight from '../components/icons/icon-align-right.vue';
import alignJustify from '../components/icons/icon-align-justify.vue';
import type { Editor } from '@tiptap/core';
import type { TextAlignOptions } from '@tiptap/extension-text-align';

export interface CustomTextAlignOptions extends TextAlignOptions {
  bubble: boolean;
}

const getIcon = (alignment: string) => {
  switch (alignment) {
    case 'left':
      return alignLeft;
    case 'center':
      return alignCenter;
    case 'right':
      return alignRight;
    case 'justify':
      return alignJustify;
  }
  return alignLeft;
};

const TextAlign = TiptapTextAlign.extend<CustomTextAlignOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: ['', '', '', ''],
      types: ['heading', 'paragraph', 'list_item', 'title'],
      button({
        editor,
        extension,
        t,
      }: {
        editor: Editor;
        extension: any;
        t: (...args: any[]) => string;
      }) {
        return extension.options.alignments.reduce((acc: any[], alignment: string) => {
          return acc.concat({
            component: CommandButton,
            componentProps: {
              command: () => {
                if (editor.isActive({ textAlign: alignment })) {
                  editor.commands.unsetTextAlign();
                } else {
                  editor.commands.setTextAlign(alignment);
                }
              },
              isActive: alignment === 'left' ? false : editor.isActive({ textAlign: alignment }),
              icon: getIcon(`${alignment}`),
              buttonIcon: extension.options.buttonIcon?.[acc.length],
              tooltip: t(`editor.extensions.TextAlign.buttons.align_${alignment}.tooltip`),
            },
          });
        }, []);
      },
    };
  },
});

export default TextAlign;
