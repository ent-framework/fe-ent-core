import { computed, unref } from 'vue';
import { useAppProviderContext } from '@ent-core/components/application';

export function useAppInject() {
  const values = useAppProviderContext();

  return {
    getIsMobile: computed(() => unref(values.isMobile)),
  };
}
