<template>
  <NTreeSelect v-bind="getAttrs" :loading="loading" @update:value="handleChange">
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}" />
    </template>
  </NTreeSelect>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref, unref, watch } from 'vue';
  import { NTreeSelect } from 'naive-ui';
  import { get } from 'lodash-es';
  import { isArray, isFunction } from '@ent-core/utils/is';
  import { propTypes } from '@ent-core/utils/prop-types';
  import { type Recordable } from '@ent-core/types';
  import type { PropType } from 'vue';
  export default defineComponent({
    name: 'ApiTreeSelect',
    components: { NTreeSelect },
    props: {
      api: { type: Function as PropType<(arg?: Recordable<any>) => Promise<Recordable<any>>> },
      params: { type: Object },
      immediate: { type: Boolean, default: true },
      resultField: propTypes.string.def(''),
    },
    emits: ['options-change', 'change'],
    setup(props, { attrs, emit }) {
      const treeData = ref<Recordable<any>[]>([]);
      const isFirstLoaded = ref<boolean>(false);
      const loading = ref(false);
      const getAttrs = computed(() => {
        return {
          ...(props.api ? { options: unref(treeData) } : {}),
          ...attrs,
        };
      });

      function handleChange(...args) {
        emit('change', ...args);
      }

      watch(
        () => props.params,
        () => {
          !unref(isFirstLoaded) && fetch();
        },
        { deep: true },
      );

      watch(
        () => props.immediate,
        (v) => {
          v && !isFirstLoaded.value && fetch();
        },
      );

      onMounted(() => {
        props.immediate && fetch();
      });

      async function fetch() {
        const { api } = props;
        if (!api || !isFunction(api)) return;
        loading.value = true;
        treeData.value = [];
        let result;
        try {
          result = await api(props.params);
        } catch (e) {
          console.error(e);
        }
        loading.value = false;
        if (!result) return;
        if (!isArray(result)) {
          result = get(result, props.resultField);
        }
        treeData.value = (result as Recordable<any>[]) || [];
        isFirstLoaded.value = true;
        emit('options-change', treeData.value);
      }
      return { getAttrs, loading, handleChange };
    },
  });
</script>
