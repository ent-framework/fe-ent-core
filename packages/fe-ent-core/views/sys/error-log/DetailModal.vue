<template>
  <BasicModal :width="800" :title="t('sys.errorLog.tableActionDesc')" v-bind="$attrs">
    <Description :data="info" @register="register" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import type { ErrorLogInfo } from 'fe-ent-core/types/store';
  import { BasicModal } from 'fe-ent-core/components/Modal/index';
  import { Description, useDescription } from 'fe-ent-core/components/Description/index';
  import { useI18n } from 'fe-ent-core/hooks/web/useI18n';
  import { getDescSchema } from './data';

  defineProps({
    info: {
      type: Object as PropType<ErrorLogInfo>,
      default: null,
    },
  });

  const { t } = useI18n();

  const [register] = useDescription({
    column: 2,
    schema: getDescSchema()!,
  });
</script>
