```yaml
meta:
  type: 组件
  category: 容器
title: 页面包装
description: 页面包装
```


## API

%%API(src/index.vue)%%

## Type


### TableRowSelection

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|type|type|`RowSelectionType`|`-`|`-`|
|selectedRowKeys|selectedRowKeys|`DataTableRowKey[]`|`-`|`-`|
|selectedRows|selectedRows|`Recordable[]`|`-`|`-`|
|onChange|onChange|`OnUpdateCheckedRowKeys`|`-`|`-`|



### FilterInfo

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|filter|filter|`DataTableFilterState`|`-`|`-`|
|column|column|`DataTableBaseColumn`|`-`|`-`|



### FetchParams

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|pagination|Page size|`PaginationProps`|`-`|`-`|
|sorter|Sort settings|`DataTableSortState`|`-`|`-`|
|filterInfo|filter info, additional params for filter data.|`FilterInfo`|`-`|`-`|



### FetchRequestParams

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|pagination|Page size|`Recordable`|`-`|`-`|
|searchForm|Search form values|`Recordable`|`-`|`-`|
|sorter|Sort settings|`DataTableSortState`|`-`|`-`|
|filterInfo|filter info, additional params for filter data.|`FilterInfo`|`-`|`-`|



### GetColumnsParams

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|ignoreIndex|Ignore index column|`boolean`|`false`|`-`|
|ignoreAction|Ignore action column|`boolean`|`false`|`-`|
|sort|Sort columns or not.|`boolean`|`false`|`-`|



### TableActionType

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|reload|reload|`(opt?: FetchParams) => Promise<Recordable[] \| undefined>`|`-`|`-`|
|setSelectedRows|setSelectedRows|`(rows: Recordable[]) => void`|`-`|`-`|
|getSelectRows|getSelectRows|`() => Recordable[]`|`-`|`-`|
|clearSelectedRowKeys|clearSelectedRowKeys|`() => void`|`-`|`-`|
|getSelectRowKeys|getSelectRowKeys|`() => DataTableRowKey[]`|`-`|`-`|
|setPage|setPage|`(page: number) => void`|`-`|`-`|
|setPageSize|setPageSize|`(pageSize: number) => void`|`-`|`-`|
|setTotalRows|setTotalRows|`(total: number) => void`|`-`|`-`|
|setTableData|setTableData|`<T = Recordable>(values: T[]) => void`|`-`|`-`|
|updateTableDataRecord|updateTableDataRecord|`(rowKey: string \| number, record: Recordable) => Recordable \| void`|`-`|`-`|
|deleteTableDataRecord|deleteTableDataRecord|`(rowKey: string \| number \| string[] \| number[]) => void`|`-`|`-`|
|insertTableDataRecord|insertTableDataRecord|`(record: Recordable \| Recordable[], index?: number) => Recordable[] \| void`|`-`|`-`|
|findTableDataRecord|findTableDataRecord|`(rowKey: string \| number) => Recordable \| void`|`-`|`-`|
|getColumns|getColumns|`(opt?: GetColumnsParams) => BasicColumn[]`|`-`|`-`|
|setColumns|setColumns|`(columns: BasicColumn[] \| DataTableRowKey[]) => void`|`-`|`-`|
|getDataSource|getDataSource|`<T = Recordable>() => T[]`|`-`|`-`|
|getRawDataSource|getRawDataSource|`<T = Recordable>() => T`|`-`|`-`|
|setLoading|setLoading|`(loading: boolean) => void`|`-`|`-`|
|setProps|setProps|`(props: Partial<BasicTableProps>) => void`|`-`|`-`|
|setSelectedRowKeys|setSelectedRowKeys|`(    keys: DataTableRowKey[],    rows: Recordable[],    meta: { row: Recordable \| undefined; action: 'check' \| 'uncheck' \| 'checkAll' \| 'uncheckAll' }  ) => void`|`-`|`-`|
|getPaginationRef|getPaginationRef|`() => PaginationProps \| boolean`|`-`|`-`|
|getSize|getSize|`() => SizeType`|`-`|`-`|
|getRowSelection|getRowSelection|`() => TableRowSelection`|`-`|`-`|
|getCacheColumns|getCacheColumns|`() => BasicColumn[]`|`-`|`-`|
|emit|emit|`EmitType`|`-`|`-`|
|updateTableData|updateTableData|`(index: number, key: string, value: any) => Recordable`|`-`|`-`|
|setShowPagination|setShowPagination|`(show: boolean) => Promise<void>`|`-`|`-`|
|getShowPagination|getShowPagination|`() => boolean`|`-`|`-`|
|setCacheColumnsByField|setCacheColumnsByField|`(dataIndex: string \| undefined, value: Partial<BasicColumn>) => void`|`-`|`-`|
|setCacheColumns|setCacheColumns|`(columns: BasicColumn[]) => void`|`-`|`-`|



### FetchSetting

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|pageField|pageField|`string`|`-`|`-`|
|sizeField|sizeField|`string`|`-`|`-`|
|listField|listField|`string`|`-`|`-`|
|totalField|totalField|`string`|`-`|`-`|



### TableSetting

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|redo|redo|`boolean`|`false`|`-`|
|size|size|`boolean`|`false`|`-`|
|setting|setting|`boolean`|`false`|`-`|
|fullScreen|fullScreen|`boolean`|`false`|`-`|



### BasicColumn

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|defaultHidden|defaultHidden|`boolean`|`false`|`-`|
|auth|权限编码控制是否显示|`string \| string[]`|`-`|`-`|
|ifShow|业务控制是否显示|`boolean \| ((column: BasicColumn) => boolean)`|`-`|`-`|



### InnerHandlers

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|onColumnsChange|onColumnsChange|`(data: ColumnChangeParam[]) => void`|`-`|`-`|



### ColumnOptionsType

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|value|value|`string`|`-`|`-`|
|label|label|`string`|`-`|`-`|
|column|column|`{    defaultHidden?: boolean;  }`|`-`|`-`|
|fixed|fixed|`FixedType`|`-`|`-`|



### TableActionItem

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|onClick|按钮的鼠标点击事件|`Fn`|`-`|`-`|
|label|按钮的文字|`string`|`-`|`-`|
|icon|图标|`string`|`-`|`-`|
|appendDivider|是否追加分割线|`boolean`|`false`|`-`|
|auth|权限编码控制是否显示|`string \| string[]`|`-`|`-`|
|ifShow|业务控制是否显示|`boolean \| ((action: TableActionItem) => boolean)`|`-`|`-`|
|popConfirmProps|弹窗的配置属性<br>confirmContent - 确认文本|`Partial<PopconfirmProps>`|`-`|`-`|
|confirm|确认文本内容|`string \| (() => VNodeChild)`|`-`|`-`|
|tooltipProps|提示的配置属性|`Partial<TooltipProps>`|`-`|`-`|
|tooltip|提示的内容|`string \| (() => VNodeChild)`|`-`|`-`|


