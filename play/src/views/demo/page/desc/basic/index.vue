<template>
  <ent-page-wrapper title="基础详情页" content-background>
    <ent-description
      size="middle"
      title="退款申请"
      :bordered="false"
      :column="3"
      :data="refundData"
      :schema="refundSchema"
    />
    <a-divider />
    <ent-description
      size="middle"
      title="用户信息"
      :bordered="false"
      :column="3"
      :data="personData"
      :schema="personSchema"
    />
    <a-divider />

    <ent-table @register="registerRefundTable" />
    <a-divider />
    <ent-table @register="registerTimeTable" />
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useTable } from 'fe-ent-core';
  import { Divider } from 'ant-design-vue';

  import {
    personData,
    personSchema,
    refundData,
    refundSchema,
    refundTableData,
    refundTableSchema,
    refundTimeTableData,
    refundTimeTableSchema,
  } from './data';
  export default defineComponent({
    components: { [Divider.name]: Divider },
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
