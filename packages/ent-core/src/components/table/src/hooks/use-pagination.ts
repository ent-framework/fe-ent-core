import { computed, ref, unref } from 'vue';
import { isBoolean } from '../../../../utils/is';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../const';
import type { ComputedRef } from 'vue';
import type { BasicTableProps } from '../types/table';
import type { PaginationProps } from 'naive-ui';

export const getDefaultPageSize = (paginationProps: PaginationProps | false): number => {
  if (!paginationProps) return 10;
  const { defaultPageSize } = paginationProps;
  if (defaultPageSize !== undefined) return defaultPageSize;
  const pageSizeOption = paginationProps.pageSizes?.[0];
  if (typeof pageSizeOption === 'number') return pageSizeOption;
  return pageSizeOption?.value || 10;
};

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref<PaginationProps>({});
  const show = ref(true);
  // const { pagination = {} } = unref(refProps) as BasicTableProps;
  //
  // const uncontrolledCurrentPageRef = ref(pagination ? pagination.defaultPage || 1 : 1);
  // const uncontrolledPageSizeRef = ref(getDefaultPageSize(pagination));
  //
  // const controlledCurrentPageRef = computed(() => {
  //   const { pagination = {} } = unref(refProps) as BasicTableProps;
  //   if (pagination === false) return undefined;
  //   return pagination.page;
  // });
  // const controlledPageSizeRef = computed(() => {
  //   const { pagination = {} } = unref(refProps) as BasicTableProps;
  //   if (pagination === false) return undefined;
  //   return pagination.pageSize;
  // });

  // watch(
  //   () => unref(refProps).pagination,
  //   (pagination) => {
  //     if (!isBoolean(pagination) && pagination) {
  //       configRef.value = {
  //         ...unref(configRef),
  //         ...(pagination ?? {})
  //       };
  //     }
  //   }
  // );

  const getPaginationInfo = computed((): PaginationProps | false => {
    const { pagination } = unref(refProps);

    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false;
    }

    return {
      page: 1,
      pageSize: PAGE_SIZE,
      //      size: 'small',
      defaultPageSize: PAGE_SIZE,
      //      showTotal: (total) => t('component.table.total', { total }),
      showSizePicker: true,
      pageSizes: PAGE_SIZE_OPTIONS,
      showQuickJumper: true,
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef)
    } as PaginationProps;
  });

  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo);
    configRef.value = {
      ...(!isBoolean(paginationInfo) && paginationInfo ? paginationInfo : {}),
      ...info
    };
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

  return { getPagination, getPaginationInfo, setShowPagination, getShowPagination, setPagination };
}
