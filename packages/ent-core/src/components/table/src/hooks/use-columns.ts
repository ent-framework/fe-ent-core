import { computed, ref, toRaw, unref, watch } from 'vue';
import { cloneDeep, get, isEqual } from 'lodash-es';
import { useI18n, usePermission } from '../../../../hooks';
import { isArray, isBoolean, isString } from '../../../../utils/is';
import { ACTION_COLUMN_FLAG, DEFAULT_ALIGN, INDEX_COLUMN_FLAG, PAGE_SIZE } from '../const';
import type { ComputedRef, Ref } from 'vue';
import type {
  DataTableColumn,
  DataTableExpandColumn,
  DataTableRowKey,
  DataTableSelectionColumn,
  PaginationProps
} from 'naive-ui';
import type { BasicColumn, BasicTableProps, GetColumnsParams } from '../types/table';

function handleItem(item: BasicColumn, ellipsis: boolean) {
  const { key } = item;
  item.align = item.align || DEFAULT_ALIGN;
  if (ellipsis) {
    if (!key) {
      item.key = key as string;
    }
    if (!isBoolean(item.ellipsis)) {
      Object.assign(item, {
        ellipsis
      });
    }
  }
  if (item.key && isString(key) && (item.key as string).indexOf('.') > 0 && !item.render) {
    Object.assign(item, {
      render: (record) => {
        return get(record, key);
      }
    });
  }
}

function handleIndexColumn(
  propsRef: ComputedRef<BasicTableProps>,
  getPaginationRef: ComputedRef<boolean | PaginationProps>,
  columns: DataTableColumn[]
) {
  const { t } = useI18n();

  const { showIndexColumn, indexColumnProps = {}, isTreeTable } = unref(propsRef);

  let pushIndexColumns = false;
  if (unref(isTreeTable)) {
    return;
  }
  columns.forEach(() => {
    const indIndex = columns.findIndex(
      (column) => (column as BasicColumn).key === INDEX_COLUMN_FLAG
    );
    if (showIndexColumn) {
      pushIndexColumns = indIndex === -1;
    } else if (!showIndexColumn && indIndex !== -1) {
      columns.splice(indIndex, 1);
    }
  });

  if (!pushIndexColumns) return;

  const isFixedLeft = columns.some((item) => item.fixed === 'left');

  columns.unshift({
    key: INDEX_COLUMN_FLAG,
    title: t('component.table.index'),
    align: 'center',
    render: (rowData, index) => {
      const getPagination = unref(getPaginationRef);
      if (isBoolean(getPagination)) {
        return `${index + 1}`;
      }
      const { page = 1, pageSize = PAGE_SIZE } = getPagination;
      return ((page < 1 ? 1 : page) - 1) * pageSize + index + 1;
    },
    ...(isFixedLeft
      ? {
          fixed: 'left'
        }
      : {}),
    ...indexColumnProps
  });
}

function handleActionColumn(propsRef: ComputedRef<BasicTableProps>, columns: DataTableColumn[]) {
  const { actionColumn } = unref(propsRef);
  if (!actionColumn) return;

  const hasIndex = columns.findIndex(
    (column) => (column as BasicColumn).key === ACTION_COLUMN_FLAG
  );
  if (hasIndex === -1) {
    columns.push({
      ...columns[hasIndex],
      fixed: 'right',
      ...actionColumn,
      key: ACTION_COLUMN_FLAG
    } as BasicColumn);
  }
}

function handleRowSelectionColumn(
  propsRef: ComputedRef<BasicTableProps>,
  columns: DataTableColumn[]
) {
  const { rowSelection, selectionColumn = {} } = unref(propsRef);
  if (!rowSelection) return;
  columns.unshift({
    ...selectionColumn,
    key: ACTION_COLUMN_FLAG,
    type: 'selection',
    multiple: rowSelection.type === 'checkbox',
    fixed: 'left'
  } as DataTableSelectionColumn);
}

function handleExpandColumn(propsRef: ComputedRef<BasicTableProps>, columns: DataTableColumn[]) {
  const { expandColumn } = unref(propsRef);
  if (!expandColumn) return;
  columns.unshift({
    ...expandColumn,
    type: 'expand'
  } as DataTableExpandColumn);
}

function isBaseColumn(column: DataTableColumn) {
  return !Reflect.has(column, 'type');
}

