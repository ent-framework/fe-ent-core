import { tryOnMounted, tryOnUnmounted } from '@vueuse/core';
import { useDebounceFn } from '@vueuse/core';

interface WindowSizeOptions {
  wait?: number;
  once?: boolean;
  immediate?: boolean;
  listenerOptions?: AddEventListenerOptions | boolean;
}

export function useWindowSizeFn(fn: AnyFunction, options: WindowSizeOptions = {}) {
  const { wait = 150, immediate } = options;
  let handler = () => {
    fn();
  };
  const handleSize = useDebounceFn(handler, wait);
  handler = handleSize;

  const start = () => {
    if (immediate) {
      handler();
    }
    window.addEventListener('resize', handler);
  };

  const stop = () => {
    window.removeEventListener('resize', handler);
  };

  tryOnMounted(() => {
    start();
  });

  tryOnUnmounted(() => {
    stop();
  });
  return [start, stop];
}
