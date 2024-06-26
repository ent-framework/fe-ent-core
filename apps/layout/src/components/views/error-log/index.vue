<template>
  <div class="p-4">
    <template v-for="src in imgList" :key="src">
      <img v-show="false" :src="src" />
    </template>
    <DetailModal :info="rowInfo" @register="registerModal" />
    <ent-table class="error-handle-table" @register="register">
      <template #toolbar>
        <ent-button type="primary" @click="fireVueError">
          {{ t('sys.errorLog.fireVueError') }}
        </ent-button>
        <ent-button type="primary" @click="fireResourceError">
          {{ t('sys.errorLog.fireResourceError') }}
        </ent-button>
      </template>
    </ent-table>
  </div>
</template>
<script lang="ts" setup>
  import { h, nextTick, ref, watch } from 'vue';
  import { EntTable, EntTableAction } from 'fe-ent-core';
  import { isDevMode } from 'fe-ent-core/es/utils';
  import { useErrorLogStore } from 'fe-ent-core/es/store';
  import { useI18n, useMessage } from 'fe-ent-core/es/hooks';
  import { useModal } from 'fe-ent-core/es/components/modal';
  import { useTable } from 'fe-ent-core/es/components/table';
  import { cloneDeep } from 'lodash-es';
  import { getColumns } from './data';
  import DetailModal from './detail-modal.vue';
  import type { ErrorLogInfo } from 'fe-ent-core/es/store/types';

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
      key: 'action',
      render: (record) => {
        return h(
          EntTableAction,
          {
            actions: [
              {
                label: t('sys.errorLog.tableActionDesc'),
                onClick: handleDetail.bind(null, record)
              }
            ]
          },
          { default: () => '' }
        );
      }
    }
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
      immediate: true
    }
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
    imgList.value.push(`${Date.now()}.png`);
  }
</script>
