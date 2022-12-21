import { BasicColumn } from '@ent-core/components';
import { isBoolean, isFunction } from '@ent-core/utils';

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
