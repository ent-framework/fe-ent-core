import { defineComponent, h } from 'vue';

export const EditorContent = defineComponent({
  name: 'EditorContent',

  props: {
    editor: {
      default: null,
      type: Object,
    },
  },

  watch: {
    editor: {
      immediate: true,
      handler(editor) {
        if (editor && editor.options.element) {
          this.$nextTick(() => {
            this.$el.appendChild(editor.options.element.firstChild);
            editor.createNodeViews();
          });
        }
      },
    },
  },

  beforeUnmount() {
    this.editor.setOptions({
      element: this.$el,
    });
  },

  render() {
    return h('div');
  },
});
