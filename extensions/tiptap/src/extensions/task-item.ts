import { VueNodeViewRenderer } from '@tiptap/vue-3';
import { mergeAttributes } from '@tiptap/core';
import TiptapTaskItem from '@tiptap/extension-task-item';
import TaskItemView from '../components/extension-views/task-item-view.vue';

const TaskItem = TiptapTaskItem.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      done: {
        default: false,
        keepOnSplit: false,
        parseHTML: (element) => element.getAttribute('data-done') === 'true',
        renderHTML: (attributes) => ({
          'data-done': attributes.done
        })
      }
    };
  },

  renderHTML(element) {
    const { done } = element.node.attrs;
    return [
      'li',
      mergeAttributes(this.options.HTMLAttributes, element.HTMLAttributes, {
        'data-type': this.name
      }),
      // el-checkbox dom
      [
        'span',
        {
          contenteditable: 'false'
        },
        [
          'span',
          {
            class: `el-checkbox ${done ? 'is-checked' : ''}`,
            style: 'pointer-events: none;'
          },
          [
            'span',
            { class: `el-checkbox__input ${done ? 'is-checked' : ''}` },
            ['span', { class: 'el-checkbox__inner' }]
          ]
        ]
      ],
      ['div', { class: 'todo-content' }, 0]
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(TaskItemView);
  }
});

export default TaskItem;
