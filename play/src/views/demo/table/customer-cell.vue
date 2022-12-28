<template>
  <div class="p-4">
    <EntTable @register="registerTable">
      <template #id="{ record }"> ID: {{ record.id }} </template>
      <template #no="{ record }">
        <Tag color="green">
          {{ record.no }}
        </Tag>
      </template>
      <template #avatar="{ record }">
        <Avatar :size="60" :src="record.avatar" />
      </template>
      <template #img="{ text }">
        <EntTableImg :size="60" :simpleShow="true" :imgList="text" />
      </template>
      <template #imgs="{ text }"> <EntTableImg :size="60" :imgList="text" /> </template>

      <template #category="{ record }">
        <Tag color="green">
          {{ record.no }}
        </Tag>
      </template>
    </EntTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntTable, useTable, BasicColumn, EntTableImg } from 'fe-ent-core/lib/components/table';
  import { Tag, Avatar } from 'ant-design-vue';
  import { demoListApi } from '/@/api/table';
  const columns: BasicColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 100,
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: 80,
      align: 'center',
      defaultHidden: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '图片列表1',
      dataIndex: 'imgArr',
      helpMessage: ['这是简单模式的图片列表', '只会显示一张在表格中', '但点击可预览多张图片'],
      width: 140,
    },
    {
      title: '照片列表2',
      dataIndex: 'imgs',
      width: 160,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
    },
  ];
  export default defineComponent({
    components: { EntTable, EntTableImg, Tag, Avatar },
    setup() {
      const [registerTable] = useTable({
        title: '自定义列内容',
        titleHelpMessage: '表格中所有头像、图片均为mock生成，仅用于演示图片占位',
        api: demoListApi,
        columns: columns,
        bordered: true,
        showTableSetting: true,
      });

      return {
        registerTable,
      };
    },
  });
</script>
