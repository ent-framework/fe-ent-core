<template>
  <div style="width: 100%">
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
        <Divider v-if="$slots.toolbar && showTableSetting" type="vertical" />
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
  import { Divider } from 'ant-design-vue';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import TableSettingComponent from './settings/index.vue';
  import TableTitle from './table-title.vue';
  import type { PropType } from 'vue';
  import type { ColumnChangeParam, TableSetting } from '../types/table';

  export default defineComponent({
    name: 'BasicTableHeader',
    components: {
      Divider,
      TableTitle,
      TableSetting: TableSettingComponent,
    },
    props: {
      title: {
        type: [Function, String] as PropType<string | ((data) => string)>,
      },
      tableSetting: {
        type: Object as PropType<TableSetting>,
      },
      showTableSetting: {
        type: Boolean,
      },
      titleHelpMessage: {
        type: [String, Array] as PropType<string | string[]>,
        default: '',
      },
    },
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
