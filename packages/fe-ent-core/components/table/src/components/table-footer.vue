<template>
  <Table
    v-if="summaryFunc || summaryData"
    :show-header="false"
    :bordered="false"
    :pagination="false"
    :data-source="getDataSource"
    :row-key="(r) => r[rowKey]"
    :columns="getColumns"
    table-layout="fixed"
    :scroll="scroll"
  />
</template>
<script lang="ts">
  import { computed, defineComponent, toRaw, unref } from 'vue';
  import { Table } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';
  import { isFunction } from '@ent-core/utils/is';
  import { propTypes } from '@ent-core/utils/prop-types';
  import { INDEX_COLUMN_FLAG } from '../const';
  import { useTableContext } from '../hooks/use-table-context';
  import type { Fn, Recordable } from '@ent-core/types';
  import type { BasicColumn } from '../types/table';
  import type { PropType } from 'vue';

  const SUMMARY_ROW_KEY = '_row';
  const SUMMARY_INDEX_KEY = '_index';
  export default defineComponent({
    name: 'BasicTableFooter',
    components: { Table },
    props: {
      summaryFunc: {
        type: Function as PropType<Fn>,
      },
      summaryData: {
        type: Array as PropType<Recordable[]>,
      },
      scroll: {
        type: Object as PropType<Recordable>,
      },
      rowKey: propTypes.string.def('key'),
    },
    setup(props) {
      const table = useTableContext();

      const getDataSource = computed((): Recordable[] => {
        const { summaryFunc, summaryData } = props;
        if (summaryData?.length) {
          summaryData.forEach((item, i) => (item[props.rowKey] = `${i}`));
          return summaryData;
        }
        if (!isFunction(summaryFunc)) {
          return [];
        }
        let dataSource = toRaw(unref(table.getDataSource()));
        if (summaryFunc) {
          dataSource = summaryFunc(dataSource);
        }

        dataSource.forEach((item, i) => {
          item[props.rowKey] = `${i}`;
        });
        return dataSource;
      });

      const getColumns = computed(() => {
        const dataSource = unref(getDataSource);
        const columns: BasicColumn[] = cloneDeep(table.getColumns());
        const index = columns.findIndex((item) => item.flag === INDEX_COLUMN_FLAG);
        const hasRowSummary = dataSource.some((item) => Reflect.has(item, SUMMARY_ROW_KEY));
        const hasIndexSummary = dataSource.some((item) => Reflect.has(item, SUMMARY_INDEX_KEY));

        if (index !== -1) {
          if (hasIndexSummary) {
            columns[index].customRender = ({ record }) => record[SUMMARY_INDEX_KEY];
            columns[index].ellipsis = false;
          } else {
            Reflect.deleteProperty(columns[index], 'customRender');
          }
        }

        if (table.getRowSelection() && hasRowSummary) {
          const isFixed = columns.some((col) => col.fixed === 'left');
          columns.unshift({
            width: 60,
            title: 'selection',
            key: 'selectionKey',
            align: 'center',
            ...(isFixed ? { fixed: 'left' } : {}),
            customRender: ({ record }) => record[SUMMARY_ROW_KEY],
          });
        }
        return columns;
      });
      return { getColumns, getDataSource };
    },
  });
</script>
