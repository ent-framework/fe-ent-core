<template>
  <div class="p-4">
    <ent-table
      title="定高/头部自定义"
      :api="demoListApi"
      :columns="columns"
      :can-resize="false"
      :row-key="(record) => record.id"
    >
      <template #name>
        <span>
          姓名
          <ent-help class="ml-2" text="姓名" />
        </span>
      </template>
      <template #address>
        地址
        <FormOutlined class="ml-2" />
      </template>
    </ent-table>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { getCustomHeaderColumns } from './table-data';
  import { FormOutlined } from '@ant-design/icons-vue';
  import { demoListApi } from '/@/api/table';
  import type { BasicTableProps } from 'fe-ent-core/es/components/table';

  export default defineComponent({
    components: { FormOutlined },
    setup() {
      // const tableProps = ref<BasicTableProps>({
      //   title: '定高/头部自定义',
      //   api: demoListApi,
      //   columns: getCustomHeaderColumns(),
      //   canResize: false,
      //   rowKey: (record) => record.id
      //   // scroll: { y: 100 },
      // });

      return {
        demoListApi,
        columns: getCustomHeaderColumns()
      };
    }
  });
</script>
