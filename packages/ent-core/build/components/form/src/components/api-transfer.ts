
  import { computed, defineComponent, ref, unref, watch, watchEffect } from 'vue';
  import { NTransfer, transferProps } from 'naive-ui';
  import { get, omit } from 'lodash-es';
  import { isFunction } from '../../../../utils/is';
  import { useI18n } from '../../../../hooks';
  import type { PropType } from 'vue';
  import type { ValueAtom } from '../../../../types';
  import type { TransferOption } from 'naive-ui';

  export default defineComponent({
    name: 'ApiTransfer',
    components: { NTransfer },
    props: {
      ...transferProps,
      value: { type: Array as PropType<Array<ValueAtom>> },
      api: {
        type: Function as PropType<(arg) => Promise<TransferOption[]>>,
        default: null
      },
      params: { type: Object },
      dataSource: { type: Array as PropType<Array<TransferOption>> },
      immediate: {
        type: Boolean,
        default: true
      },
      alwaysLoad: {
        type: Boolean,
        default: false
      },
      afterFetch: { type: Function },
      resultField: {
        type: String,
        default: ''
      },
      labelField: {
        type: String,
        default: 'title'
      },
      valueField: {
        type: String,
        default: 'key'
      },
      showSearch: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      filterOption: {
        type: Function as PropType<(inputValue: string, item: TransferOption) => boolean>
      },
      selectedKeys: { type: Array as PropType<Array<string>> },
      showSelectAll: { type: Boolean, default: false },
      targetKeys: { type: Array as PropType<Array<string>> }
    },
    emits: ['options-change', 'change'],
    setup(props, { attrs, emit }) {
      const _dataSource = ref<TransferOption[]>([]);
      const _targetKeys = ref<ValueAtom[]>([]);
      const { t } = useI18n();

      const getAttrs = computed(() => {
        return {
          ...(!props.api ? { dataSource: unref(_dataSource) } : {}),
          ...attrs
        };
      });
      const getdataSource = computed(() => {
        const { labelField, valueField } = props;

        return unref(_dataSource).reduce((prev, next) => {
          if (next) {
            prev.push({
              ...omit(next, [labelField, valueField]),
              label: next[labelField],
              value: next[valueField]
            });
          }
          return prev;
        }, [] as TransferOption[]);
      });
      const getTargetKeys = computed<ValueAtom[]>(() => {
        if (unref(_targetKeys).length > 0) {
          return unref(_targetKeys);
        }
        if (Array.isArray(props.value)) {
          return props.value;
        }
        if (Array.isArray(props.targetKeys)) {
          return props.targetKeys;
        }
        return [];
      });

      function handleChange(keys: ValueAtom[]) {
        _targetKeys.value = keys;
        emit('change', keys);
      }

      watchEffect(() => {
        props.immediate && !props.alwaysLoad && fetch();
      });

      watch(
        () => props.params,
        () => {
          fetch();
        },
        { deep: true }
      );

      async function fetch() {
        const api = props.api;
        if (!api || !isFunction(api)) {
          if (Array.isArray(props.dataSource)) {
            _dataSource.value = props.dataSource;
          }
          return;
        }
        _dataSource.value = [];
        try {
          const res = await api(props.params);
          if (Array.isArray(res)) {
            _dataSource.value = res;
            emitChange();
            return;
          }
          if (props.resultField) {
            _dataSource.value = get(res, props.resultField) || [];
          }
          emitChange();
        } catch (error) {
          console.warn(error);
        }
      }
      function emitChange() {
        emit('options-change', unref(getdataSource));
      }
      return { getTargetKeys, getdataSource, t, getAttrs, handleChange };
    }
  });
