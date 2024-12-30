<template>
  <NCascader
    v-model:value="state"
    :options="options"
    :load-data="loadData"
    change-on-select
    :display-render="handleRenderDisplay"
    @update:value="handleChange"
  >
    <template v-if="loading" #suffixIcon>
      <EntIcon icon="ant-design:loading-outlined" />
    </template>
    <template v-if="loading" #notFoundContent>
      <span>
        <EntIcon icon="ant-design:loading-outlined" />
        {{ t('component.form.apiSelectNotFound') }}
      </span>
    </template>
  </NCascader>
</template>
<script lang="ts">
import type {PropType} from 'vue';
import {defineComponent, ref, unref, watch, watchEffect} from 'vue';
import {NCascader} from 'naive-ui';
import {get, omit} from 'lodash-es';
import {EntIcon} from '../../../icon';
import {isFunction} from '../../../../utils/is';
import {useI18n, useRuleFormItem} from '../../../../hooks';
import {type Recordable} from '../../../../types';

interface Option {
    value: string;
    label: string;
    loading?: boolean;
    isLeaf?: boolean;
    children?: Option[];
  }
  export default defineComponent({
    name: 'ApiCascader',
    components: {
      NCascader,
      EntIcon
    },
    props: {
      value: {
        type: Array
      },
      api: {
        type: Function as PropType<(arg?: Recordable<any>) => Promise<Option[]>>,
        default: null
      },
      numberToString: {
        type: Boolean,
        default: false
      },
      resultField: {
        type: String,
        default: ''
      },
      labelField: {
        type: String,
        default: 'label'
      },
      valueField: {
        type: String,
        default: 'value'
      },
      childrenField: {
        type: String,
        default: 'children'
      },
      asyncFetchParamKey: {
        type: String,
        default: 'parentCode'
      },
      immediate: {
        type: Boolean,
        default: true
      },
      // init fetch params
      initFetchParams: {
        type: Object as PropType<Recordable<any>>,
        default: () => ({})
      },
      // 是否有下级，默认是
      isLeaf: {
        type: Function as PropType<(arg: Recordable<any>) => boolean>,
        default: null
      },
      displayRenderArray: {
        type: Array
      }
    },
    emits: ['change', 'defaultChange'],
    setup(props, { emit }) {
      const apiData = ref<any[]>([]);
      const options = ref<Option[]>([]);
      const loading = ref<boolean>(false);
      const emitData = ref<any[]>([]);
      const isFirstLoad = ref(true);
      const { t } = useI18n();
      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);

      watch(
        apiData,
        (data) => {
          const opts = generatorOptions(data);
          options.value = opts;
        },
        { deep: true }
      );

      function generatorOptions(options: any[]): Option[] {
        const { labelField, valueField, numberToString, childrenField, isLeaf } = props;
        return options.reduce((prev, next: Recordable<any>) => {
          if (next) {
            const value = next[valueField];
            const item = {
              ...omit(next, [labelField, valueField]),
              label: next[labelField],
              value: numberToString ? `${value}` : value,
              isLeaf: isLeaf && typeof isLeaf === 'function' ? isLeaf(next) : false
            };
            const children = Reflect.get(next, childrenField);
            if (children) {
              Reflect.set(item, childrenField, generatorOptions(children));
            }
            prev.push(item);
          }
          return prev;
        }, [] as Option[]);
      }

      async function initialFetch() {
        const api = props.api;
        if (!api || !isFunction(api)) return;
        apiData.value = [];
        loading.value = true;
        try {
          const res = await api(props.initFetchParams);
          if (Array.isArray(res)) {
            apiData.value = res;
            return;
          }
          if (props.resultField) {
            apiData.value = get(res, props.resultField) || [];
          }
        } catch (error) {
          console.error(error);
        } finally {
          loading.value = false;
        }
      }

      async function loadData(selectedOptions: Option[]) {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        const api = props.api;
        if (!api || !isFunction(api)) return;
        try {
          const res = await api({
            [props.asyncFetchParamKey]: Reflect.get(targetOption, 'value')
          });
          if (Array.isArray(res)) {
            targetOption.children = generatorOptions(res);
            return;
          }
          if (props.resultField) {
            targetOption.children = generatorOptions(get(res, props.resultField) || []);
          }
        } catch (e) {
          console.error(e);
        } finally {
          targetOption.loading = false;
        }
      }

      watchEffect(() => {
        props.immediate && initialFetch();
      });

      watch(
        () => props.initFetchParams,
        () => {
          !unref(isFirstLoad) && initialFetch();
        },
        { deep: true }
      );

      function handleChange(keys, args) {
        emitData.value = args;
        emit('defaultChange', keys, args);
      }

      function handleRenderDisplay({ labels, selectedOptions }) {
        if (unref(emitData).length === selectedOptions.length) {
          return labels.join(' / ');
        }
        if (props.displayRenderArray) {
          return props.displayRenderArray.join(' / ');
        }
        return '';
      }

      return {
        state,
        options,
        loading,
        t,
        handleChange,
        loadData,
        handleRenderDisplay
      };
    }
  });
</script>
