import TiptapTaskList from '@tiptap/extension-task-list';
import CommandButton from '../components/menu-commands/command-button.vue';
import svg from '../icons/tasks.svg';
import TaskItem from './task-item';
import type { Editor } from '@tiptap/core';

import type { TaskListOptions } from '@tiptap/extension-task-list';

interface CustomTaskListOptions extends TaskListOptions {
  bubble: boolean;
}

const TaskList = TiptapTaskList.extend<CustomTaskListOptions>({
  addOptions() {
    return {
      buttonIcon: '',
      ...this.parent?.(),
      commandList: [
        {
          title: 'taskList',
          command: ({ editor, range }: any) => {
            editor.chain().focus().deleteRange(range).run();
            editor.chain().focus().toggleTaskList().run();
          },
          disabled: false,
          isActive(editor: Editor) {
            return editor.isActive('taskList');
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
              editor.commands.toggleTaskList();
            },
            isActive: editor.isActive('taskList'),
            buttonIcon: extension.options.buttonIcon,
            icon: svg,
            tooltip: t('editor.extensions.TodoList.tooltip'),
          },
        };
      },
    };
  },

  addExtensions() {
    return [TaskItem];
  },
});

export default TaskList;
