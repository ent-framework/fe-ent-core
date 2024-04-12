<template>
  <NDatePicker type="monthrange" v-bind="$attrs" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NDatePicker } from 'naive-ui/es/date-picker';

  export default defineComponent({
    name: 'MonthRangePicker',
    extends: NDatePicker,
    inheritAttrs: false,
  });
</script>
