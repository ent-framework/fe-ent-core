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
        <a-button @click="fireAjaxError" type="primary">
          {{ t('sys.errorLog.fireAjaxError') }}
        </a-button>
      </template>
      <template #action="{ record }">
        <ent-table-action
          :actions="[
            { label: t('sys.errorLog.tableActionDesc'), onClick: handleDetail.bind(null, record) },
          ]"
        />
      </template>
    </ent-table>
  </div>
</template>
<script lang="ts" setup>
  import type { ErrorLogInfo } from '@ent-core/logics/types/store';
  import { watch, ref, nextTick } from 'vue';
  import DetailModal from './detail-modal.vue';
  import { useTable } from '@ent-core/components/table/src/hooks/use-table';
  import { useModal } from '@ent-core/components/modal/src/hooks/use-modal';
  import { useMessage } from '@ent-core/hooks/web/use-message';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useErrorLogStore } from '@ent-core/store/modules/error-log';
  import { fireErrorApi } from '@ent-core/logics/api/demo/error';
  import { getColumns } from './data';
  import { cloneDeep } from 'lodash';
  import { isDevMode } from '@ent-core/utils/env';

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
      slots: { customRender: 'action' },
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

  async function fireAjaxError() {
    await fireErrorApi();
  }
</script>
