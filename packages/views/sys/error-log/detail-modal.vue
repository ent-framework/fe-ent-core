<template>
  <!--  使用tag解耦，在register-glob-comp.ts 中注册成全局组件-->
  <ent-modal :width="800" :title="t('sys.errorLog.tableActionDesc')" v-bind="$attrs">
    <ent-description :data="info" @register="register" />
  </ent-modal>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import type { ErrorLogInfo } from '@ent-core/logics/types/store';
  import { useDescription } from '@ent-core/components/description/src/use-description';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
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
