```yaml

```

*Auto translate by google.*


## API


### `<ent-table>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|title|标题|`string \| ((data: Recordable) => string)`|`null`|`-`|
|title-help-message|表格标题右侧温馨提醒|`string \| string[]`|`-`|`-`|
|show-table-setting|显示表格设置工具|`boolean`|`false`|`-`|
|table-setting|表格设置工具配置, 见下方 TableSetting|`object`|`-`|`-`|
|click-to-row-select|点击行是否选中 checkbox 或者 radio。需要开启|`boolean`|`true`|`-`|
|is-tree-table|是否树表|`boolean`|`false`|`-`|
|inset|取消表格的默认 padding|`boolean`|`false`|`-`|
|sort-fn|自定义排序方法。见下方全局配置说明|`Function`|`DEFAULT_SORT_FN`|`-`|
|filter-fn|自定义过滤方法。见下方全局配置说明|`Function`|`DEFAULT_FILTER_FN`|`-`|
|api|请求接口，可以直接将src/api内的函数直接传入|`Function`|`null`|`-`|
|before-fetch|请求之前对参数进行处理|`Function`|`null`|`-`|
|after-fetch|请求之后对返回值进行处理|`Function`|`null`|`-`|
|handle-search-info-fn|开启表单后，在请求之前处理搜索条件参数|`Function`|`null`|`-`|
|fetch-setting|接口请求配置，可以配置请求的字段和响应的字段名，见下方全局配置说明|`object`|`() => FETCH_SETTING`|`-`|
|immediate|组件加载后是否立即请求接口，在 api 有传的情况下，如果为 false，需要自行使用 reload 加载表格数据|`boolean`|`true`|`-`|
|search-info|额外的请求参数，每次请求都会加上|`object`|`null`|`-`|
|def-sort|默认的排序参数|`object`|`null`|`-`|
|use-search-form|使用搜索表单|`boolean`|`false`|`-`|
|form-config|搜索表单配置|`object`|`null`|`-`|
|show-index-column|显示行号|`boolean`|`true`|`-`|
|index-column-props|序号列属性|`BasicColumn`|`() => {  return {    width: 50  };}`|`-`|
|action-column|表格右侧操作列配置 BasicColumn|`BasicColumn`|`null`|`-`|
|selection-column|选择行的配置|`Partial<DataTableSelectionColumn>`|`-`|`-`|
|expand-column|展开行的配置|`Partial<DataTableExpandColumn>`|`-`|`-`|
|ellipsis|文本超过宽度是否显示..., 全局设置，可以被column上的ellipsis属性覆盖|`boolean`|`true`|`-`|
|can-resize|是否可以自适应高度(如果置于PageWrapper组件内，请勿启用PageWrapper的fixedHeight属性，二者不可同时使用)|`boolean`|`true`|`-`|
|clear-select-on-page-change|切换页码是否重置勾选状态|`boolean`|`false`|`-`|
|pagination|See [Pagination props](pagination#Pagination-Props)|`false \| object`|`-`|`NDataTable`|
|paginate-single-page|Whether show pagination data is less than one page.|`boolean`|`false`|`NDataTable`|
|min-height|The min-height of the table content. Can be a CSS value.|`number \| string`|`-`|`NDataTable`|
|max-height|The max-height of the table content. Can be a CSS value.|`number \| string`|`-`|`NDataTable`|
|columns|Columns to display.|`Array<DataTableColumn>`|`-`|`NDataTable`|
|row-class-name|Class name of each row.|`string \| (rowData: object, rowIndex : number) => string`|`-`|`NDataTable`|
|row-props|Customize row attributes.|`(rowData: object, rowIndex : number) => HTMLAttributes`|`-`|`NDataTable`|
|row-key|Generate the key of the row by row data (if you don't want to set the key).|`(rowData: object) => (number \| string)`|`-`|`NDataTable`|
|summary|Data of table summary row. For types, see <n-a href="#DataTableCreateSummary-Type">DataTableCreateSummary Type</n-a>.|`DataTableCreateSummary`|`-`|`NDataTable`|
|data|Data to display.|`Array<object>`|`-`|`NDataTable`|
|loading|Whether to display loading status.|`boolean`|`false`|`NDataTable`|
|bordered|Whether to show border.|`boolean`|`false`|`NDataTable`|
|bottom-bordered|Whether to show bottom border.|`boolean`|`false`|`NDataTable`|
|striped|Whether to show zebra stripes on rows.|`boolean`|`false`|`NDataTable`|
|scroll-x|If columns are horizontal fixed, scroll-x need to be set.|`number \| string`|`-`|`NDataTable`|
|default-checked-row-keys|The key value selected by default.|`Array<string \| number>`|`-`|`NDataTable`|
|checked-row-keys|The keys of checked rows.|`Array<string \| number>`|`-`|`NDataTable`|
|single-line|Whether columns are not divided. If the prop is `true`, table cell has no `border-right`.|`boolean`|`false`|`NDataTable`|
|single-column|Whether rows are not divided. If the prop is `true`, table cell has no `border-bottom`.|`boolean`|`false`|`NDataTable`|
|size|Table size.|`'small' \| 'medium' \| 'large'`|`-`|`NDataTable`|
|remote|If data-table do automatic paging. You may set it to `true` in async usage.|`boolean`|`false`|`NDataTable`|
|default-expanded-row-keys|The key value of the expanded tree data by default|`Array<string \| number>`|`-`|`NDataTable`|
|default-expand-all|Whether to expand all expandable rows. Can't be used with async expanding data.|`boolean`|`false`|`NDataTable`|
|expanded-row-keys|Expanded row keys.|`Array<string \| number>`|`-`|`NDataTable`|
|sticky-expanded-rows|Expanded row content remains sticky.|`boolean`|`false`|`NDataTable`|
|virtual-scroll|Whether to use virtual scrolling to deal with large data. Make sure `max-height` is set before using it. When `virtual-scroll` is `true`, `rowSpan` will not take effect.|`boolean`|`false`|`NDataTable`|
|virtual-scroll-x|Whether to use horizontal virtual scrolling in table body. If there are too many columns, you can enable the prop. Enabling the prop will disable body cells that cross columns & rows. If the prop is enabled, every column should have `width` prop configured and `virtual-scroll`, `scroll-x`, `min-row-height`, `height-for-row`, `virtual-scroll-header` (optional), `header-height` (optional) props should be configured at the same time. You can refer to <n-a href="#virtual-x.vue">the example</n-a>.|`boolean`|`false`|`NDataTable`|
|virtual-scroll-header|Whether to use virtual scrolling in table header. If there are too many columns, you can enable the prop. You must configure `header-height` at the same time. Enabling the prop will disable header cells that cross columns & rows.|`boolean`|`false`|`NDataTable`|
|header-height|Header height value when `virtual-scroll-header` is enabled.|`number`|`-`|`NDataTable`|
|height-for-row|Height configuration function for each row of the table. It must be used with `virtual-scroll-x`. If it's not configured, each rows height would be set to `min-row-height`.|`(rowData: object, index: number) => number`|`-`|`NDataTable`|
|min-row-height|Min row height of the table when `virtual-scroll` or `virtual-scroll-x` is enabled. Each row's height must be larger than its value.|`number`|`-`|`NDataTable`|
|table-layout|Style `table-layout` of the table. When `ellipsis` or `max-height` or `flex-height` are set, it will always be `'fixed'` regardless of what you set.|`'auto' \| 'fixed'`|`-`|`NDataTable`|
|allow-checking-not-loaded|Whether to allow cascade checking on not loaded nodes. If you want to use this, you should know the `check-row-keys` may be incomplete.|`boolean`|`false`|`NDataTable`|
|cascade|Whether to do cascade checking when using tree data.|`boolean`|`false`|`NDataTable`|
|children-key|The key of children data in tree data's data entity.|`string`|`-`|`NDataTable`|
|indent|Indent of row content when using tree data.|`number`|`-`|`NDataTable`|
|flex-height|Whether to make table body's height auto fit table area height. Make it enabled will make `table-layout` always set to `'fixed'`.|`boolean`|`false`|`NDataTable`|
|summary-placement|Summary rows placement.|`'top' \| 'bottom'`|`-`|`NDataTable`|
|pagination-behavior-on-filter|The behavior of pagination after filter state is changed. `'first'` means returning to first page on filter, `'current'` means keep at current page on filter.|`'first' \| 'current'`|`-`|`NDataTable`|
|filter-icon-popover-props|Filter icon's Popover attribute of the button, See [Popover props](popover#Popover-Props)|`PopoverProps`|`-`|`NDataTable`|
|scrollbar-props|See [Scrollbar props](scrollbar#Scrollbar-Props), the `on-scroll` attribute already exists in the `DataTable`, the `on-scroll` attribute does not take effect here.|`ScrollbarProps`|`-`|`NDataTable`|
|render-cell|Render function of cell, it will be overwritten by columns' `render`.|`(value: any, rowData: object, column: DataTableBaseColumn) => VNodeChild`|`-`|`NDataTable`|
|render-expand-icon|Render function of expand icon.|`({ expanded, rowData }: { expanded: boolean, rowData: object }) => VNodeChild`|`-`|`NDataTable`|
|spin-props|Table spin's props.|`{ strokeWidth?: number, stroke?: string }`|`-`|`NDataTable`|
|get-csv-cell|Get CSV's cell content.|`(value: any, row: object, col: DataTableBaseColumn) => string`|`-`|`NDataTable`|
|get-csv-header|Get CSV's header content.|`(cols: Array<DataTableColumn>) => string`|`-`|`NDataTable`|



## Type


### TableCurrentDataSource

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|currentDataSource|currentDataSource|`T[]`|`-`|`-`|



### TableRowSelection

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|type|type|`RowSelectionType`|`-`|`-`|
|selectedRowKeys|selectedRowKeys|`DataTableRowKey[]`|`-`|`-`|
|selectedRows|selectedRows|`Recordable[]`|`-`|`-`|
|onChange|onChange|`OnUpdateCheckedRowKeys`|`-`|`-`|



### FilterInfo

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|filter|filter|`DataTableFilterState`|`-`|`-`|
|column|column|`DataTableBaseColumn`|`-`|`-`|



### FetchParams

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|pagination|Page size|`PaginationProps`|`-`|`-`|
|sorter|Sort settings|`DataTableSortState`|`-`|`-`|
|filterInfo|filter info, additional params for filter data.|`FilterInfo`|`-`|`-`|



### FetchRequestParams

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|pagination|Page size|`Recordable`|`-`|`-`|
|searchForm|Search form values|`Recordable`|`-`|`-`|
|sorter|Sort settings|`DataTableSortState`|`-`|`-`|
|filterInfo|filter info, additional params for filter data.|`FilterInfo`|`-`|`-`|



### GetColumnsParams

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|ignoreIndex|Ignore index column|`boolean`|`false`|`-`|
|ignoreAction|Ignore action column|`boolean`|`false`|`-`|
|sort|Sort columns or not.|`boolean`|`false`|`-`|



### TableActionType

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|reload|reload|`(opt?: FetchParams) => Promise<Recordable[] \| undefined>`|`-`|`-`|
|setSelectedRows|setSelectedRows|`(rows: Recordable[]) => void`|`-`|`-`|
|getSelectRows|getSelectRows|`() => Recordable[]`|`-`|`-`|
|clearSelectedRowKeys|clearSelectedRowKeys|`() => void`|`-`|`-`|
|getSelectRowKeys|getSelectRowKeys|`() => DataTableRowKey[]`|`-`|`-`|
|setPagination|setPagination|`(info: Partial<PaginationProps>) => void`|`-`|`-`|
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

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|pageField|pageField|`string`|`-`|`-`|
|sizeField|sizeField|`string`|`-`|`-`|
|listField|listField|`string`|`-`|`-`|
|totalField|totalField|`string`|`-`|`-`|



### TableSetting

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|redo|redo|`boolean`|`false`|`-`|
|size|size|`boolean`|`false`|`-`|
|setting|setting|`boolean`|`false`|`-`|
|fullScreen|fullScreen|`boolean`|`false`|`-`|



### BasicColumn

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|defaultHidden|defaultHidden|`boolean`|`false`|`-`|
|auth|权限编码控制是否显示|`string \| string[]`|`-`|`-`|
|ifShow|业务控制是否显示|`boolean \| ((column: BasicColumn) => boolean)`|`-`|`-`|



### InnerHandlers

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|onColumnsChange|onColumnsChange|`(data: ColumnChangeParam[]) => void`|`-`|`-`|



### ColumnOptionsType

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|value|value|`string`|`-`|`-`|
|label|label|`string`|`-`|`-`|
|column|column|`{    defaultHidden?: boolean;  }`|`-`|`-`|
|fixed|fixed|`FixedType`|`-`|`-`|



### TableActionItem

|Name|Description|Type|Default|Module|
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


