<template>
  <!--  使用tag解耦，在register-glob-comp.ts 中注册成全局组件-->
  <ent-modal :width="800" :title="t('sys.errorLog.tableActionDesc')" v-bind="$attrs">
    <ent-description :data="info" @register="register" />
  </ent-modal>
</template>
<script lang="ts" setup>
  import { EntModal } from 'fe-ent-core';
  import { useI18n } from 'fe-ent-core/es/hooks';
  import { useDescription } from 'fe-ent-core/es/components/description';
  import { getDescSchema } from './data';
  import type { ErrorLogInfo } from 'fe-ent-core/es/store/types';
  import type { PropType } from 'vue';

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
