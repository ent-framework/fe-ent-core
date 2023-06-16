```yaml
meta:
  type: 组件
  category: 容器
title: 页面包装
description: 页面包装
```


## API


### `<ent-table>` Props

|参数名|描述|类型|默认值|模块|版本|
|---|---|---|:---:|---|:---|
|click-to-row-select|点击行是否选中 checkbox 或者 radio。需要开启|`boolean`|`true`|`-`||
|is-tree-table|是否树表|`boolean`|`false`|`-`||
|show-table-setting|显示表格设置工具|`boolean`|`false`|`-`||
|table-setting|表格设置工具配置, 见下方 TableSetting|`propTypes.shape<TableSetting>({})`|`-`|`-`||
|inset|取消表格的默认 padding|`boolean`|`false`|`-`||
|sort-fn|自定义排序方法。见下方全局配置说明|`Function`|`DEFAULT_SORT_FN`|`-`||
|filter-fn|自定义过滤方法。见下方全局配置说明|`Function`|`DEFAULT_FILTER_FN`|`-`||
|auto-create-key|是否自动生成 key|`boolean`|`true`|`-`||
|striped|斑马纹|`boolean`|`true`|`-`||
|show-summary|是否显示合计行|`boolean`|`false`|`-`||
|summary-func|计算合计行的方法|`Function`|`null`|`-`||
|summary-data|自定义合计数据。如果有则显示该数据|`Record[]`|`null`|`-`||
|indent-size|展示树形数据时，每层缩进的宽度，以 px 为单位|`number`|`15`|`antdv`||
|can-col-drag|列能否拖动|`boolean`|`true`|`-`||
|api|请求接口，可以直接将src/api内的函数直接传入|`Function`|`null`|`-`||
|before-fetch|请求之前对参数进行处理|`Function`|`null`|`-`||
|after-fetch|请求之后对返回值进行处理|`Function`|`null`|`-`||
|handle-search-info-fn|开启表单后，在请求之前处理搜索条件参数|`Function`|`null`|`-`||
|fetch-setting|接口请求配置，可以配置请求的字段和响应的字段名，见下方全局配置说明|`object`|`() => FETCH_SETTING`|`-`||
|immediate|组件加载后是否立即请求接口，在 api 有传的情况下，如果为 false，需要自行使用 reload 加载表格数据|`boolean`|`true`|`-`||
|empty-data-is-show-table|在启用搜索表单的前提下，是否在表格没有数据的时候显示表格|`boolean`|`true`|`-`||
|search-info|额外的请求参数|`object`|`null`|`-`||
|def-sort|默认的排序参数|`object`|`null`|`-`||
|use-search-form|使用搜索表单|`boolean`|`false`|`-`||
|form-config|搜索表单配置|`object`|`null`|`-`||
|columns|表格列的配置描述，具体项见[下表](#column)|`array`|`-`|`antdv`||
|show-index-column|显示行号|`boolean`|`true`|`-`||
|index-column-props|序号列属性|`BasicColumn`|`null`|`-`||
|action-column|表格右侧操作列配置 BasicColumn|`BasicColumn`|`null`|`-`||
|ellipsis|文本超过宽度是否显示...|`boolean`|`true`|`-`||
|can-resize|是否可以自适应高度(如果置于PageWrapper组件内，请勿启用PageWrapper的fixedHeight属性，二者不可同时使用)|`boolean`|`true`|`-`||
|clear-select-on-page-change|切换页码是否重置勾选状态|`boolean`|`false`|`-`||
|resize-height-offset|表格自适应高度计算结果会减去这个值|`number`|`0`|`-`||
|title|表格标题|`Function(currentPageData)\|v-slot:title="currentPageData"`|`-`|`antdv`||
|title-help-message|表格标题右侧温馨提醒|`string \| string[]`|`-`|`-`||
|max-height|表格最大高度，超出会显示滚动条|`number`|`-`|`-`||
|pagination|分页器，参考[配置项](#pagination)或 [pagination](/components/pagination-cn/)文档，设为 false 时不展示和进行分页|`object \| `false``|`-`|`antdv`||
|before-edit-submit|单元格编辑状态提交回调，返回false将阻止单元格提交数据到table。该回调在行编辑模式下无效。|`(data: {  record: Recordable;  index: number;  key: string \| number;  value: any;}) => Promise<any>`|`-`|`-`||
|size|表格大小|``large` \| `middle` \| `small``|``large``|`antdv`||
|body-cell|个性化单元格|`v-slot:bodyCell="{text, record, index, column}"`|`-`|`antdv`|3.0|
|bordered|是否展示外边框和列边框|`boolean`|`false`|`antdv`||
|children-column-name|指定树形结构的列名|`string`|``children``|`antdv`||
|components|覆盖默认的 table 元素|`object`|`-`|`antdv`||
|custom-filter-dropdown|自定义筛选菜单，需要配合 `column.customFilterDropdown` 使用|`v-slot:customFilterDropdown="[FilterDropdownProps](#filterdropdownprops)"`|`-`|`antdv`|3.0|
|custom-filter-icon|自定义筛选图标|`v-slot:customFilterIcon="{filtered, column}"`|`-`|`antdv`|3.0|
|custom-header-row|设置头部行属性|`Function(columns, index)`|`-`|`antdv`||
|custom-row|设置行属性|`Function(record, index)`|`-`|`antdv`||
|data-source|数据数组|`object\[]`|`-`|`antdv`||
|default-expand-all-rows|初始时，是否展开所有行|`boolean`|`false`|`antdv`||
|default-expanded-row-keys|默认展开的行|`string\[]`|`-`|`antdv`||
|empty-text|自定义空数据时的显示内容|`v-slot:emptyText`|`-`|`antdv`|3.0|
|expanded-row-keys(v-model)|展开的行，控制属性|`string\[]`|`-`|`antdv`||
|expanded-row-render|额外的展开行|`Function(record, index, indent, expanded):VNode \| v-slot:expandedRowRender="{record, index, indent, expanded}"`|`-`|`antdv`||
|expand-fixed|控制展开图标是否固定，可选 true `left` `right`|`boolean \| string`|`false`|`antdv`|3.0|
|expand-column-title|自定义展开列表头|`v-slot`|`-`|`antdv`|4.0.0|
|expand-icon|自定义展开图标|`Function(props):VNode \| v-slot:expandIcon="props"`|`-`|`antdv`||
|expand-row-by-click|通过点击行来展开子行|`boolean`|``false``|`antdv`||
|footer|表格尾部|`Function(currentPageData)\|v-slot:footer="currentPageData"`|`-`|`antdv`||
|get-popup-container|设置表格内各类浮层的渲染节点，如筛选菜单|`(triggerNode) => HTMLElement`|``() => TableHtmlElement``|`antdv`|1.5.0|
|header-cell|个性化头部单元格|`v-slot:headerCell="{title, column}"`|`-`|`antdv`|3.0|
|loading|页面是否加载中|`boolean\|[object](/components/spin-cn)`|`false`|`antdv`||
|locale|默认文案设置，目前包括排序、过滤、空数据文案|`object`|`filterConfirm: `确定` <br> filterReset: `重置` <br> emptyText: `暂无数据``|`antdv`||
|row-class-name|表格行的类名|`Function(record, index):string`|`-`|`antdv`||
|row-expandable|设置是否允许行展开|`(record) => boolean`|`-`|`antdv`|3.0|
|row-key|表格行 key 的取值，可以是字符串或一个函数|`string\|Function(record):string`|`'key'`|`antdv`||
|row-selection|列表项是否可选择，[配置项](#rowselection)|`object`|`null`|`antdv`||
|scroll|表格是否可滚动，也可以指定滚动区域的宽、高，[配置项](#scroll)|`object`|`-`|`antdv`||
|show-expand-column|设置是否展示行展开列|`boolean`|`true`|`antdv`|3.0|
|show-header|是否显示表头|`boolean`|`true`|`antdv`||
|show-sorter-tooltip|表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性|`boolean \| [Tooltip props](/components/tooltip/)`|`true`|`antdv`|3.0|
|sort-directions|支持的排序方式，取值为 `ascend` `descend`|`Array`|`\[`ascend`, `descend`]`|`antdv`||
|sticky|设置粘性头部和滚动条|`boolean \| `{offsetHeader?: number, offsetScroll?: number, getContainer?: () => HTMLElement}``|`-`|`antdv`|3.0|
|summary|总结栏|`v-slot:summary`|`-`|`antdv`|3.0|
|table-layout|表格元素的 [table-layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout) 属性，设为 `fixed` 表示内容不会影响列的布局|`- \| 'auto' \| 'fixed'`|`无<hr />固定表头/列或使用了 `column.ellipsis` 时，默认值为 `fixed``|`antdv`|1.5.0|
|transform-cell-text|数据渲染前可以再次改变，一般用于空数据的默认配置，可以通过 [ConfigProvider](/components/config-provider-cn/) 全局统一配置|`Function({ text, column, record, index }) => any，此处的 text 是经过其它定义单元格 api 处理后的数据，有可能是 VNode \| string \| number 类型`|`-`|`antdv`|1.5.4|
### `<ent-table>` Events

|事件名|描述|参数|模块|
|---|---|---|---|
|change|分页、排序、筛选变化时触发|-|antdv|
|expand|点击展开图标时触发|-|antdv|
|expanded-rows-change|展开的行变化时触发|-|antdv|
|resize-column|拖动列时触发|-|antdv|



## Type


### TableCurrentDataSource

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|currentDataSource|currentDataSource|`T[]`|`-`|`-`|



### TableRowSelection

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|onChange|Callback executed when selected rows change|`(selectedRowKeys: string[] \| number[], selectedRows: T[]) => any`|`-`|`-`|
|onSelect|Callback executed when select/deselect one row|`(record: T, selected: boolean, selectedRows: any[], nativeEvent: Event) => any`|`-`|`-`|
|onSelectAll|Callback executed when select/deselect all rows|`(selected: boolean, selectedRows: T[], changeRows: T[]) => any`|`-`|`-`|
|onSelectInvert|Callback executed when row selection is inverted|`(selectedRows: string[] \| number[]) => any`|`-`|`-`|



### ExpandedRowRenderRecord

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|indent|indent|`number`|`-`|`-`|
|expanded|expanded|`boolean`|`false`|`-`|



### ColumnFilterItem

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|text|text|`string`|`-`|`-`|
|value|value|`string`|`-`|`-`|
|children|children|`any`|`-`|`-`|



### TableCustomRecord

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|record|record|`T`|`-`|`-`|
|index|index|`number`|`-`|`-`|



### SorterResult

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|column|column|`ColumnProps`|`-`|`-`|
|order|order|`SortOrder`|`-`|`-`|
|field|field|`string`|`-`|`-`|
|columnKey|columnKey|`string`|`-`|`-`|



### FetchParams

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|searchInfo|searchInfo|`Recordable`|`-`|`-`|
|page|page|`number`|`-`|`-`|
|sortInfo|sortInfo|`Recordable`|`-`|`-`|
|filterInfo|filterInfo|`Recordable`|`-`|`-`|



### GetColumnsParams

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|ignoreIndex|ignoreIndex|`boolean`|`false`|`-`|
|ignoreAction|ignoreAction|`boolean`|`false`|`-`|
|sort|sort|`boolean`|`false`|`-`|



### TableActionType

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|reload|reload|`(opt?: FetchParams) => Promise<void>`|`-`|`-`|
|setSelectedRows|setSelectedRows|`(rows: Recordable[]) => void`|`-`|`-`|
|getSelectRows|getSelectRows|`<T = Recordable>() => T[]`|`-`|`-`|
|clearSelectedRowKeys|clearSelectedRowKeys|`() => void`|`-`|`-`|
|expandAll|expandAll|`() => void`|`-`|`-`|
|expandRows|expandRows|`(keys: string[] \| number[]) => void`|`-`|`-`|
|collapseAll|collapseAll|`() => void`|`-`|`-`|
|scrollTo|scrollTo|`(pos: string) => void`|`-`|`-`|
|getSelectRowKeys|getSelectRowKeys|`() => string[]`|`-`|`-`|
|deleteSelectRowByKey|deleteSelectRowByKey|`(key: string) => void`|`-`|`-`|
|setPagination|setPagination|`(info: Partial<PaginationProps>) => void`|`-`|`-`|
|setTableData|setTableData|`<T = Recordable>(values: T[]) => void`|`-`|`-`|
|updateTableDataRecord|updateTableDataRecord|`(rowKey: string \| number, record: Recordable) => Recordable \| void`|`-`|`-`|
|deleteTableDataRecord|deleteTableDataRecord|`(rowKey: string \| number \| string[] \| number[]) => void`|`-`|`-`|
|insertTableDataRecord|insertTableDataRecord|`(record: Recordable \| Recordable[], index?: number) => Recordable[] \| void`|`-`|`-`|
|findTableDataRecord|findTableDataRecord|`(rowKey: string \| number) => Recordable \| void`|`-`|`-`|
|getColumns|getColumns|`(opt?: GetColumnsParams) => BasicColumn[]`|`-`|`-`|
|setColumns|setColumns|`(columns: BasicColumn[] \| string[]) => void`|`-`|`-`|
|getDataSource|getDataSource|`<T = Recordable>() => T[]`|`-`|`-`|
|getRawDataSource|getRawDataSource|`<T = Recordable>() => T`|`-`|`-`|
|setLoading|setLoading|`(loading: boolean) => void`|`-`|`-`|
|setProps|setProps|`(props: Partial<BasicTableProps>) => void`|`-`|`-`|
|redoHeight|redoHeight|`() => void`|`-`|`-`|
|setSelectedRowKeys|setSelectedRowKeys|`(rowKeys: string[] \| number[]) => void`|`-`|`-`|
|getPaginationRef|getPaginationRef|`() => PaginationProps \| boolean`|`-`|`-`|
|getSize|getSize|`() => SizeType`|`-`|`-`|
|getRowSelection|getRowSelection|`() => TableRowSelection<Recordable>`|`-`|`-`|
|getCacheColumns|getCacheColumns|`() => BasicColumn[]`|`-`|`-`|
|emit|emit|`EmitType`|`-`|`-`|
|updateTableData|updateTableData|`(index: number, key: string, value: any) => Recordable`|`-`|`-`|
|setShowPagination|setShowPagination|`(show: boolean) => Promise<void>`|`-`|`-`|
|getShowPagination|getShowPagination|`() => boolean`|`-`|`-`|
|setCacheColumnsByField|setCacheColumnsByField|`(dataIndex: string \| undefined, value: BasicColumn) => void`|`-`|`-`|
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



### BasicTableProps

|参数名|描述|类型|默认值|模块|版本|
|---|---|---|:---:|---|:---|
|clickToRowSelect|clickToRowSelect|`boolean`|`false`|`-`||
|isTreeTable|isTreeTable|`boolean`|`false`|`-`||
|sortFn|sortFn|`(sortInfo: SorterResult) => any`|`-`|`-`||
|filterFn|filterFn|`(data: Partial<Recordable<string[]>>) => any`|`-`|`-`||
|inset|inset|`boolean`|`false`|`-`||
|showTableSetting|showTableSetting|`boolean`|`false`|`-`||
|tableSetting|tableSetting|`TableSetting`|`-`|`-`||
|striped|striped|`boolean`|`false`|`-`||
|autoCreateKey|autoCreateKey|`boolean`|`false`|`-`||
|summaryFunc|summaryFunc|`(...arg: any) => Recordable[]`|`-`|`-`||
|summaryData|summaryData|`Recordable[]`|`-`|`-`||
|showSummary|showSummary|`boolean`|`false`|`-`||
|canColDrag|canColDrag|`boolean`|`false`|`-`||
|api|api|`(...arg: any) => Promise<any>`|`-`|`-`||
|beforeFetch|beforeFetch|`Fn`|`-`|`-`||
|afterFetch|afterFetch|`Fn`|`-`|`-`||
|handleSearchInfoFn|handleSearchInfoFn|`Fn`|`-`|`-`||
|fetchSetting|fetchSetting|`Partial<FetchSetting>`|`-`|`-`||
|immediate|immediate|`boolean`|`false`|`-`||
|emptyDataIsShowTable|emptyDataIsShowTable|`boolean`|`false`|`-`||
|searchInfo|searchInfo|`Recordable`|`-`|`-`||
|defSort|defSort|`Recordable`|`-`|`-`||
|useSearchForm|useSearchForm|`boolean`|`false`|`-`||
|formConfig|formConfig|`Partial<FormProps>`|`-`|`-`||
|columns|columns|`BasicColumn[]`|`-`|`-`||
|showIndexColumn|showIndexColumn|`boolean`|`false`|`-`||
|indexColumnProps|indexColumnProps|`BasicColumn`|`-`|`-`||
|actionColumn|actionColumn|`BasicColumn`|`-`|`-`||
|ellipsis|ellipsis|`boolean`|`false`|`-`||
|isCanResizeParent|isCanResizeParent|`boolean`|`false`|`-`||
|canResize|canResize|`boolean`|`false`|`-`||
|resizeHeightOffset|resizeHeightOffset|`number`|`-`|`-`||
|clearSelectOnPageChange|clearSelectOnPageChange|`boolean`|`false`|`-`||
|rowKey|rowKey|`string \| ((record: Recordable) => string)`|`-`|`-`||
|dataSource|dataSource|`Recordable[]`|`-`|`-`||
|titleHelpMessage|titleHelpMessage|`string \| string[]`|`-`|`-`||
|maxHeight|maxHeight|`number`|`-`|`-`||
|bordered|bordered|`boolean`|`false`|`-`||
|pagination|pagination|`PaginationProps \| boolean`|`-`|`-`||
|loading|loading|`boolean`|`false`|`-`||
|childrenColumnName|The column contains children to display|`string`|`-`|`-`||
|components|Override default table elements|`object`|`-`|`-`||
|defaultExpandAllRows|Expand all rows initially|`boolean`|`false`|`-`||
|defaultExpandedRowKeys|Initial expanded row keys|`string[]`|`-`|`-`||
|expandedRowKeys|Current expanded row keys|`string[]`|`-`|`-`||
|expandedRowRender|Expanded container render for each row|`(record?: ExpandedRowRenderRecord<T>) => VNodeChild \| JSX.Element`|`-`|`-`||
|expandIcon|Customize row expand Icon.|`AnyFunction \| VNodeChild \| JSX.Element`|`-`|`-`||
|expandRowByClick|Whether to expand row by clicking anywhere in the whole row|`boolean`|`false`|`-`||
|expandIconColumnIndex|The index of `expandIcon` which column will be inserted when `expandIconAsCell` is false. default 0|`number`|`-`|`-`||
|footer|Table footer renderer|`AnyFunction \| VNodeChild \| JSX.Element`|`-`|`-`||
|indentSize|Indent size in pixels of tree data|`number`|`-`|`-`||
|locale|i18n text including filter, sort, empty text, etc|`object`|`-`|`-`||
|rowClassName|Row's className|`(record: TableCustomRecord<T>, index: number) => string`|`-`|`-`||
|rowSelection|Row selection config|`TableRowSelection`|`-`|`-`||
|scroll|Set horizontal or vertical scrolling, can also be used to specify the width and height of the scroll area.<br>It is recommended to set a number for x, if you want to set it to true,<br>you need to add style .ant-table td { white-space: nowrap; }.|`{ x?: number \| string \| true; y?: number \| string }`|`-`|`-`||
|showHeader|Whether to show table header|`boolean`|`false`|`-`||
|size|Size of table|`SizeType`|`-`|`-`||
|title|Table title renderer|`VNodeChild \| JSX.Element \| string \| ((data: Recordable) => string)`|`-`|`-`||
|customHeaderRow|Set props on per header row|`(column: ColumnProps, index: number) => object`|`-`|`-`||
|customRow|Set props on per row|`(record: T, index: number) => object`|`-`|`-`||
|tableLayout|`table-layout` attribute of table element<br>`fixed` when header/columns are fixed, or using `column.ellipsis`|`'auto' \| 'fixed' \| string`|`-`|`-`|1.5.0|
|getPopupContainer|the render container of dropdowns in table|`(triggerNode?: HTMLElement) => HTMLElement`|`-`|`-`|1.5.0|
|transformCellText|Data can be changed again before rendering.<br>The default configuration of general user empty data.<br>You can configured globally through [ConfigProvider](https://antdv.com/components/config-provider-cn/)|`AnyFunction`|`-`|`-`|1.5.4|
|beforeEditSubmit|Callback executed before editable cell submit value, not for row-editor<br><br>The cell will not submit data while callback return false|`(data: {    record: Recordable;    index: number;    key: string \| number;    value: any;  }) => Promise<any>`|`-`|`-`||
|onChange|Callback executed when pagination, filters or sorter is changed|`(pagination: any, filters: any, sorter: any, extra: any) => void`|`-`|`-`||
|onExpand|Callback executed when the row expand icon is clicked|`(expande: boolean, record: T) => void`|`-`|`-`||
|onExpandedRowsChange|Callback executed when the expanded rows change|`(expandedRows: string[] \| number[]) => void`|`-`|`-`||
|onColumnsChange|onColumnsChange|`(data: ColumnChangeParam[]) => void`|`-`|`-`||



### BasicColumn

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|children|children|`BasicColumn[]`|`-`|`-`|
|filters|filters|`{    text: string;    value: string;    children?:      \| unknown[]      \| (((props: Record<string, unknown>) => unknown[]) & (() => unknown[]) & (() => unknown[]));  }[]`|`-`|`-`|
|flag|flag|`'INDEX' \| 'DEFAULT' \| 'CHECKBOX' \| 'RADIO' \| 'ACTION'`|`-`|`-`|
|customTitle|customTitle|`VueNode`|`-`|`-`|
|slots|slots|`Recordable`|`-`|`-`|
|defaultHidden|defaultHidden|`boolean`|`false`|`-`|
|helpMessage|helpMessage|`string \| string[]`|`-`|`-`|
|format|format|`CellFormat`|`-`|`-`|
|edit|edit|`boolean`|`false`|`-`|
|editRow|editRow|`boolean`|`false`|`-`|
|editable|editable|`boolean`|`false`|`-`|
|editComponent|editComponent|`ComponentType`|`-`|`-`|
|editComponentProps|editComponentProps|`((opt: {        text: string \| number \| boolean \| Recordable;        record: Recordable;        column: BasicColumn;        index: number;      }) => Recordable)    \| Recordable`|`-`|`-`|
|editRule|editRule|`boolean \| ((text: string, record: Recordable) => Promise<string>)`|`-`|`-`|
|editValueMap|editValueMap|`(value: any) => string`|`-`|`-`|
|onEditRow|onEditRow|`() => void`|`-`|`-`|
|auth|auth|`string \| string[]`|`-`|`-`|
|ifShow|ifShow|`boolean \| ((column: BasicColumn) => boolean)`|`-`|`-`|
|editRender|editRender|`(opt: {    text: string \| number \| boolean \| Recordable;    record: Recordable;    column: BasicColumn;    index: number;  }) => VNodeChild \| JSX.Element`|`-`|`-`|
|editDynamicDisabled|editDynamicDisabled|`boolean \| ((record: Recordable) => boolean)`|`-`|`-`|



### InnerHandlers

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|onColumnsChange|onColumnsChange|`(data: ColumnChangeParam[]) => void`|`-`|`-`|



### PaginationProps

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|total|total number of data items|`number`|`-`|`-`|
|defaultCurrent|default initial page number|`number`|`-`|`-`|
|current|current page number|`number`|`-`|`-`|
|defaultPageSize|default number of data items per page|`number`|`-`|`-`|
|pageSize|number of data items per page|`number`|`-`|`-`|
|hideOnSinglePage|Whether to hide pager on single page|`boolean`|`false`|`-`|
|showSizeChanger|determine whether pageSize can be changed|`boolean`|`false`|`-`|
|pageSizeOptions|specify the sizeChanger options|`string[]`|`-`|`-`|
|showQuickJumper|determine whether you can jump to pages directly|`boolean \| object`|`-`|`-`|
|showTotal|to display the total number and range|`(total: number, range: [number, number]) => any`|`-`|`-`|
|size|specify the size of Pagination, can be set to small|`string`|`-`|`-`|
|simple|whether to setting simple mode|`boolean`|`false`|`-`|
|itemRender|to customize item innerHTML|`(props: PaginationRenderProps) => VNodeChild \| JSX.Element`|`-`|`-`|
|position|specify the position of Pagination|`PaginationPositon[]`|`-`|`-`|



### TableActionItem

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|onClick|onClick|`Fn`|`-`|`-`|
|label|label|`string`|`-`|`-`|
|color|color|`'success' \| 'error' \| 'warning'`|`-`|`-`|
|icon|icon|`string`|`-`|`-`|
|popConfirm|popConfirm|`PopConfirm`|`-`|`-`|
|disabled|disabled|`boolean`|`false`|`-`|
|divider|divider|`boolean`|`false`|`-`|
|auth|auth|`string \| string[]`|`-`|`-`|
|ifShow|ifShow|`boolean \| ((action: TableActionItem) => boolean)`|`-`|`-`|
|tooltip|tooltip|`string \| TooltipProps`|`-`|`-`|



### PopConfirm

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|title|title|`string`|`-`|`-`|
|okText|okText|`string`|`-`|`-`|
|cancelText|cancelText|`string`|`-`|`-`|
|confirm|confirm|`Fn`|`-`|`-`|
|cancel|cancel|`Fn`|`-`|`-`|
|icon|icon|`string`|`-`|`-`|
|placement|placement|`'top'    \| 'left'    \| 'right'    \| 'bottom'    \| 'topLeft'    \| 'topRight'    \| 'leftTop'    \| 'leftBottom'    \| 'rightTop'    \| 'rightBottom'    \| 'bottomLeft'    \| 'bottomRight'`|`-`|`-`|


