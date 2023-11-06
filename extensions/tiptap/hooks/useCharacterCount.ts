import { computed } from 'vue';
import type { ShallowRef } from 'vue';
import type { Editor } from '@tiptap/core';

export default function useCharacterCount(editor: ShallowRef<Editor | undefined>) {
  const characters = computed(() => {
    return editor.value?.storage.characterCount.characters();
  });

  return {
    characters,
  };
}
