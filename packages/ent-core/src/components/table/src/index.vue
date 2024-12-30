<template>
  <div ref="wrapRef" :class="getWrapperClass">
    <div v-if="getBindValues.useSearchForm" class="search-form">
      <EntForm
        v-if="getBindValues.useSearchForm"
        ref="formRef"
        submit-on-reset
        v-bind="getFormProps"
        :table-action="tableAction"
        @register="registerForm"
        @submit="handleSearchInfoChange"
      >
        <template v-for="item in getFormSlotKeys" #[replaceFormSlotKey(item)]="data">
          <slot :name="item" v-bind="data || {}" />
        </template>
      </EntForm>
    </div>
    <TableHeader v-bind="getTableHeaderProps">
      <template v-if="$slots.headerTop" #headerTop>
        <slot name="headerTop" />
      </template>
      <template v-if="$slots.tableTitle" #tableTitle>
        <slot name="tableTitle" />
      </template>
      <template v-if="$slots.toolbar" #toolbar>
        <slot name="toolbar" />
      </template>
    </TableHeader>
    <NDataTable
      ref="tableElRef"
      v-bind="getTableProps"
      v-model:checked-row-keys="checkState.keys"
      @update:checked-row-keys="setSelectedRowKeys"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
      @update:sorter="handleSortChange"
    >
      <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </NDataTable>
  </div>
