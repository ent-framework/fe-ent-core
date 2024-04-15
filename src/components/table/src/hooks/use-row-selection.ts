import { computed, reactive, unref, watch } from 'vue';
import { omit } from 'lodash-es';
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

  // watch(
  //   () => unref(selectedRowKeysRef),
  //   () => {
  //     nextTick(() => {
  //       const { rowSelection } = unref(propsRef);
  //       if (rowSelection) {
  //         const { onChange } = rowSelection;
  //         if (onChange && isFunction(onChange)) onChange(getSelectRowKeys(), getSelectRows());
  //       }
  //       emit('selection-change', {
  //         keys: getSelectRowKeys(),
  //         rows: getSelectRows(),
  //       });
  //     });
  //   },
  //   { deep: true },
  // );
  function setSelectedRowKeys(
    keys: DataTableRowKey[],
    rows?: Recordable[],
    meta?: { row: Recordable | undefined; action: 'check' | 'uncheck' | 'checkAll' | 'uncheckAll' },
  ) {
    checkState.keys = keys;
    checkState.rows = rows || [];
    emit('update:checked-row-keys', keys, rows, meta);
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
