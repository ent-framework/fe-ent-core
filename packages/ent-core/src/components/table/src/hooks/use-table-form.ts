import { computed, unref } from 'vue';
import type { ComputedRef, Slots } from 'vue';
import type { BasicTableProps, FetchParams } from '../types/table';
import type { FormProps } from '../../../form/src/types/form';
import type { Recordable } from '../../../../types';
export function useTableForm(
  propsRef: ComputedRef<BasicTableProps>,
  slots: Slots,
  fetch: (opt?: FetchParams) => Promise<Recordable[] | undefined>,
  getLoading: ComputedRef<boolean | undefined>
) {
  const getFormProps = computed((): Partial<FormProps> => {
    const { formConfig } = unref(propsRef);
    const { submitButtonOptions } = formConfig || {};
    return {
      showAdvancedButton: true,
      ...formConfig,
      showFeedback: false,
      submitButtonOptions: { loading: unref(getLoading), ...submitButtonOptions }
    };
  });

  const getFormSlotKeys: ComputedRef<string[]> = computed(() => {
    const keys = Object.keys(slots);
    return keys
      .map((item) => (item.startsWith('form-') ? item : null))
      .filter((item) => !!item) as string[];
  });

  function replaceFormSlotKey(key: string) {
    if (!key) return '';
    return key?.replace?.(/form-/, '') ?? '';
  }

  async function handleSearchInfoChange(info: Recordable) {
    // info 是 table的值，fetch 方法每次都会获取form的value，所以这里可以不用处理
    await fetch({ pagination: { page: 1 } });
  }

  return {
    getFormProps,
    replaceFormSlotKey,
    getFormSlotKeys,
    handleSearchInfoChange
  };
}
