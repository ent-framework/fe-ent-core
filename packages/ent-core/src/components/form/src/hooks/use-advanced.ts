import { computed, getCurrentInstance, shallowReactive, unref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/shared';
import { isBoolean, isNullOrUnDef, isNumber, isObject } from '../../../../utils/is';
import { useBreakpoint } from '../../../../hooks/event/use-breakpoint';
import type { ComputedRef, Ref, ShallowReactive } from 'vue';
import type { EmitType, Recordable } from '../../../../types';
import type { FormProps, FormSchema } from '../types/form';
import type { AdvanceState } from '../types/hooks';
import type { GridItemProps } from 'naive-ui/es/grid';

const BASIC_COL_LEN = 24;

interface UseAdvancedContext {
  advanceState: AdvanceState;
  emit: EmitType;
  getProps: ComputedRef<FormProps>;
  getSchema: ComputedRef<FormSchema[]>;
  formModel: Recordable;
  defaultValueRef: Ref<Recordable>;
}

export default function ({
  advanceState,
  emit,
  getProps,
  getSchema,
  formModel,
  defaultValueRef
}: UseAdvancedContext) {
  const vm = getCurrentInstance();

  const { realWidthRef, screenEnum, screenRef } = useBreakpoint();

  const getEmptySpan = computed((): number => {
    if (!advanceState.isAdvanced) {
      return 0;
    }
    // For some special cases, you need to manually specify additional blank lines
    const emptySpan = unref(getProps).emptySpan || 0;

    if (isNumber(emptySpan)) {
      return emptySpan;
    }
    if (isObject(emptySpan)) {
      const { span = 0 } = emptySpan;
      const screen = unref(screenRef) as string;

      const screenSpan = (emptySpan as any)[screen.toLowerCase()];
      return screenSpan || span || 0;
    }
    return 0;
  });

  const debounceUpdateAdvanced = useDebounceFn(updateAdvanced, 30);

  watch(
    [() => unref(getSchema), () => advanceState.isAdvanced, () => unref(realWidthRef)],
    () => {
      const { showAdvancedButton } = unref(getProps);
      if (showAdvancedButton) {
        debounceUpdateAdvanced();
      }
    },
    { immediate: true }
  );

  function getAdvanced(itemCol: Partial<GridItemProps>, itemColSum = 0, isLastAction = false) {
    const width = unref(realWidthRef);

    const mdWidth = (itemCol.span as number) || BASIC_COL_LEN;

    const lgWidth = mdWidth;
    const xlWidth = lgWidth;
    const xxlWidth = xlWidth;
    if (width <= screenEnum.LG) {
      itemColSum += mdWidth;
    } else if (width < screenEnum.XL) {
      itemColSum += lgWidth;
    } else if (width < screenEnum.XXL) {
      itemColSum += xlWidth;
    } else {
      itemColSum += xxlWidth;
    }

    if (isLastAction) {
      advanceState.hideAdvanceBtn = false;
      if (itemColSum <= BASIC_COL_LEN * 2) {
        // When less than or equal to 2 lines, the collapse and expand buttons are not displayed
        advanceState.hideAdvanceBtn = true;
        advanceState.isAdvanced = true;
      } else if (
        itemColSum > BASIC_COL_LEN * 2 &&
        itemColSum <= BASIC_COL_LEN * (unref(getProps).autoAdvancedLine || 3)
      ) {
        advanceState.hideAdvanceBtn = false;

        // More than 3 lines collapsed by default
      } else if (!advanceState.isLoad) {
        advanceState.isLoad = true;
        advanceState.isAdvanced = !advanceState.isAdvanced;
      }
      return { isAdvanced: advanceState.isAdvanced, itemColSum };
    }
    if (itemColSum > BASIC_COL_LEN * (unref(getProps).alwaysShowLines || 1)) {
      return { isAdvanced: advanceState.isAdvanced, itemColSum };
    } else {
      // The first line is always displayed
      return { isAdvanced: true, itemColSum };
    }
  }

  const fieldsIsAdvancedMap: ShallowReactive<Record<string, boolean>> = shallowReactive({});

  function updateAdvanced() {
    let itemColSum = 0;
    let realItemColSum = 0;
    const { baseGridItemProps = {} } = unref(getProps);

    for (const schema of unref(getSchema)) {
      const { show, gridItemProps } = schema;
      let isShow = true;

      if (isNullOrUnDef(show)) {
        isShow = false;
      }

      if (isBoolean(show)) {
        isShow = show;
      }

      if (show !== undefined && typeof show === 'function') {
        isShow = show({
          schema,
          model: formModel,
          field: schema.field,
          values: {
            ...unref(defaultValueRef),
            ...formModel
          }
        });
      }

      if (isShow && (gridItemProps || baseGridItemProps)) {
        const { itemColSum: sum, isAdvanced } = getAdvanced(
          { ...baseGridItemProps, ...gridItemProps },
          itemColSum
        );

        itemColSum = sum || 0;
        if (isAdvanced) {
          realItemColSum = itemColSum;
        }
        fieldsIsAdvancedMap[schema.field] = isAdvanced;
      }
    }

    // 确保页面发送更新
    vm?.proxy?.$forceUpdate();

    advanceState.actionSpan = (realItemColSum % BASIC_COL_LEN) + unref(getEmptySpan);

    getAdvanced(unref(getProps).actionColOptions || { span: BASIC_COL_LEN }, itemColSum, true);

    emit('advanced-change');
  }

  function handleToggleAdvanced() {
    advanceState.isAdvanced = !advanceState.isAdvanced;
  }

  return { handleToggleAdvanced, fieldsIsAdvancedMap };
}
