import { getMarkRange } from '@tiptap/core';
import TiptapLink from '@tiptap/extension-link';
import { Plugin, TextSelection } from 'prosemirror-state';
import AddLinkCommandButton from '../components/menu-commands/link/add-link-command-button.vue';
import type { LinkOptions } from '@tiptap/extension-link';
import type { EditorView } from 'prosemirror-view';
import type { Editor } from '@tiptap/core';

export interface CustomLinkOptions extends LinkOptions {
  bubble: boolean;
  addLinkPlaceholder: string;
  editLinkPlaceholder: string;
}

const Link = TiptapLink.extend<CustomLinkOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      buttonIcon: '',
      addLinkPlaceholder: '',
      editLinkPlaceholder: '',
      button({
        editor,
        extension
      }: {
        editor: Editor;
        extension: any;
        t: (...args: any[]) => string;
      }) {
        return {
          component: AddLinkCommandButton,
          componentProps: {
            editor,
            buttonIcon: extension.options.buttonIcon,
            placeholder: extension.options.addLinkPlaceholder
          }
        };
      }
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleClick(view: EditorView, pos: number) {
            const { schema, doc, tr } = view.state;

            const range = getMarkRange(doc.resolve(pos), schema.marks.link);

            if (!range) return false;

            const $start = doc.resolve(range.from);
            const $end = doc.resolve(range.to);

            const transaction = tr.setSelection(new TextSelection($start, $end));

            view.dispatch(transaction);
            return true;
          }
        }
      })
    ];
  }
});

export default Link;
