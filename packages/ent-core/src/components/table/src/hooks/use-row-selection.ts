import { computed, reactive, unref, watch } from 'vue';
import { omit } from 'lodash-es';
import type { InternalRowData } from 'naive-ui/es/data-table/src/interface';
import type { ComputedRef, Ref } from 'vue';
import type { BasicTableProps, TableRowSelection } from '../types/table';
import type { EmitType, Recordable } from '../../../../types';
import type { DataTableRowKey } from 'naive-ui';

export function useRowSelection(
  propsRef: ComputedRef<BasicTableProps>,
  tableData: Ref<Recordable[]>,
  emit: EmitType,
) {
  const checkState = reactive<{ keys: DataTableRowKey[]; rows: Recordable[] }>({
    keys: [],
    rows: [],
  });

  const getRowSelectionRef = computed((): TableRowSelection | null => {
    const { rowSelection } = unref(propsRef);
    if (!rowSelection) {
      return null;
    }

    return {
      selectedRowKeys: checkState.keys,
      ...omit(rowSelection, ['onChange']),
    };
  });

  watch(
    () => unref(propsRef).rowSelection?.selectedRowKeys,
    (v: DataTableRowKey[]) => {
      checkState.keys = v;
    },
  );

  function setSelectedRowKeys(
    keys: DataTableRowKey[],
    rows: InternalRowData[],
    meta: {
      row: InternalRowData | undefined;
      action: 'check' | 'uncheck' | 'checkAll' | 'uncheckAll';
    },
  ) {
    const { rowSelection } = unref(propsRef);
    const actualRows: InternalRowData[] = [];
    if (rows.length != keys.length) {
      const { rowKey } = unref(propsRef);
      if (rowKey) {
        unref(tableData).forEach((data) => {
          const keyValue = rowKey(data);
          if (keyValue && keys.includes(keyValue)) {
            actualRows.push(data);
          }
        });
      }
    } else if (rows.length > 0) {
      actualRows.push(...rows);
    }
    checkState.rows = actualRows;
    if (rowSelection?.onChange) {
      rowSelection.onChange(keys, actualRows, meta);
    }
    emit('update:checked-row-keys', keys, actualRows, meta);
  }

  function setSelectedRows(rows: Recordable[]) {
    checkState.rows = rows;
  }

  function clearSelectedRowKeys() {
    checkState.keys = [];
    checkState.rows = [];
  }

  function getSelectRowKeys() {
    return checkState.keys;
  }

  function getSelectRows() {
    // const ret = toRaw(unref(selectedRowRef)).map((item) => toRaw(item));
    return checkState.rows;
  }

  function getRowSelection() {
    return unref(getRowSelectionRef)!;
  }

  return {
    checkState,
    getRowSelection,
    getRowSelectionRef,
    getSelectRows,
    getSelectRowKeys,
    setSelectedRowKeys,
    clearSelectedRowKeys,
    setSelectedRows,
  };
}
