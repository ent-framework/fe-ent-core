import { computed, ref, unref, watch } from 'vue';
import { isBoolean } from '../../../../utils/is';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../const';
import type { ComputedRef } from 'vue';
import type { BasicTableProps } from '../types/table';
import type { PaginationProps } from 'naive-ui';

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref<PaginationProps>({});
  const show = ref(true);

  watch(
    () => unref(refProps).pagination,
    (pagination) => {
      if (!isBoolean(pagination) && pagination) {
        configRef.value = {
          ...unref(configRef),
          ...(pagination ?? {})
        };
      }
    }
  );

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
