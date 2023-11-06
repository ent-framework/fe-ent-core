import EntTiptap from './components/Tiptap.vue';

import CommandButton from './components/menu-commands/command-button.vue';
import getSuggestionItems from './utils/command-items';
import renderItems from './utils/command-list';
import type { Plugin } from 'vue';

const EntTiptapPlugin: Plugin = {
  install(app) {
    app.component('EntTiptap', EntTiptap);
  },
};

export * from './extensions';

export { EntTiptapPlugin, EntTiptap, CommandButton, getSuggestionItems, renderItems };

export default EntTiptapPlugin;
