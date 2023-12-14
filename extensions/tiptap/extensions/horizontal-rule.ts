import TiptapHorizontalRule from '@tiptap/extension-horizontal-rule';
import CommandButton from '../components/menu-commands/command-button.vue';
import svg from '../components/icons/icon-horizontal-rule.vue';
import type { Editor } from '@tiptap/core';
import type { HorizontalRuleOptions } from '@tiptap/extension-horizontal-rule';

interface CustomHorizontalRuleOptions extends HorizontalRuleOptions {
  bubble: boolean;
}

const HorizontalRule = TiptapHorizontalRule.extend<CustomHorizontalRuleOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: '',
      commandList: [
        {
          title: 'horizontalRule',
          command: ({ editor, range }: any) => {
            editor.chain().focus().deleteRange(range).setHorizontalRule().run();
          },
          disabled: false,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          isActive(editor: Editor) {
            return false;
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
              editor.commands.setHorizontalRule();
            },
            buttonIcon: extension.options.buttonIcon,
            icon: svg,
            tooltip: t('editor.extensions.HorizontalRule.tooltip'),
          },
        };
      },
    };
  },
});

export default HorizontalRule;
