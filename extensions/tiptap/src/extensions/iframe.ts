import { Node, mergeAttributes } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import IframeCommandButton from '../components/menu-commands/iframe-command-button.vue';
import IframeView from '../components/extension-views/iframe-view.vue';
import type { Editor } from '@tiptap/vue-3';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    iframe: {
      setIframe: (options: { src: string }) => ReturnType;
    };
  }
}

const Iframe = Node.create({
  name: 'iframe',

  // schema
  group: 'block',
  selectable: false,

  addAttributes() {
    return {
      ...this.parent?.(),
      src: {
        default: null,
        parseHTML: (element) => {
          return element.getAttribute('src');
        }
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe'
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'iframe',
      mergeAttributes(HTMLAttributes, {
        frameborder: 0,
        allowfullscreen: 'true'
      })
    ];
  },

  addCommands() {
    return {
      setIframe:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options
          });
        }
    };
  },

  addOptions() {
    return {
      buttonIcon: '',
      button({
        editor,
        extension
      }: {
        editor: Editor;
        extension: any;
        t: (...args: any[]) => string;
      }) {
        return {
          component: IframeCommandButton,
          componentProps: {
            editor,
            buttonIcon: extension.options.buttonIcon
          }
        };
      }
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(IframeView);
  }
});

export default Iframe;
