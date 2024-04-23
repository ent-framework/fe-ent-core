import { unref } from 'vue';
import { isFunction, isString } from '../../../../utils/is';
import type { ComputedRef, HTMLAttributes } from 'vue';
import type { BasicTableProps } from '../types/table';
import type { EmitType, Recordable } from '../../../../types';
import type { CreateRowKey } from 'naive-ui/es/data-table/src/interface';
import type { DataTableRowKey } from 'naive-ui';

interface CustomRowContext {
  setSelectedRowKeys: (
    keys: DataTableRowKey[],
    rows: Recordable[],
    meta: { row: Recordable | undefined; action: 'check' | 'uncheck' | 'checkAll' | 'uncheckAll' },
  ) => void;
  getSelectRows: () => Recordable[];
  getSelectRowKeys: () => DataTableRowKey[];
  clearSelectedRowKeys: () => void;
  emit: EmitType;
}

function getKey(record: Recordable, rowKey?: CreateRowKey) {
  if (isString(rowKey)) {
    return record[rowKey];
  }
  if (isFunction(rowKey)) {
    return rowKey(record);
  }
  return null;
}

export function useCustomRow(
  propsRef: ComputedRef<BasicTableProps>,
  {
    setSelectedRowKeys,
    getSelectRows,
    getSelectRowKeys,
    clearSelectedRowKeys,
    emit,
  }: CustomRowContext,
) {
  const customRow = (record: Recordable, index: number): HTMLAttributes => {
    return {
      onClick: (e: Event) => {
        e?.stopPropagation();
        function handleClick() {
          const { rowSelection, rowKey, clickToRowSelect } = unref(propsRef);
          if (!rowSelection || !clickToRowSelect) return;
          const keys = getSelectRowKeys() || [];
          const key = getKey(record, rowKey);
          const rows = getSelectRows() || [];
          if (!key) return;

          // 找到tr
          const tr: HTMLElement = (e as MouseEvent)
            .composedPath?.()
            .find((dom: HTMLElement) => dom.tagName === 'TR') as HTMLElement;
          if (!tr) return;

          const self = (e as MouseEvent)
            .composedPath?.()
            .find(
              (dom: HTMLElement) =>
                dom.tagName === 'TD' && dom.className.includes('n-data-table-td--selection'),
            ) as HTMLElement;
          // 点击的是选择框，跳过事件处理
          if (self) {
            return;
          }

          const actionOrExpandColumn = (e as MouseEvent)
            .composedPath?.()
            .find(
              (dom: HTMLElement) =>
                dom.tagName === 'DIV' &&
                (dom.className.includes('ent-basic-table-action') ||
                  dom.className.includes('n-data-table-expand-trigger')),
            ) as HTMLElement;
          // 点击了操作列,展开列不触发
          if (actionOrExpandColumn) {
            return;
          }

          const switchColumn = (e as MouseEvent)
            .composedPath?.()
            .find(
              (dom: HTMLElement) => dom.tagName === 'DIV' && dom.className.includes('n-switch'),
            ) as HTMLElement;
          // switch 操作列，待补充，不触发
          if (switchColumn) {
            return;
          }

          const isCheckbox = rowSelection.type === 'checkbox';
          if (isCheckbox) {
            const disabled = tr.querySelector(
              'td.n-data-table-td--selection .n-checkbox--disabled',
            );
            if (disabled) {
              return;
            }
            if (!keys.includes(key)) {
              setSelectedRowKeys([...keys, key], [...rows, record], {
                row: record,
                action: 'check',
              });
              return;
            }
            const keyIndex = keys.indexOf(key);
            keys.splice(keyIndex, 1);
            const rowIndex = rows.indexOf(record);
            rows.splice(rowIndex, 1);
            setSelectedRowKeys(keys, rows, {
              row: record,
              action: 'uncheck',
            });
            return;
          }

          const isRadio = rowSelection.type === 'radio';
          if (isRadio) {
            const disabled = tr.querySelector('td.n-data-table-td--selection .n-radio--disabled');
            if (disabled) {
              return;
            }

            if (!keys.includes(key)) {
              if (keys.length) {
                clearSelectedRowKeys();
              }
              setSelectedRowKeys([key], [record], { row: record, action: 'check' });
              return;
            }
            clearSelectedRowKeys();
          }
        }
        handleClick();
        emit('row-click', record, index, e);
      },
      onDblclick: (event: Event) => {
        emit('row-dbClick', record, index, event);
      },
      onContextmenu: (event: Event) => {
        emit('row-contextmenu', record, index, event);
      },
      onMouseenter: (event: Event) => {
        emit('row-mouseenter', record, index, event);
      },
      onMouseleave: (event: Event) => {
        emit('row-mouseleave', record, index, event);
      },
    };
  };

  return {
    customRow,
  };
}
