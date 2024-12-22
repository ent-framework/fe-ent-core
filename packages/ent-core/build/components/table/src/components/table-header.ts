
  import { computed, defineComponent } from 'vue';
  import { NAlert, NDivider } from 'naive-ui';
  import { useDesign } from '../../../../hooks';
  import { tableHeaderProps } from '../props';
  import { useTableContext } from '../hooks/use-table-context';
  import TableSettingComponent from './settings/index';
  import TableTitle from './table-title';
  import type { ColumnChangeParam } from '../types/table';

  export default defineComponent({
    name: 'BasicTableHeader',
    components: {
      NDivider,
      NAlert,
      TableTitle,
      TableSetting: TableSettingComponent
    },
    props: tableHeaderProps,
    emits: ['columns-change'],
    setup(_, { emit }) {
      const table = useTableContext();
      const { prefixCls } = useDesign('basic-table-header');
      function handleColumnChange(data: ColumnChangeParam[]) {
        emit('columns-change', data);
      }
      const getSelectedKey = computed(() => {
        return table.getSelectRowKeys();
      });

      function clearSelected() {
        table.clearSelectedRowKeys();
      }

      return { prefixCls, handleColumnChange, getSelectedKey, clearSelected };
    }
  });
