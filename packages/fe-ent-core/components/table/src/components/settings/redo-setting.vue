<template>
  <Tooltip placement="top">
    <template #title>
      <span>{{ t('common.redo') }}</span>
    </template>
    <RedoOutlined @click="redo" />
  </Tooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { RedoOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useTableContext } from '../../hooks/use-table-context';

  export default defineComponent({
    name: 'RedoSetting',
    components: {
      RedoOutlined,
      Tooltip,
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
