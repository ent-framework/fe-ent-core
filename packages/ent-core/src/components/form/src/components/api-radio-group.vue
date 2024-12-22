<!--
 * @Description:It is troublesome to implement radio button group in the form. So it is extracted independently as a separate component
-->
<template>
  <NRadioGroup v-bind="attrs" v-model:value="state" button-style="solid">
    <template v-for="item in getOptions" :key="`${item.value}`">
      <NRadioButton
        v-if="props.isBtn"
        :value="item.value"
        :disabled="item.disabled"
        @click="handleClick(item)"
      >
        {{ item.label }}
      </NRadioButton>
      <NRadio v-else :value="item.value" :disabled="item.disabled" @click="handleClick(item)">
        {{ item.label }}
      </NRadio>
    </template>
  </NRadioGroup>
</template>
<script lang="ts">
  import { type PropType, computed, defineComponent, ref, unref, watch, watchEffect } from 'vue';
  import { NRadio, NRadioButton, NRadioGroup } from 'naive-ui';
  import { get, omit } from 'lodash-es';
  import { isFunction } from '../../../../utils/is';
  import { useAttrs, useI18n, useRuleFormItem } from '../../../../hooks';

  type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean };

  export default defineComponent({
    name: 'ApiRadioGroup',
    components: {
      NRadio,
      NRadioGroup,
      NRadioButton
    },
    props: {
      api: {
        type: Function as PropType<(arg?: any | string) => Promise<OptionsItem[]>>,
        default: null
      },
      params: {
        type: [Object, String] as PropType<any | string>,
        default: () => ({})
      },
      value: {
        type: [String, Number, Boolean] as PropType<string | number | boolean>
      },
      isBtn: {
        type: [Boolean] as PropType<boolean>,
        default: false
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
      immediate: {
        type: Boolean,
        default: true
      }
    },
    emits: ['options-change', 'change'],
    setup(props, { emit }) {
      const options = ref<OptionsItem[]>([]);
      const loading = ref(false);
      const isFirstLoad = ref(true);
      const emitData = ref<any[]>([]);
      const attrs = useAttrs();
      const { t } = useI18n();
      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props, 'value', 'update:value', emitData);

      // Processing options value
      const getOptions = computed(() => {
        const { labelField, valueField, numberToString } = props;

        return unref(options).reduce((prev, next: any) => {
          if (next) {
            const value = next[valueField];
            prev.push({
              label: next[labelField],
              value: numberToString ? `${value}` : value,
              ...omit(next, [labelField, valueField])
            });
          }
          return prev;
        }, [] as OptionsItem[]);
      });

      watchEffect(() => {
        props.immediate && fetch();
      });

      watch(
        () => props.params,
        () => {
          !unref(isFirstLoad) && fetch();
        },
        { deep: true }
      );

      async function fetch() {
        const api = props.api;
        if (!api || !isFunction(api)) return;
        options.value = [];
        try {
          loading.value = true;
          const res = await api(props.params);
          if (Array.isArray(res)) {
            options.value = res;
            emitChange();
            return;
          }
          if (props.resultField) {
            options.value = get(res, props.resultField) || [];
          }
          emitChange();
        } catch (error) {
          console.error(error);
        } finally {
          loading.value = false;
        }
      }

      function emitChange() {
        emit('options-change', unref(getOptions));
      }

      function handleClick(...args) {
        emitData.value = args;
      }

      return { state, getOptions, attrs, loading, t, handleClick, props };
    }
  });
</script>
