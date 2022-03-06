import { useAppProviderContext } from '@ent-core/components/Application';
import { computed, unref } from 'vue';

export function useAppInject() {
  const values = useAppProviderContext();

  return {
    getIsMobile: computed(() => unref(values.isMobile)),
  };
}