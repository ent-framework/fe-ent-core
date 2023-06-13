import { computed, unref } from 'vue';

import { useRouter } from 'vue-router';
import { useLayoutStore } from '../store/layout';

/**
 * @description: Full screen display content
 */
export const useFullContent = () => {
  const layoutStore = useLayoutStore();
  const router = useRouter();
  const { currentRoute } = router;

  // Whether to display the content in full screen without displaying the menu
  const getFullContent = computed(() => {
    // Query parameters, the full screen is displayed when the address bar has a full parameter
    const route = unref(currentRoute);
    const query = route.query;
    if (query && Reflect.has(query, '__full__')) {
      return true;
    }
    // Return to the configuration in the configuration file
    return layoutStore.getLayoutConfig.fullContent;
  });

  return { getFullContent };
};
