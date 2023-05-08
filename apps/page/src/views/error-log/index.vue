<template>
  <div class="p-4">
    <template v-for="src in imgList" :key="src">
      <img :src="src" v-show="false" />
    </template>
    <DetailModal :info="rowInfo" @register="registerModal" />
    <ent-table @register="register" class="error-handle-table">
      <template #toolbar>
        <a-button @click="fireVueError" type="primary">
          {{ t('sys.errorLog.fireVueError') }}
        </a-button>
        <a-button @click="fireResourceError" type="primary">
          {{ t('sys.errorLog.fireResourceError') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <ent-table-action
            :actions="[
              {
                label: t('sys.errorLog.tableActionDesc'),
                onClick: handleDetail.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </ent-table>
  </div>
</template>
<script lang="ts" setup>
  import type { ErrorLogInfo } from 'fe-ent-core/lib/logics';
  import { watch, ref, nextTick } from 'vue';
  import DetailModal from './detail-modal.vue';
  import { EntTable, EntTableAction } from 'fe-ent-core/lib/components';
  import { useTable } from 'fe-ent-core/lib/components';
  import { useModal } from 'fe-ent-core/lib/components';
  import { useMessage } from 'fe-ent-core/lib/hooks';
  import { useI18n } from 'fe-ent-core/lib/hooks';
  import { useErrorLogStore } from 'fe-ent-core/lib/store';
  import { getColumns } from './data';
  import { cloneDeep } from 'lodash-es';
  import { isDevMode } from 'fe-ent-core/lib/utils';

  const rowInfo = ref<ErrorLogInfo>();
  const imgList = ref<string[]>([]);

  const { t } = useI18n();
  const errorLogStore = useErrorLogStore();
  const [register, { setTableData }] = useTable({
    title: t('sys.errorLog.tableTitle'),
    columns: getColumns(),
    actionColumn: {
      width: 80,
      title: 'Action',
      dataIndex: 'action',
    },
  });
  const [registerModal, { openModal }] = useModal();

  watch(
    () => errorLogStore.getErrorLogInfoList,
    (list) => {
      nextTick(() => {
        setTableData(cloneDeep(list));
      });
    },
    {
      immediate: true,
    },
  );
  const { createMessage } = useMessage();
  if (isDevMode()) {
    createMessage.info(t('sys.errorLog.enableMessage'));
  }
  // 查看详情
  function handleDetail(row: ErrorLogInfo) {
    rowInfo.value = row;
    openModal(true);
  }

  function fireVueError() {
    throw new Error('fire vue error!');
  }

  function fireResourceError() {
    imgList.value.push(`${new Date().getTime()}.png`);
  }
</script>
