import { nextTick, unref } from 'vue';
import type { Ref } from 'vue';
import sortablejs from 'sortablejs';
import type Sortable from 'sortablejs';

export function useSortable(el: HTMLElement | Ref<HTMLElement>, options?: Sortable.Options) {
  function initSortable() {
    nextTick(async () => {
      if (!el) return;
      //防止生成dts时报错
      //@ts-ignore
      (sortablejs.default || sortablejs).create(unref(el), {
        animation: 500,
        delay: 400,
        delayOnTouchOnly: true,
        ...options,
      });
    });
  }

  return { initSortable };
}
