import { computed, onUnmounted, unref, watchEffect } from 'vue';
import { useThrottleFn } from '@vueuse/core';

import { useSessionStore } from 'fe-ent-core/es/store';
import { useLockStore } from '../store/lock';
import { useLayoutStore } from '../store/layout';

import { useLayoutThemeSetting } from './use-theme-setting';
import type { TimeoutHandle } from 'fe-ent-core/es/types';

export function useLockPage() {
  const { getLockTime } = useLayoutThemeSetting();
  const lockStore = useLockStore();
  const sessionStore = useSessionStore();
  const layoutStore = useLayoutStore();

  let timeId: TimeoutHandle;

  function clear(): void {
    window.clearTimeout(timeId);
  }

  function resetCalcLockTimeout(): void {
    // not login
    if (!sessionStore.getToken) {
      clear();
      return;
    }
    const lockTime = layoutStore.getLayoutConfig.lockTime;
    if (!lockTime || lockTime < 1) {
      clear();
      return;
    }
    clear();

    timeId = setTimeout(
      () => {
        lockPage();
      },
      lockTime * 60 * 1000
    );
  }

  function lockPage(): void {
    lockStore.setLockInfo({
      isLock: true,
      pwd: undefined
    });
  }

  watchEffect((onClean) => {
    if (sessionStore.getToken) {
      resetCalcLockTimeout();
    } else {
      clear();
    }
    onClean(() => {
      clear();
    });
  });

  onUnmounted(() => {
    clear();
  });

  const keyupFn = useThrottleFn(resetCalcLockTimeout, 2000);

  return computed(() => {
    if (unref(getLockTime)) {
      return { onKeyup: keyupFn, onMousemove: keyupFn };
    } else {
      clear();
      return {};
    }
  });
}
