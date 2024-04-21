<template>
  <div :class="`${prefixCls}`">
    <div class="flex items-center">
      <slot v-if="$slots.tableTitle" name="tableTitle" />
      <TableTitle
        v-if="!$slots.tableTitle && title"
        :help-message="titleHelpMessage"
        :title="title"
      />
      <div :class="`${prefixCls}__top`">
        <template v-if="$slots.headerTop">
          <slot name="headerTop" />
        </template>
        <NAlert v-else-if="getSelectedKey.length > 0" type="info" :show-icon="false">
          <span>已选中{{ getSelectedKey.length }}条记录(可跨页)</span>
          <ent-button type="link" size="tiny" @click="clearSelected">清空</ent-button>
        </NAlert>
      </div>
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
  import { computed, defineComponent } from 'vue';
  import { NAlert, NDivider } from 'naive-ui';
  import { useDesign } from '../../../../hooks';
  import { tableHeaderProps } from '../props';
  import { useTableContext } from '../hooks/use-table-context';
  import TableSettingComponent from './settings/index.vue';
  import TableTitle from './table-title.vue';
  import type { ColumnChangeParam } from '../types/table';

  export default defineComponent({
    name: 'BasicTableHeader',
    components: {
      NDivider,
      NAlert,
      TableTitle,
      TableSetting: TableSettingComponent,
    },
    props: tableHeaderProps,
    emits: ['columns-change'],
    setup(_, { emit }) {
      const table = useTableContext();
      const { prefixCls } = useDesign('basic-table-header');
      function handleColumnChange(data: ColumnChangeParam[]) {
        emit('columns-change', data);
      }
      const getSelectedKey = computed(() => {
        return table.getSelectRowKeys();
      });

      function clearSelected() {
        table.clearSelectedRowKeys();
      }

      return { prefixCls, handleColumnChange, getSelectedKey, clearSelected };
    },
  });
</script>