</template>
<script lang="ts">
  import {
    computed,
    defineComponent,
    inject,
    ref,
    shallowRef,
    toRaw,
    unref,
    watchEffect
  } from 'vue';
  import { NDataTable, dataTableProps } from 'naive-ui';
  import { omit, pick } from 'lodash-es';
  import { EntForm, useForm } from '../../form';
  import { PageWrapperFixedHeightKey } from '../../page';
  import { useDesign } from '../../../hooks';
  import { warn } from '../../../utils/log';
  import { isArray } from '../../../utils';
  import TableHeader from './components/table-header.vue';
  import { usePagination } from './hooks/use-pagination';
  import { useColumns } from './hooks/use-columns';
  import { useDataSource } from './hooks/use-data-source';
  import { useLoading } from './hooks/use-loading';
  import { useRowSelection } from './hooks/use-row-selection';
  import { useCustomRow } from './hooks/use-custom-row';
  import { createTableContext } from './hooks/use-table-context';
  import { useTableForm } from './hooks/use-table-form';

  import { basicProps, tableHeaderProps } from './props';
  import type { DataTableSortState, DataTableInst } from 'naive-ui/es/data-table';
  import type { BasicTableProps, SizeType, TableActionType } from './types/table';
  import type { Nullable } from './../../../types';

  export default defineComponent({
    name: 'EntTable',
    components: {
      NDataTable,
      EntForm,
      TableHeader
    },
    extends: NDataTable,
    props: basicProps,
    emits: [
      'fetch-success',
      'fetch-error',
      'selection-change',
      'register',
      'row-click',
      'row-dbClick',
      'row-contextmenu',
      'row-mouseenter',
      'row-mouseleave',
      'edit-end',
      'edit-cancel',
      'edit-row-end',
      'edit-change',
      'expanded-rows-change',
      'change',
      'columns-change',
      'update:checked-row-keys'
    ],
    setup(props, { attrs, emit, slots, expose }) {
      const tableElRef = ref<Nullable<DataTableInst>>(null);
      const tableData = shallowRef([]);

      const wrapRef = ref(null);
      const formRef = ref(null);
      const innerPropsRef = ref<Partial<BasicTableProps>>();

      const sortStates = ref<DataTableSortState>();
      const { prefixCls } = useDesign('ent-table');
      const [registerForm, formActions] = useForm();

      const getProps = computed(() => {
        return { ...props, ...unref(innerPropsRef) } as BasicTableProps;
      });

      const isFixedHeightPage = inject(PageWrapperFixedHeightKey, false);
      watchEffect(() => {
        unref(isFixedHeightPage) &&
          props.canResize &&
          warn(
            "'canResize' of BasicTable may not work in PageWrapper with 'fixedHeight' (especially in hot updates)"
          );
      });

      const { getLoading, setLoading } = useLoading(getProps);
      const {
        getPaginationInfo,
        getPagination,
        setPage,
        setPageSize,
        setTotalRows,
        setShowPagination,
        getShowPagination
      } = usePagination(getProps);

      const {
        checkState,
        getSelectRows,
        setSelectedRows,
        clearSelectedRowKeys,
        getSelectRowKeys,
        setSelectedRowKeys,
        getRowSelection
      } = useRowSelection(getProps, tableData, emit);

      const {
        handleTableChange,
        getDataSourceRef,
        getDataSource,
        getRawDataSource,
        setTableData,
        updateTableDataRecord,
        deleteTableDataRecord,
        insertTableDataRecord,
        findTableDataRecord,
        fetch,
        reload,
        updateTableData
      } = useDataSource(
        getProps,
        {
          tableData,
          getPaginationInfo,
          setLoading,
          setPage,
          setPageSize,
          setTotalRows,
          getFieldsValue: formActions.getFieldsValue,
          clearSelectedRowKeys
        },
        emit
      );

      const {
        getViewColumns,
        getColumns,
        setCacheColumnsByField,
        setCacheColumns,
        setColumns,
        getCacheColumns
      } = useColumns(getProps, getPaginationInfo);

      const { customRow } = useCustomRow(getProps, {
        setSelectedRowKeys,
        getSelectRows,
        getSelectRowKeys,
        clearSelectedRowKeys,
        emit
      });

      const { getFormProps, replaceFormSlotKey, getFormSlotKeys, handleSearchInfoChange } =
        useTableForm(getProps, slots, fetch, getLoading);

      const getTableHeaderProps = computed(() => {
        return pick({ ...getProps.value }, Object.keys(tableHeaderProps));
      });

      const getBindValues = computed((): BasicTableProps => {
        const dataSource = unref(getDataSourceRef);
        const _props = unref(getProps);
        const { api } = _props;
        let propsData: BasicTableProps = {
          ...attrs,
          ..._props,
          loading: unref(getLoading),
          rowProps: customRow,
          columns: toRaw(unref(getViewColumns)),
          pagination: toRaw(unref(getPaginationInfo)),
          data: dataSource,
          remote: !!api
        };
        propsData = omit(propsData, ['class', 'onChange']);
        return propsData;
      });

      const getTableProps = computed(() => {
        const _props = unref(getBindValues);
        return pick(_props, Object.keys(dataTableProps));
      });

      const getWrapperClass = computed(() => {
        const values = unref(getBindValues);
        return [
          prefixCls,
          //attrs.class, maybe bug here, will duplicate class
          {
            [`${prefixCls}-form-container`]: values.useSearchForm,
            [`${prefixCls}--inset`]: values.inset
          }
        ];
      });

      function setProps(props: Partial<BasicTableProps>) {
        innerPropsRef.value = { ...unref(innerPropsRef), ...props };
      }

      //页面操作时间处理
      function handlePageChange(currentPage: number) {
        handleTableChange({
          pagination: { ...getPagination(), page: currentPage },
          sorter: unref(sortStates)
        });
      }
      function handlePageSizeChange(pageSize: number) {
        console.log('handlePageSizeChanged', pageSize);
        setPageSize(pageSize);
        handleTableChange({
          pagination: { ...getPagination(), page: 1, pageSize },
          sorter: unref(sortStates)
        });
      }
      function handleSortChange(options: DataTableSortState | DataTableSortState[] | null) {
        if (options) {
          if (isArray(options) && options.length) {
            sortStates.value = options[0];
          } else {
            sortStates.value = options as DataTableSortState;
          }
        } else {
          sortStates.value = undefined;
        }
        handleTableChange({ pagination: { ...getPagination() }, sorter: unref(sortStates) });
      }

      const tableAction: TableActionType = {
        reload,
        getSelectRows,
        setSelectedRows,
        clearSelectedRowKeys,
        getSelectRowKeys,
        setPage,
        setPageSize,
        setTotalRows,
        setTableData,
        updateTableDataRecord,
        deleteTableDataRecord,
        insertTableDataRecord,
        findTableDataRecord,
        setSelectedRowKeys,
        setColumns,
        setLoading,
        getDataSource,
        getRawDataSource,
        setProps,
        getRowSelection,
        getPaginationRef: getPagination,
        getColumns,
        getCacheColumns,
        emit,
        updateTableData,
        setShowPagination,
        getShowPagination,
        setCacheColumnsByField,
        getSize: () => {
          return unref(getBindValues).size as SizeType;
        },
        setCacheColumns
      };
      createTableContext({ ...tableAction, wrapRef, getBindValues });

      expose(tableAction);

      emit('register', tableAction, formActions);

      return {
        formRef,
        tableElRef,
        getBindValues,
        getTableHeaderProps,
        getLoading,
        registerForm,
        handleSearchInfoChange,
        wrapRef,
        tableAction,
        getFormProps: getFormProps as any,
        getTableProps,
        replaceFormSlotKey,
        getFormSlotKeys,
        checkState,
        setSelectedRowKeys,
        getWrapperClass,
        columns: getViewColumns,
        handlePageChange,
        handlePageSizeChange,
        handleSortChange
      };
    }
  });
</script>
