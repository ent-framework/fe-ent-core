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
      <template v-for="item in ['resetBefore', 'toolbar']" #[item]="data">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </TableHeader>
    <NDataTable
      ref="tableElRef"
      v-bind="getBindValues"
      v-model:checked-row-keys="checkState.keys"
      @update:checked-row-keys="setSelectedRowKeys"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
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
    watchEffect,
  } from 'vue';
  import { NDataTable } from 'naive-ui';
  import { omit, pick } from 'lodash-es';
  import { EntForm, useForm } from '@ent-core/components/form';
  import { PageWrapperFixedHeightKey } from '@ent-core/components/page';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { warn } from '@ent-core/utils/log';
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
  import type { BasicTableProps, SizeType, TableActionType } from './types/table';

  /**
   * @docLocation https://raw.githubusercontent.com/vueComponent/ant-design-vue/4.0.0/components/table/index.zh-CN.md
   * @extends Table
   * @docLink https://next.antdv.com/components/table-cn
   */
  export default defineComponent({
    name: 'EntTable',
    components: {
      NDataTable,
      EntForm,
      TableHeader,
    },
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
      'update:checked-row-keys',
    ],
    setup(props, { attrs, emit, slots, expose }) {
      const tableElRef = ref(null);
      const tableData = shallowRef([]);

      const wrapRef = ref(null);
      const formRef = ref(null);
      const innerPropsRef = ref<Partial<BasicTableProps>>();

      const { prefixCls } = useDesign('basic-table');
      const [registerForm, formActions] = useForm();

      const getProps = computed(() => {
        return { ...props, ...unref(innerPropsRef) } as BasicTableProps;
      });

      const isFixedHeightPage = inject(PageWrapperFixedHeightKey, false);
      watchEffect(() => {
        unref(isFixedHeightPage) &&
          props.canResize &&
          warn(
            "'canResize' of BasicTable may not work in PageWrapper with 'fixedHeight' (especially in hot updates)",
          );
      });

      const { getLoading, setLoading } = useLoading(getProps);
      const {
        getPaginationInfo,
        getPagination,
        setPagination,
        setShowPagination,
        getShowPagination,
      } = usePagination(getProps);

      const {
        checkState,
        getSelectRows,
        setSelectedRows,
        clearSelectedRowKeys,
        getSelectRowKeys,
        setSelectedRowKeys,
        getRowSelection,
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
        updateTableData,
      } = useDataSource(
        getProps,
        {
          tableData,
          getPaginationInfo,
          setLoading,
          setPagination,
          getFieldsValue: formActions.getFieldsValue,
          clearSelectedRowKeys,
        },
        emit,
      );

      const {
        getViewColumns,
        getColumns,
        setCacheColumnsByField,
        setCacheColumns,
        setColumns,
        getCacheColumns,
      } = useColumns(getProps, getPaginationInfo);

      const { customRow } = useCustomRow(getProps, {
        setSelectedRowKeys,
        getSelectRows,
        getSelectRowKeys,
        clearSelectedRowKeys,
        emit,
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
          //rowSelection: unref(getRowSelectionRef),
          //rowKey: unref(getRowKey),
          columns: toRaw(unref(getViewColumns)),
          pagination: toRaw(unref(getPaginationInfo)),
          data: dataSource,
          remote: !!api,
        };
        // if (slots.expandedRowRender) {
        //   propsData = omit(propsData, 'scroll');
        // }

        propsData = omit(propsData, ['class', 'onChange']);
        return propsData;
      });

      const getWrapperClass = computed(() => {
        const values = unref(getBindValues);
        return [
          prefixCls,
          //attrs.class, maybe bug here, will duplicate class
          {
            [`${prefixCls}-form-container`]: values.useSearchForm,
            [`${prefixCls}--inset`]: values.inset,
          },
        ];
      });

      function setProps(props: Partial<BasicTableProps>) {
        innerPropsRef.value = { ...unref(innerPropsRef), ...props };
      }

      function handlePageChange(currentPage) {
        handleTableChange({ ...getPagination(), page: currentPage });
      }
      function handlePageSizeChange(pageSize) {
        handleTableChange({ ...getPagination(), pageSize });
      }

      const tableAction: TableActionType = {
        reload,
        getSelectRows,
        setSelectedRows,
        clearSelectedRowKeys,
        getSelectRowKeys,
        setPagination,
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
        setCacheColumns,
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
        replaceFormSlotKey,
        getFormSlotKeys,
        checkState,
        setSelectedRowKeys,
        getWrapperClass,
        columns: getViewColumns,
        handlePageChange,
        handlePageSizeChange,
      };
    },
  });
</script>
