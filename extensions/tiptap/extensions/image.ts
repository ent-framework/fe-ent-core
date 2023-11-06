import { VueNodeViewRenderer } from '@tiptap/vue-3';
import TiptapImage from '@tiptap/extension-image';
import InsertImageCommandButton from '../components/menu-commands/image/insert-image-command-button.vue';
import ImageView from '../components/extension-views/image-view.vue';
import { ImageDisplay } from '../utils/image';
import { DEFAULT_IMAGE_DISPLAY, DEFAULT_IMAGE_URL_REGEX, DEFAULT_IMAGE_WIDTH } from '../constants';
import type { ImageOptions } from '@tiptap/extension-image';
import type { Editor } from '@tiptap/core';

interface CustomImageOptions extends ImageOptions {
  defaultWidth: number | null;
  draggable: boolean;
}
const Image = TiptapImage.extend<CustomImageOptions>({
  // https://github.com/ueberdosis/tiptap/issues/1206
  inline() {
    return true;
  },

  group() {
    return 'inline';
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: this.options.defaultWidth,
        parseHTML: (element) => {
          const width = element.style.width || element.getAttribute('width') || null;
          return width == null ? null : Number.parseInt(width, 10);
        },
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
          };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => {
          const height = element.style.height || element.getAttribute('height') || null;
          return height == null ? null : Number.parseInt(height, 10);
        },
        renderHTML: (attributes) => {
          return {
            height: attributes.height,
          };
        },
      },
      display: {
        default: DEFAULT_IMAGE_DISPLAY,
        parseHTML: (element) => {
          const { cssFloat, display } = element.style;
          let dp = element.getAttribute('data-display') || element.getAttribute('display');
          if (dp) {
            dp = /(inline|block|left|right)/.test(dp) ? dp : ImageDisplay.INLINE;
          } else if (cssFloat === 'left' && !display) {
            dp = ImageDisplay.FLOAT_LEFT;
          } else if (cssFloat === 'right' && !display) {
            dp = ImageDisplay.FLOAT_RIGHT;
          } else if (!cssFloat && display === 'block') {
            dp = ImageDisplay.BREAK_TEXT;
          } else {
            dp = ImageDisplay.INLINE;
          }

          return dp;
        },
        renderHTML: (attributes) => {
          return {
            'data-display': attributes.display,
          };
        },
      },
      draggable: {
        default: this.options.draggable,
      },
    };
  },

  addOptions(): any {
    return {
      ...this.parent?.(),
      inline: true,
      buttonIcon: '',
      defaultWidth: DEFAULT_IMAGE_WIDTH,
      uploadRequest: null,
      urlPattern: DEFAULT_IMAGE_URL_REGEX,
      draggable: false,
      button({
        editor,
        extension,
      }: {
        editor: Editor;
        extension: any;
        t: (...args: any[]) => string;
      }) {
        return {
          component: InsertImageCommandButton,
          componentProps: {
            editor,
            buttonIcon: extension.options.buttonIcon,
          },
        };
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageView);
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ];
  },
});

export default Image;
