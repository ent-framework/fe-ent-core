<template>
  <n-data-table v-bind="tableProps" :max-height="250" :scroll-x="1800" />
</template>

<script lang="ts">
  import { defineComponent, h, ref } from 'vue';
  import { NDataTable } from 'naive-ui';
  import type { DataTableColumns } from 'naive-ui';
  import type { DataTableProps } from 'naive-ui';

  type RowData = {
    key: number;
    name: string;
    age: number;
    address: string;
    tags: string[];
  };

  const createColumns = (): DataTableColumns<RowData> => [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: 'Name',
      key: 'name',
      width: 200,
      fixed: 'left'
    },
    {
      title: 'Age',
      key: 'age',
      width: 100,
      fixed: 'left'
    },
    {
      title: 'Row',
      key: 'row',
      render(row, index) {
        return h('span', ['row ', index]);
      }
    },
    {
      title: 'Row1',
      key: 'row1',
      render(row, index) {
        return h('span', ['row ', index]);
      }
    },
    {
      title: 'Row2',
      key: 'row2',
      render(row, index) {
        return h('span', ['row ', index]);
      },
      width: 100,
      fixed: 'right'
    },
    {
      title: 'Address',
      key: 'address',
      width: 200,
      fixed: 'right'
    }
  ];

  export default defineComponent({
    components: { NDataTable },
    setup() {
      const tableProps: DataTableProps = {
        data: Array.from({ length: 46 }).map((_, index) => ({
          key: index,
          name: `Edward King ${index}`,
          age: 32,
          address: `London, Park Lane no. ${index}`
        })),
        columns: createColumns(),
        pagination: { pageSize: 10 }
      };
      return {
        tableProps,
        data: Array.from({ length: 46 }).map((_, index) => ({
          key: index,
          name: `Edward King ${index}`,
          age: 32,
          address: `London, Park Lane no. ${index}`
        })),
        columns: createColumns(),
        pagination: { pageSize: 10 }
      };
    }
  });
</script>
