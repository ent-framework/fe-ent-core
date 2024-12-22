import { defineComponent as _defineComponent } from 'vue'
import { type PropType, computed, ref, useSlots, watch } from 'vue';
  import { NDropdown, NInput } from 'naive-ui';
  import { useDebounceFn } from '@vueuse/core';
  import { EntIcon } from '../../../icon';
  import { EntTitle } from '../../../basic';
  import { useI18n } from '../../../../hooks';
  import { ToolbarEnum } from '../types/tree';

  
export default /*@__PURE__*/_defineComponent({
  props: {
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Boolean,
      default: false
    },
    checkable: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    searchText: {
      type: String,
      default: ''
    },
    checkAll: {
      type: Function,
      default: undefined
    },
    expandAll: {
      type: Function,
      default: undefined
    }
  } as const,
  emits: ['change', 'search'],
  setup(__props, { expose: __expose, emit: __emit }) {
  __expose();

  const searchValue = ref('');

  const props = __props;
  const emit = __emit;

  const slots = useSlots();
  const { t } = useI18n();

  const getInputSearchCls = computed(() => {
    const titleExists = slots.headerTitle || props.title;
    return [
      'mr-1',
      'w-full',
      {
        ['ml-5']: titleExists
      }
    ];
  });

  const toolbarList = computed(() => {
    const { checkable } = props;
    const defaultToolbarList = [
      { label: t('component.tree.expandAll'), key: ToolbarEnum.EXPAND_ALL },
      {
        label: t('component.tree.unExpandAll'),
        key: ToolbarEnum.UN_EXPAND_ALL,
        divider: checkable
      }
    ];

    return checkable
      ? [
          { label: t('component.tree.selectAll'), key: ToolbarEnum.SELECT_ALL },
          {
            label: t('component.tree.unSelectAll'),
            key: ToolbarEnum.UN_SELECT_ALL,
            divider: checkable
          },
          ...defaultToolbarList
        ]
      : defaultToolbarList;
  });

  function handleMenuClick(key: string | number) {
    switch (key) {
      case ToolbarEnum.SELECT_ALL:
        props.checkAll?.(true);
        break;
      case ToolbarEnum.UN_SELECT_ALL:
        props.checkAll?.(false);
        break;
      case ToolbarEnum.EXPAND_ALL:
        props.expandAll?.(true);
        break;
      case ToolbarEnum.UN_EXPAND_ALL:
        props.expandAll?.(false);
        break;
      // CHECK_STRICTLY 选取有bug，暂时注释掉
      // case ToolbarEnum.CHECK_STRICTLY:
      //   emit('change', false);
      //   break;
      // case ToolbarEnum.CHECK_UN_STRICTLY:
      //   emit('change', true);
      //   break;
    }
  }

  function emitChange(value?: string): void {
    emit('search', value);
  }

  const debounceEmitChange = useDebounceFn(emitChange, 200);

  watch(
    () => searchValue.value,
    (v) => {
      debounceEmitChange(v);
    }
  );

  watch(
    () => props.searchText,
    (v) => {
      if (v !== searchValue.value) {
        searchValue.value = v;
      }
    }
  );

const __returned__ = { searchValue, props, emit, slots, t, getInputSearchCls, toolbarList, handleMenuClick, emitChange, debounceEmitChange, get NDropdown() { return NDropdown }, get NInput() { return NInput }, get EntIcon() { return EntIcon }, get EntTitle() { return EntTitle } }
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
return __returned__
}

})