import { getCurrentInstance, onUnmounted } from 'vue';
import { createContextMenu, destroyContextMenu } from '../../components/context-menu';
export function useContextMenu(authRemove = true) {
  if (getCurrentInstance() && authRemove) {
    onUnmounted(() => {
      destroyContextMenu();
    });
  }
  return [createContextMenu, destroyContextMenu];
}
