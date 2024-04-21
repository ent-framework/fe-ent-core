<template>
  <div class="p-4">
    <ent-table @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import type { BasicColumn } from 'fe-ent-core/es/components/table/interface';
  import { useTable } from 'fe-ent-core/es/components/table';
  import { demoListApi } from '/@/api/table';
  const columns: BasicColumn[] = [
    {
      title: 'ID',
      key: 'id',
    },
    {
      title: '头像',
      key: 'avatar',
      width: 100,
    },
    {
      title: '分类',
      key: 'category',
      width: 80,
      align: 'center',
      defaultHidden: true,
    },
    {
      title: '姓名',
      key: 'name',
      width: 120,
    },
    {
      title: '图片列表1',
      key: 'imgArr',
      //helpMessage: ['这是简单模式的图片列表', '只会显示一张在表格中', '但点击可预览多张图片'],
      width: 140,
    },
    {
      title: '照片列表2',
      key: 'imgs',
      width: 160,
    },
    {
      title: '地址',
      key: 'address',
    },
    {
      title: '编号',
      key: 'no',
    },
    {
      title: '开始时间',
      key: 'beginTime',
    },
    {
      title: '结束时间',
      key: 'endTime',
    },
  ];
  export default defineComponent({
    setup() {
      const [registerTable] = useTable({
        title: '自定义列内容',
        titleHelpMessage: '表格中所有头像、图片均为mock生成，仅用于演示图片占位',
        api: demoListApi,
        columns,
        bordered: true,
        showTableSetting: true,
        rowKey: (record) => record.id,
      });

      return {
        registerTable,
      };
    },
  });
</script>
