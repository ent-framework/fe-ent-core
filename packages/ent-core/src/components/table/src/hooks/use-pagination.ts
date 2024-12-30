import { computed, ref, unref, watch } from 'vue';
import { isBoolean } from '../../../../utils/is';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../const';
import type { ComputedRef } from 'vue';
import type { BasicTableProps } from '../types/table';
import type { PaginationProps } from 'naive-ui';

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const show = ref(true);
  const uncontrolledCurrentPageRef = ref<number>(1);
  const uncontrolledPageSizeRef = ref<number>(PAGE_SIZE);
  const uncontrolledTotalItemRef = ref<number>(0);

  watch(
    () => unref(refProps).pagination,
    (pagination) => {
      if (!isBoolean(pagination) && pagination) {
        console.log('pagination is changed');
        const { page, pageSize, itemCount } = pagination;
        uncontrolledCurrentPageRef.value = page || 1;
        uncontrolledPageSizeRef.value = pageSize || PAGE_SIZE;
        uncontrolledTotalItemRef.value = itemCount || 0;
      }
    }
  );

  const getPaginationInfo = computed((): PaginationProps | false => {
    const { pagination } = unref(refProps);

    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false;
    }

    return {
      page: unref(uncontrolledCurrentPageRef),
      pageSize: unref(uncontrolledPageSizeRef),
      //      size: 'small',
      showSizePicker: true,
      pageSizes: PAGE_SIZE_OPTIONS,
      showQuickJumper: true,
      itemCount: unref(uncontrolledTotalItemRef),
      ...pagination
    } as PaginationProps;
  });

  function setPage(page: number) {
    uncontrolledCurrentPageRef.value = page;
  }

  function setPageSize(pageSize: number) {
    uncontrolledPageSizeRef.value = pageSize;
  }

  function setTotalRows(total: number) {
    uncontrolledTotalItemRef.value = total;
  }

  function getPagination() {
    return unref(getPaginationInfo);
  }

  function getShowPagination() {
    return unref(show);
  }

  async function setShowPagination(flag: boolean) {
    show.value = flag;
  }

  return {
    getPagination,
    getPaginationInfo,
    setShowPagination,
    getShowPagination,
    setPage,
    setPageSize,
    setTotalRows
  };
}
