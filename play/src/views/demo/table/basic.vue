<template>
  <div class="p-4">
    <ent-table
      title="基础示例"
      title-help-message="温馨提醒"
      :columns="columns"
      :data="dataSource"
      :can-resize="canResize"
      :loading="loading"
      :striped="striped"
      :bordered="border"
      :row-key="(record) => record.id"
      show-table-setting
      :pagination="pagination"
      @columns-change="handleColumnChange"
    >
      <template #toolbar>
        <ent-button type="primary" @click="toggleCanResize">
          {{ !canResize ? '自适应高度' : '取消自适应' }}
        </ent-button>
        <ent-button type="primary" @click="toggleBorder">
          {{ !border ? '显示边框' : '隐藏边框' }}
        </ent-button>
        <ent-button type="primary" @click="toggleLoading"> 开启loading </ent-button>
        <ent-button type="primary" @click="toggleStriped">
          {{ !striped ? '显示斑马纹' : '隐藏斑马纹' }}
        </ent-button>
      </template>
    </ent-table>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { getBasicColumns, getBasicData } from './table-data';
  import type { ColumnChangeParam } from 'fe-ent-core/es/components/table/interface';

  export default defineComponent({
    setup() {
      const canResize = ref(false);
      const loading = ref(false);
      const striped = ref(true);
      const border = ref(true);
      const pagination = ref<any>(true);
      function toggleCanResize() {
        canResize.value = !canResize.value;
      }
      function toggleStriped() {
        striped.value = !striped.value;
      }
      function toggleLoading() {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          pagination.value = { pageSize: 20 };
        }, 3000);
      }
      function toggleBorder() {
        border.value = !border.value;
      }

      function handleColumnChange(data: ColumnChangeParam[]) {
        console.log('ColumnChanged', data);
      }

      return {
        columns: getBasicColumns(),
        dataSource: getBasicData(),
        canResize,
        loading,
        striped,
        border,
        toggleStriped,
        toggleCanResize,
        toggleLoading,
        toggleBorder,
        pagination,
        handleColumnChange,
      };
    },
  });
</script>
