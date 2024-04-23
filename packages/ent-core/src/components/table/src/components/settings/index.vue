<template>
  <div :class="`${prefixCls}`">
    <RedoSetting v-if="getSetting.redo" />
    <SizeSetting v-if="getSetting.size" />
    <ColumnSetting
      v-if="getSetting.setting"
      :get-popup-container="getTableContainer"
      @columns-change="handleColumnChange"
    />
    <FullScreenSetting v-if="getSetting.fullScreen" />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { useDesign, useI18n } from '../../../../../hooks';
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
      FullScreenSetting
    },
    props: {
      setting: {
        type: Object as PropType<TableSetting>,
        default: () => ({})
      }
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
          ...props.setting
        };
      });

      function handleColumnChange(data: ColumnChangeParam[]) {
        emit('columns-change', data);
      }

      function getTableContainer() {
        return table ? unref(table.wrapRef) : document.body;
      }

      return { getSetting, t, handleColumnChange, getTableContainer, prefixCls };
    }
  });
</script>
