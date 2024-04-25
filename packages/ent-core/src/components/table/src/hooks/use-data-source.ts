import { computed, onMounted, ref, unref, watch, watchEffect } from 'vue';
import { get, merge } from 'lodash-es';
import { useTimeoutFn } from '../../../../hooks/core/use-timeout';
import { isBoolean, isFunction, isObject } from '../../../../utils/is';
import { FETCH_SETTING, PAGE_SIZE } from '../const';
import type { ComputedRef, Ref } from 'vue';
import type { DataTableRowKey, DataTableSortState, PaginationProps } from 'naive-ui';
import type { BasicTableProps, FetchParams, FetchRequestParams } from '../types/table';
import type { EmitType, Recordable } from '../../../../types';

interface ActionType {
  getPaginationInfo: ComputedRef<boolean | PaginationProps>;
  setPagination: (info: Partial<PaginationProps>) => void;
  setLoading: (loading: boolean) => void;
  getFieldsValue: () => Recordable;
  clearSelectedRowKeys: () => void;
  tableData: Ref<Recordable[]>;
}

export function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  {
    getPaginationInfo,
    setPagination,
    setLoading,
    getFieldsValue,
    clearSelectedRowKeys,
    tableData
  }: ActionType,
  emit: EmitType
) {
  const dataSourceRef = ref<Recordable[]>([]);
  const rawDataSourceRef = ref<Recordable>({});

  watchEffect(() => {
    tableData.value = unref(dataSourceRef);
  });

  watch(
    () => unref(propsRef).data,
    () => {
      const { data, api } = unref(propsRef);
      !api && data && (dataSourceRef.value = data);
    },
    {
      immediate: true
    }
  );

  function handleTableChange({ pagination, filterInfo, sorter }: FetchParams) {
    const { clearSelectOnPageChange, sortFn, filterFn } = unref(propsRef);
    if (clearSelectOnPageChange) {
      clearSelectedRowKeys();
    }
    setPagination(pagination);

    const params: FetchParams = { pagination, filterInfo, sorter };
    if (sorter && typeof sortFn === 'function') {
      params.sorter = sortFn(sorter);
    }

    if (filterInfo && typeof filterFn === 'function') {
      params.filterInfo = filterFn(filterInfo);
    }
    fetch(params);
  }

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef);
    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef);
    }
    return unref(dataSourceRef);
  });

  async function updateTableData(index: number, key: string, value: any) {
    const record = dataSourceRef.value[index];
    if (record) {
      dataSourceRef.value[index][key] = value;
    }
    return dataSourceRef.value[index];
  }

  function updateTableDataRecord(
    rowKey: string | number,
    record: Recordable
  ): Recordable | undefined {
    const row = findTableDataRecord(rowKey);

    if (row) {
      for (const field in row) {
        if (Reflect.has(record, field)) row[field] = record[field];
      }
      return row;
    }
  }

  function deleteTableDataRecord(rowKey: DataTableRowKey | DataTableRowKey[]) {
    if (!dataSourceRef.value || dataSourceRef.value.length == 0) return;
    const { rowKey: rowKeyName } = unref(propsRef);
    if (!rowKeyName) return;
    const rowKeys = !Array.isArray(rowKey) ? [rowKey] : rowKey;

    function deleteRow(data, key) {
      const row: { index: number; data: [] } = findRow(data, key);
      if (row === null || row.index === -1) {
        return;
      }
      row.data.splice(row.index, 1);

      function findRow(data, key) {
        if (data === null || data === undefined) {
          return null;
        }
        for (let i = 0; i < data.length; i++) {
          const row = data[i];
          let targetKeyName: DataTableRowKey = '';
          if (rowKeyName && typeof rowKeyName === 'function') {
            targetKeyName = rowKeyName(row);
          }
          if (targetKeyName === key) {
            return { index: i, data };
          }
          if (row.children?.length > 0) {
            const result = findRow(row.children, key);
            if (result != null) {
              return result;
            }
          }
        }
        return null;
      }
    }

    for (const key of rowKeys) {
      deleteRow(dataSourceRef.value, key);
      deleteRow(unref(propsRef).data, key);
    }
    setPagination({
      itemCount: unref(propsRef).data?.length
    });
  }

  function insertTableDataRecord(
    record: Recordable | Recordable[],
    index: number
  ): Recordable[] | undefined {
    // if (!dataSourceRef.value || dataSourceRef.value.length == 0) return;
    index = index ?? dataSourceRef.value?.length;
    const _record = isObject(record) ? [record as Recordable] : (record as Recordable[]);
    unref(dataSourceRef).splice(index, 0, ..._record);
    return unref(dataSourceRef);
  }

  function findTableDataRecord(rowKey: string | number) {
    if (!dataSourceRef.value || dataSourceRef.value.length == 0) return;
    const { rowKey: rowKeyName } = unref(propsRef);
    if (!rowKeyName) return;

    const { childrenKey = 'children' } = unref(propsRef);

    const findRow = (array: any[]) => {
      let ret;
      array.some(function iter(r) {
        if (typeof rowKeyName === 'function') {
          if ((rowKeyName(r) as string) === rowKey) {
            ret = r;
            return true;
          }
        } else {
          if (Reflect.has(r, rowKeyName) && r[rowKeyName] === rowKey) {
            ret = r;
            return true;
          }
        }
        return r[childrenKey] && r[childrenKey].some(iter);
      });
      return ret;
    };

    // const row = dataSourceRef.value.find(r => {
    //   if (typeof rowKeyName === 'function') {
    //     return (rowKeyName(r) as string) === rowKey
    //   } else {
    //     return Reflect.has(r, rowKeyName) && r[rowKeyName] === rowKey
    //   }
    // })
    return findRow(dataSourceRef.value);
  }

  async function fetch(opt?: FetchParams) {
    const {
      api,
      searchInfo,
      defSort,
      fetchSetting,
      beforeFetch,
      afterFetch,
      useSearchForm,
      pagination,
      handleSearchInfoFn
    } = unref(propsRef);
    if (!api || !isFunction(api)) return;
    try {
      setLoading(true);
      const { pageField, sizeField, listField, totalField } = Object.assign(
        {},
        FETCH_SETTING,
        fetchSetting
      );
      // 后端对分页参数的要求不一样，从配置中读取，重新组装pagination 参数
      let pageParams: Recordable = {};

      const { page = 1, pageSize = PAGE_SIZE } = unref(getPaginationInfo) as PaginationProps;

      if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
        pageParams = {};
      } else {
        pageParams[pageField] = (opt && opt.pagination.page) || page;
        pageParams[sizeField] = pageSize;
      }

      let searchForm = useSearchForm ? getFieldsValue() : {};
      if (useSearchForm && handleSearchInfoFn && isFunction(handleSearchInfoFn)) {
        searchForm = handleSearchInfoFn(searchForm) || searchForm;
      }
      const fetchRequestParams: FetchRequestParams = {
        pagination: pageParams,
        searchForm,
        sorter: { ...defSort, ...(opt?.sorter ?? {}) } as DataTableSortState,
        filterInfo: opt?.filterInfo
      };

      let params: Recordable = {};
      if (beforeFetch && isFunction(beforeFetch)) {
        params = (await beforeFetch(fetchRequestParams)) || {};
      } else {
        params = merge(
          fetchRequestParams.pagination,
          fetchRequestParams.searchForm,
          searchInfo,
          fetchRequestParams.filterInfo
        );
      }

      const res = await api(params);
      rawDataSourceRef.value = res;

      const isArrayResult = Array.isArray(res);

      let resultItems: Recordable[] = isArrayResult ? res : get(res, listField);
      const resultTotal: number = isArrayResult ? res.length : get(res, totalField);

      // 假如数据变少，导致总页数变少并小于当前选中页码，通过getPaginationRef获取到的页码是不正确的，需获取正确的页码再次执行
      if (Number(resultTotal)) {
        const currentTotalPage = Math.ceil(resultTotal / pageSize);
        if (page > currentTotalPage) {
          setPagination({
            page: currentTotalPage
          });
          return await fetch(opt);
        }
      }

      if (afterFetch && isFunction(afterFetch)) {
        resultItems = (await afterFetch(resultItems)) || resultItems;
      }
      dataSourceRef.value = resultItems;
      setPagination({
        itemCount: resultTotal || 0
      });
      if (opt && opt.pagination.page) {
        setPagination({
          page: opt.pagination.page || 1
        });
      }
      emit('fetch-success', {
        items: unref(resultItems),
        total: resultTotal
      });
      return resultItems;
    } catch (error) {
      emit('fetch-error', error);
      dataSourceRef.value = [];
      setPagination({
        itemCount: 0
      });
    } finally {
      setLoading(false);
    }
  }

  function setTableData<T = Recordable>(values: T[]) {
    dataSourceRef.value = values as Recordable[];
  }

  function getDataSource<T = Recordable>() {
    return getDataSourceRef.value as T[];
  }

  function getRawDataSource<T = Recordable>() {
    return rawDataSourceRef.value as T;
  }

  async function reload(opt?: FetchParams) {
    return fetch(opt);
  }

  onMounted(() => {
    useTimeoutFn(() => {
      unref(propsRef).immediate && fetch();
    }, 16);
  });

  return {
    getDataSourceRef,
    getDataSource,
    getRawDataSource,
    setTableData,
    fetch,
    reload,
    updateTableData,
    updateTableDataRecord,
    deleteTableDataRecord,
    insertTableDataRecord,
    findTableDataRecord,
    handleTableChange
  };
}
