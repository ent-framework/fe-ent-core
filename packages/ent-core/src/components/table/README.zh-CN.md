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
|row-selection|列表项是否可选择，[配置项](#rowselection)|`object`|`null`|`antdv`||
|is-tree-table|是否树表|`boolean`|`false`|`-`||
|inset|取消表格的默认 padding|`boolean`|`false`|`-`||
|sort-fn|自定义排序方法。见下方全局配置说明|`Function`|`DEFAULT_SORT_FN`|`-`||
|filter-fn|自定义过滤方法。见下方全局配置说明|`Function`|`DEFAULT_FILTER_FN`|`-`||
|api|请求接口，可以直接将src/api内的函数直接传入|`Function`|`null`|`-`||
|before-fetch|请求之前对参数进行处理|`Function`|`null`|`-`||
|after-fetch|请求之后对返回值进行处理|`Function`|`null`|`-`||
|handle-search-info-fn|开启表单后，在请求之前处理搜索条件参数|`Function`|`null`|`-`||
|fetch-setting|接口请求配置，可以配置请求的字段和响应的字段名，见下方全局配置说明|`object`|`() => FETCH_SETTING`|`-`||
|immediate|组件加载后是否立即请求接口，在 api 有传的情况下，如果为 false，需要自行使用 reload 加载表格数据|`boolean`|`true`|`-`||
|search-info|额外的请求参数|`object`|`null`|`-`||
|def-sort|默认的排序参数|`object`|`null`|`-`||
|use-search-form|使用搜索表单|`boolean`|`false`|`-`||
|form-config|搜索表单配置|`object`|`null`|`-`||
|show-index-column|显示行号|`boolean`|`true`|`-`||
|index-column-props|序号列属性|`BasicColumn`|`() => {
  return {
    width: 50,
  };
}`|`-`||
|action-column|表格右侧操作列配置 BasicColumn|`BasicColumn`|`null`|`-`||
|selection-column|选择行的配置|`Partial<DataTableSelectionColumn>`|`-`|`-`||
|expand-column|展开行的配置|`Partial<DataTableExpandColumn>`|`-`|`-`||
|ellipsis|文本超过宽度是否显示..., 全局设置，可以被column上的ellipsis属性覆盖|`boolean`|`true`|`-`||
|can-resize|是否可以自适应高度(如果置于PageWrapper组件内，请勿启用PageWrapper的fixedHeight属性，二者不可同时使用)|`boolean`|`true`|`-`||
|clear-select-on-page-change|切换页码是否重置勾选状态|`boolean`|`false`|`-`||
|body-cell|个性化单元格|`v-slot:bodyCell="{text, record, index, column}"`|`-`|`antdv`|3.0|
|bordered|是否展示外边框和列边框|`boolean`|`false`|`antdv`||
|children-column-name|指定树形结构的列名|`string`|``children``|`antdv`||
|columns|表格列的配置描述，具体项见[下表](#column)|`array`|`-`|`antdv`||
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
|indent-size|展示树形数据时，每层缩进的宽度，以 px 为单位|`number`|`15`|`antdv`||
|loading|页面是否加载中|`boolean\|[object](/components/spin-cn)`|`false`|`antdv`||
|locale|默认文案设置，目前包括排序、过滤、空数据文案|`object`|`filterConfirm: `确定` <br> filterReset: `重置` <br> emptyText: `暂无数据``|`antdv`||
|pagination|分页器，参考[配置项](#pagination)或 [pagination](/components/pagination-cn/)文档，设为 false 时不展示和进行分页|`object \| `false``|`-`|`antdv`||
|row-class-name|表格行的类名|`Function(record, index):string`|`-`|`antdv`||
|row-expandable|设置是否允许行展开|`(record) => boolean`|`-`|`antdv`|3.0|
|row-key|表格行 key 的取值，可以是字符串或一个函数|`string\|Function(record):string`|`'key'`|`antdv`||
|scroll|表格是否可滚动，也可以指定滚动区域的宽、高，[配置项](#scroll)|`object`|`-`|`antdv`||
|show-expand-column|设置是否展示行展开列|`boolean`|`true`|`antdv`|3.0|
|show-header|是否显示表头|`boolean`|`true`|`antdv`||
|show-sorter-tooltip|表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性|`boolean \| [Tooltip props](/components/tooltip/)`|`true`|`antdv`|3.0|
|size|表格大小|``large` \| `middle` \| `small``|``large``|`antdv`||
|sort-directions|支持的排序方式，取值为 `ascend` `descend`|`Array`|`\[`ascend`, `descend`]`|`antdv`||
|sticky|设置粘性头部和滚动条|`boolean \| `{offsetHeader?: number, offsetScroll?: number, getContainer?: () => HTMLElement}``|`-`|`antdv`|3.0|
|summary|总结栏|`v-slot:summary`|`-`|`antdv`|3.0|
|table-layout|表格元素的 [table-layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout) 属性，设为 `fixed` 表示内容不会影响列的布局|`- \| 'auto' \| 'fixed'`|`无<hr />固定表头/列或使用了 `column.ellipsis` 时，默认值为 `fixed``|`antdv`|1.5.0|
|title|表格标题|`Function(currentPageData)\|v-slot:title="currentPageData"`|`-`|`antdv`||
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
|type|type|`RowSelectionType`|`-`|`-`|
|selectedRowKeys|selectedRowKeys|`DataTableRowKey[]`|`-`|`-`|
|defaultSelectedRowKeys|defaultSelectedRowKeys|`DataTableRowKey[]`|`-`|`-`|
|selectedRows|selectedRows|`Recordable[]`|`-`|`-`|
|defaultSelectedRows|defaultSelectedRows|`Recordable[]`|`-`|`-`|



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
|searchInfo|Search queries|`Recordable`|`-`|`-`|
|page|Page size|`number`|`-`|`-`|
|sortInfo|Sort settings|`Recordable`|`-`|`-`|
|filterInfo|filter info, additional params for filter data.|`Recordable`|`-`|`-`|



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
|setSelectedRowKeys|setSelectedRowKeys|`(    keys: DataTableRowKey[],    rows: Recordable[],    meta: { row: Recordable \| undefined; action: 'check' \| 'uncheck' \| 'checkAll' \| 'uncheckAll' },  ) => void`|`-`|`-`|
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
|flag|flag|`'_INDEX' \| '_ACTION' \| '_EXPAND'`|`-`|`-`|
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


