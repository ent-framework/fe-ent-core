<template>
  <NDatePicker v-bind="getBindValue" />
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { NDatePicker } from 'naive-ui';

  export default defineComponent({
    name: 'WeekPicker',
    extends: NDatePicker,
    inheritAttrs: false,
    setup(props, { attrs }) {
      const getBindValue = computed(() => ({
        ...props,
        ...attrs,
        type: 'week',
      }));

      return {
        getBindValue,
      };
    },
  });
</script>
