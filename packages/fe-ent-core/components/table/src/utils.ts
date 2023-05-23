import { isFunction } from '@vueuse/shared';
import { isBoolean } from '@ent-core/utils';
import type { BasicColumn } from '@ent-core/components';

export function isIfShow(column: BasicColumn): boolean {
  const ifShow = column.ifShow;

  let isIfShow = true;

  if (isBoolean(ifShow)) {
    isIfShow = ifShow;
  }
  if (isFunction(ifShow)) {
    isIfShow = ifShow(column);
  }
  return isIfShow;
}
