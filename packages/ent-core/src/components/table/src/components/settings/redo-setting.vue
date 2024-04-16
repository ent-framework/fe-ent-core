<template>
  <NTooltip placement="top">
    <template #trigger>
      <EntIcon icon="ant-design:redo-outlined" />
    </template>
    <span>{{ t('common.redo') }}</span>
  </NTooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NTooltip } from 'naive-ui';
  import { EntIcon } from '../../../../../components/icon';
  import { useI18n } from '../../../../../hooks/web/use-i18n';
  import { useTableContext } from '../../hooks/use-table-context';

  export default defineComponent({
    name: 'RedoSetting',
    components: {
      NTooltip,
      EntIcon,
    },
    setup() {
      const table = useTableContext();
      const { t } = useI18n();

      function redo() {
        table.reload();
      }

      return { redo, t };
    },
  });
</script>
