<template>
  <!--  使用tag解耦，在register-glob-comp.ts 中注册成全局组件-->
  <ent-modal :width="800" :title="t('sys.errorLog.tableActionDesc')" v-bind="$attrs">
    <ent-description :data="info" @register="register" />
  </ent-modal>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import type { ErrorLogInfo } from 'fe-ent-core/lib/logics';
  import { useDescription } from 'fe-ent-core/lib/components';
  import { useI18n } from 'fe-ent-core/lib/hooks';
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
