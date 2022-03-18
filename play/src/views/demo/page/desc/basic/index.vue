<template>
  <EntPageWrapper title="基础详情页" contentBackground>
    <EntDescription
      size="middle"
      title="退款申请"
      :bordered="false"
      :column="3"
      :data="refundData"
      :schema="refundSchema"
    />
    <a-divider />
    <EntDescription
      size="middle"
      title="用户信息"
      :bordered="false"
      :column="3"
      :data="personData"
      :schema="personSchema"
    />
    <a-divider />

    <EntTable @register="registerRefundTable" />
    <a-divider />
    <EntTable @register="registerTimeTable" />
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntDescription } from 'fe-ent-core/lib/components/description';
  import { EntTable, useTable } from 'fe-ent-core/lib/components/table';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import { Divider } from 'ant-design-vue';

  import {
    refundSchema,
    refundData,
    personSchema,
    personData,
    refundTableSchema,
    refundTimeTableSchema,
    refundTableData,
    refundTimeTableData,
  } from './data';
  export default defineComponent({
    components: { EntDescription, EntTable, EntPageWrapper, [Divider.name]: Divider },
    setup() {
      const [registerRefundTable] = useTable({
        title: '退货商品',
        dataSource: refundTableData,
        columns: refundTableSchema,
        pagination: false,
        showIndexColumn: false,
        scroll: { y: 300 },
        showSummary: true,
        summaryFunc: handleSummary,
      });

      const [registerTimeTable] = useTable({
        title: '退货进度',
        columns: refundTimeTableSchema,
        pagination: false,
        dataSource: refundTimeTableData,
        showIndexColumn: false,
        scroll: { y: 300 },
      });

      function handleSummary(tableData: any[]) {
        let totalT5 = 0;
        let totalT6 = 0;
        tableData.forEach((item) => {
          totalT5 += item.t5;
          totalT6 += item.t6;
        });
        return [
          {
            t1: '总计',
            t5: totalT5,
            t6: totalT6,
          },
        ];
      }
      return {
        registerRefundTable,
        registerTimeTable,
        refundSchema,
        refundData,
        personSchema,
        personData,
      };
    },
  });
</script>
<style lang="less" scoped>
  .desc-wrap {
    padding: 16px;
    background-color: @component-background;
  }
</style>
