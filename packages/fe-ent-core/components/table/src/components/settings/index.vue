<template>
  <div :class="`${prefixCls}`">
    <RedoSetting v-if="getSetting.redo" :get-popup-container="getTableContainer" />
    <SizeSetting v-if="getSetting.size" :get-popup-container="getTableContainer" />
    <ColumnSetting
      v-if="getSetting.setting"
      :get-popup-container="getTableContainer"
      @columns-change="handleColumnChange"
    />
    <FullScreenSetting v-if="getSetting.fullScreen" :get-popup-container="getTableContainer" />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useDesign } from '@ent-core/hooks';
  import { useTableContext } from '../../hooks/use-table-context';
  import ColumnSetting from './column-setting.vue';
  import SizeSetting from './size-setting.vue';
  import RedoSetting from './redo-setting.vue';
  import FullScreenSetting from './full-screen-setting.vue';
  import type { ColumnChangeParam, TableSetting } from '../../types/table';
  import type { PropType } from 'vue';

  export default defineComponent({
    name: 'TableSetting',
    components: {
      ColumnSetting,
      SizeSetting,
      RedoSetting,
      FullScreenSetting,
    },
    props: {
      setting: {
        type: Object as PropType<TableSetting>,
        default: () => ({}),
      },
    },
    emits: ['columns-change'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const table = useTableContext();
      const { prefixCls } = useDesign('table-setting');
      const getSetting = computed((): TableSetting => {
        return {
          redo: true,
          size: true,
          setting: true,
          fullScreen: false,
          ...props.setting,
        };
      });

      function handleColumnChange(data: ColumnChangeParam[]) {
        emit('columns-change', data);
      }

      function getTableContainer() {
        return table ? unref(table.wrapRef) : document.body;
      }

      return { getSetting, t, handleColumnChange, getTableContainer, prefixCls };
    },
  });
</script>
