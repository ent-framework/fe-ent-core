import { computed, unref } from 'vue';
import { useAppProviderContext } from '../../components/app-provider';

export function useAppInject() {
  const values = useAppProviderContext();

  return {
    getIsMobile: computed(() => unref(values.isMobile)),
  };
}
