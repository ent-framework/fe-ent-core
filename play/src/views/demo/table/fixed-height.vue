<template>
  <div class="p-4">
    <EntTable @register="registerTable">
      <template #name>
        <span>
          姓名
          <EntHelp class="ml-2" text="姓名" />
        </span>
      </template>
      <template #address>
        地址
        <FormOutlined class="ml-2" />
      </template>
    </EntTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTable, useTable } from 'fe-ent-core/lib/components/table';
  import { getCustomHeaderColumns } from './table-data';
  import { FormOutlined } from '@ant-design/icons-vue';
  import { demoListApi } from '/@/api/table';
  import { EntHelp } from 'fe-ent-core/lib/components/basic';

  export default defineComponent({
    components: { EntTable, FormOutlined, EntHelp },
    setup() {
      const [registerTable] = useTable({
        title: '定高/头部自定义',
        api: demoListApi,
        columns: getCustomHeaderColumns(),
        canResize: false,
        scroll: { y: 100 },
      });

      return {
        registerTable,
      };
    },
  });
</script>
