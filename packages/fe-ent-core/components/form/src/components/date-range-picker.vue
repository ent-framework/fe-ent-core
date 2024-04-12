<template>
  <NDatePicker v-bind="getBindValue" />
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { NDatePicker } from 'naive-ui/es/date-picker';

  export default defineComponent({
    name: 'DateRangePicker',
    extends: NDatePicker,
    inheritAttrs: false,
    setup(props, { attrs }) {
      const getBindValue = computed(() => ({
        ...props,
        ...attrs,
        type: 'daterange',
      }));

      return {
        getBindValue,
      };
    },
  });
</script>
