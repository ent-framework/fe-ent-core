<template>
  <EntModal :width="800" :title="t('sys.errorLog.tableActionDesc')" v-bind="$attrs">
    <EntDescription :data="info" @register="register" />
  </EntModal>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import type { ErrorLogInfo } from '@ent-core/types/store';
  import { EntModal } from '@ent-core/components/Modal/index';
  import { EntDescription, useDescription } from '@ent-core/components/Description/index';
  import { useI18n } from '@ent-core/hooks/web/useI18n';
  import { getDescSchema } from './data';
  import { defineComponent } from 'vue';

  defineProps({
    info: {
      type: Object as PropType<ErrorLogInfo>,
      default: null,
    },
  });

  defineComponent({
    components: { EntModal, EntDescription },
  });

  const { t } = useI18n();

  const [register] = useDescription({
    column: 2,
    schema: getDescSchema()!,
  });
</script>