export function useColumns(
  propsRef: ComputedRef<BasicTableProps>,
  getPaginationRef: ComputedRef<false | PaginationProps>
) {
  const columnsRef = ref(unref(propsRef).columns) as Ref<DataTableColumn[]>;
  let cacheColumns =
    (unref(propsRef).columns?.filter((item) => isBaseColumn(item)) as BasicColumn[]) ?? [];

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));

    handleIndexColumn(propsRef, getPaginationRef, columns);
    handleActionColumn(propsRef, columns);
    handleExpandColumn(propsRef, columns);
    handleRowSelectionColumn(propsRef, columns);
    if (!columns) {
      return [];
    }
    const { ellipsis } = unref(propsRef);

    columns.forEach((item) => {
      if (isBaseColumn(item)) {
        const baseColumn = item as BasicColumn;
        const { render } = baseColumn;

        handleItem(
          baseColumn,
          Reflect.has(baseColumn, 'ellipsis') ? !!baseColumn.ellipsis : !!ellipsis && !render
        );
      }
    });
    return columns;
  });

  function isIfShow(column: BasicColumn): boolean {
    const ifShow = column.ifShow;

    let isIfShow = true;

    if (isBoolean(ifShow)) {
      isIfShow = ifShow;
    }
    if (ifShow && typeof ifShow === 'function') {
      isIfShow = ifShow(column);
    }
    return isIfShow;
  }
  const { hasPermission } = usePermission();

  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef));
    const columns = cloneDeep(viewColumns);
    return columns.filter((column) => {
      const isBase = isBaseColumn(column);
      if (isBase) {
        const baseColumn = column as BasicColumn;
        return hasPermission(baseColumn.auth) && isIfShow(baseColumn);
      }
      return true;
    });
  });

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns as DataTableColumn[];
      cacheColumns =
        (columns?.filter((item) => {
          return isBaseColumn(item);
        }) as BasicColumn[]) ?? [];
    }
  );

  function setCacheColumnsByField(dataIndex: string | undefined, value: Partial<DataTableColumn>) {
    if (!dataIndex || !value) {
      return;
    }
    cacheColumns.forEach((item) => {
      if (isBaseColumn(item)) {
        const baseItem = item as BasicColumn;
        if (baseItem.key === dataIndex) {
          Object.assign(baseItem, value);
          return;
        }
      }
    });
  }
  /**
   * set columns
   * @param columnList key｜column
   */
  function setColumns(columnList: BasicColumn[] | DataTableRowKey[]) {
    const columns = cloneDeep(columnList);
    if (!isArray(columns)) return;

    if (columns.length <= 0) {
      columnsRef.value = [];
      return;
    }

    const firstColumn = columns[0];

    const cacheKeys = cacheColumns
      .filter((item) => {
        return isBaseColumn(item);
      })
      .map((item) => {
        return (item as BasicColumn).key;
      });

    if (!isString(firstColumn) && !isArray(firstColumn)) {
      columnsRef.value = columns as BasicColumn[];
    } else {
      const columnKeys = (columns as (string | string[])[]).map((m) => m.toString());
      const newColumns: BasicColumn[] = [];
      cacheColumns.forEach((item) => {
        newColumns.push({
          ...item,
          defaultHidden: !columnKeys.includes(item.key as string)
        } as BasicColumn);
      });
      // Sort according to another array
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return (
            columnKeys.indexOf(prev.key?.toString() as string) -
            columnKeys.indexOf(next.key?.toString() as string)
          );
        });
      }
      columnsRef.value = newColumns;
    }
  }

  function getColumns(opt?: GetColumnsParams): BasicColumn[] {
    const { ignoreIndex, ignoreAction, sort } = opt || {};
    let columns = toRaw(unref(getColumnsRef));
    if (ignoreIndex) {
      columns = columns.filter((item) => {
        if (isBaseColumn(item)) {
          return (item as BasicColumn).key !== INDEX_COLUMN_FLAG;
        }
        return true;
      });
    }
    if (ignoreAction) {
      columns = columns.filter((item) => {
        if (isBaseColumn(item)) {
          return (item as BasicColumn).key !== ACTION_COLUMN_FLAG;
        }
        return true;
      });
    }
    if (sort) {
      columns = sortFixedColumn(columns);
    }
    return columns as BasicColumn[];
  }
  function getCacheColumns() {
    return cacheColumns;
  }
  function setCacheColumns(columns: BasicColumn[]) {
    if (!isArray(columns)) return;
    cacheColumns = columns.filter((item) => isBaseColumn(item));
  }

  return {
    getColumnsRef,
    getCacheColumns,
    getColumns,
    setColumns,
    getViewColumns,
    setCacheColumnsByField,
    setCacheColumns
  };
}
function sortFixedColumn(columns: DataTableColumn[]) {
  const fixedLeftColumns: DataTableColumn[] = [];
  const fixedRightColumns: DataTableColumn[] = [];
  const defColumns: DataTableColumn[] = [];
  for (const column of columns) {
    if (column.fixed === 'left') {
      fixedLeftColumns.push(column);
      continue;
    }
    if (column.fixed === 'right') {
      fixedRightColumns.push(column);
      continue;
    }
    defColumns.push(column);
  }
  return [...fixedLeftColumns, ...defColumns, ...fixedRightColumns].filter((item) => {
    if (isBaseColumn(item)) {
      return !(item as BasicColumn).defaultHidden;
    }
    return true;
  });
}
