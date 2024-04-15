import { isBoolean } from '../../../utils';
import type { BasicColumn } from '../../../components/table/interface';

export function isIfShow(column: BasicColumn): boolean {
  const ifShow = column.ifShow;

  let isIfShow = true;

  if (isBoolean(ifShow)) {
    isIfShow = ifShow;
  }
  if (ifShow !== undefined && typeof ifShow === 'function') {
    isIfShow = ifShow(column);
  }
  return isIfShow;
}
