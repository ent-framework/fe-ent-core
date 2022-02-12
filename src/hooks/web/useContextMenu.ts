import { onUnmounted, getCurrentInstance } from 'vue';
import { createContextMenu, destroyContextMenu } from 'fe-ent-core/components/ContextMenu';
import type { ContextMenuItem } from 'fe-ent-core/components/ContextMenu';
export type { ContextMenuItem };
export function useContextMenu(authRemove = true) {
  if (getCurrentInstance() && authRemove) {
    onUnmounted(() => {
      destroyContextMenu();
    });
  }
  return [createContextMenu, destroyContextMenu];
}
