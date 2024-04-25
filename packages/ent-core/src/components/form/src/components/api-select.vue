<template>
  <NSelect
    v-bind="getBindValue"
    :loading="loading"
    :remote="true"
    :options="getOptions"
    @update:show="handleFetch"
  >
    <template v-if="loading" #empty>
      <span>
        <EntIcon icon="ant-design:loading-outlined" />
        {{ t('component.form.apiSelectNotFound') }}
      </span>
    </template>
  </NSelect>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref, watch, watchEffect } from 'vue';
  import { NSelect, selectProps } from 'naive-ui';
  import { get, omit, pick } from 'lodash-es';
  import { EntIcon } from '../../../icon';
  import { isFunction } from '../../../../utils/is';
  import { useI18n } from '../../../../hooks';
  import { propTypes } from '../../../../utils';
  import type { PropType } from 'vue';

  type OptionsItem = { label: string; value: string; disabled?: boolean };

  export default defineComponent({
    name: 'ApiSelect',
    components: {
      NSelect,
      EntIcon
    },
    inheritAttrs: false,
    props: {
      ...selectProps,
      numberToString: propTypes.bool,
      api: {
        type: Function as PropType<(arg?: any) => Promise<OptionsItem[]>>,
        default: null
      },
      // api params
      params: propTypes.any.def({}),
      // support xxx.xxx.xx
      resultField: propTypes.string.def(''),
      immediate: propTypes.bool.def(true),
      alwaysLoad: propTypes.bool.def(false)
    },
    emits: ['options-change', 'change', 'update:value'],
    setup(props, { emit, attrs }) {
      const options = ref<OptionsItem[]>([]);
      const loading = ref(false);
      const isFirstLoad = ref(true);
      const { t } = useI18n();

      const getBindValue = computed(() => {
        const propsBind = omit(props, ['options', 'loading', 'onUpdate:show']);
        const propsSelect = pick(propsBind, Object.keys(selectProps));
        return {
          ...propsSelect,
          ...attrs
        };
      });

      const getOptions = computed(() => {
        return unref(options);
      });

      watchEffect(() => {
        props.immediate && !props.alwaysLoad && fetch();
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
        } catch (error: any) {
          // eslint-disable-next-line no-console
          console.warn(error);
        } finally {
          loading.value = false;
        }
      }

      async function handleFetch(visible: boolean) {
        if (visible) {
          if (props.alwaysLoad) {
            await fetch();
          } else if (!props.immediate && unref(isFirstLoad)) {
            await fetch();
            isFirstLoad.value = false;
          }
        }
      }

      function emitChange() {
        emit('options-change', unref(getOptions));
      }
      return { getBindValue, getOptions, loading, t, handleFetch };
    }
  });
</script>
