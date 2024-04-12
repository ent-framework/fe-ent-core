<template>
  <NTooltip placement="top">
    <template #trigger>
      <RedoOutlined @click="redo" />
    </template>
    <span>{{ t('common.redo') }}</span>
  </NTooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NTooltip } from 'naive-ui';
  import { RedoOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useTableContext } from '../../hooks/use-table-context';

  export default defineComponent({
    name: 'RedoSetting',
    components: {
      RedoOutlined,
      NTooltip,
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
