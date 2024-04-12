<template>
  <div :class="`${prefixCls}`">
    <div v-if="$slots.headerTop" style="margin: 5px">
      <slot name="headerTop" />
    </div>
    <div class="flex items-center">
      <slot v-if="$slots.tableTitle" name="tableTitle" />
      <TableTitle
        v-if="!$slots.tableTitle && title"
        :help-message="titleHelpMessage"
        :title="title"
      />
      <div :class="`${prefixCls}__toolbar`">
        <slot name="toolbar" />
        <NDivider v-if="$slots.toolbar && showTableSetting" :vertical="true" />
        <TableSetting
          v-if="showTableSetting"
          :setting="tableSetting"
          @columns-change="handleColumnChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NDivider } from 'naive-ui';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { tableHeaderProps } from '../props';
  import TableSettingComponent from './settings/index.vue';
  import TableTitle from './table-title.vue';
  import type { ColumnChangeParam } from '../types/table';

  export default defineComponent({
    name: 'BasicTableHeader',
    components: {
      NDivider,
      TableTitle,
      TableSetting: TableSettingComponent,
    },
    props: tableHeaderProps,
    emits: ['columns-change'],
    setup(_, { emit }) {
      const { prefixCls } = useDesign('basic-table-header');
      function handleColumnChange(data: ColumnChangeParam[]) {
        emit('columns-change', data);
      }
      return { prefixCls, handleColumnChange };
    },
  });
</script>
