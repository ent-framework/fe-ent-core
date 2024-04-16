```yaml

```

*Auto translate by google.*


## API


### `<ent-tree>` Props

|Attribute|Description|Type|Default|Module|version|
|---|---|---|:---:|---|:---|
|title|自定义标题|`slot`|`-`|`antdv`|2.0.0|
|toolbar|是否显示工具栏|`boolean`|`false`|`-`||
|search|显示搜索框|`boolean`|`false`|`-`||
|allow-drop|是否允许拖拽时放置在该节点|`({ dropNode, dropPosition }) => boolean`|`-`|`antdv`||
|auto-expand-parent|是否自动展开父节点|`boolean`|`false`|`antdv`||
|block-node|是否节点占据一行|`boolean`|`false`|`antdv`||
|checkable|节点前添加 Checkbox 复选框|`boolean`|`false`|`antdv`||
|checked-keys(v-model)|（受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置`checkable`和`checkStrictly`，它是一个有`checked`和`halfChecked`属性的对象，并且父子节点的选中与否不再关联|`string\[] \| number\[] \| {checked: string\[] \| number\[], halfChecked: string\[] \| number\[]}`|`\[]`|`antdv`||
|check-strictly|checkable 状态下节点选择完全受控（父子节点选中状态不再关联）|`boolean`|`false`|`antdv`||
|default-expand-all|默认展开所有树节点, 如果是异步数据，需要在数据返回后再实例化，建议用 v-if="data.length"；当有 expandedKeys 时，defaultExpandAll 将失效|`boolean`|`false`|`antdv`||
|disabled|将树禁用|`bool`|`false`|`antdv`||
|draggable|设置节点可拖拽|`boolean`|`false`|`antdv`||
|expanded-keys(v-model)|（受控）展开指定的树节点|`string\[] \| number\[]`|`\[]`|`antdv`||
|field-names|替换 treeNode 中 title,key,children 字段为 treeData 中对应的字段|`object`|`{children:'children', title:'title', key:'key' }`|`antdv`|3.0.0|
|filter-tree-node|按需筛选树节点（高亮），返回 true|`function(node)`|`-`|`antdv`||
|height|设置虚拟滚动容器高度，设置后内部节点不再支持横向滚动|`number`|`-`|`antdv`||
|load-data|异步加载数据|`function(node)`|`-`|`antdv`||
|loaded-keys|（受控）已经加载的节点，需要配合 `loadData` 使用|`string\[] \| number\[]`|`\[]`|`antdv`||
|multiple|支持点选多个节点（节点本身）|`boolean`|`false`|`antdv`||
|selectable|是否可选中|`boolean`|`true`|`antdv`||
|selected-keys(v-model)|（受控）设置选中的树节点|`string\[] \| number\[]`|`-`|`antdv`||
|show-icon|是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式|`boolean`|`false`|`antdv`||
|show-line|是否展示连接线|`boolean \| {showLeafIcon: boolean}(3.0+)`|`false`|`antdv`||
|switcher-icon|自定义树节点的展开/折叠图标|`v-slot:switcherIcon="{active, checked, expanded, loading, selected, halfChecked, title, key, children, dataRef, data, defaultIcon, switcherCls}"`|`-`|`antdv`||
|tree-data|treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）|`[TreeNode\[\]](#treenode)`|`--`|`antdv`||
|virtual|设置 false 时关闭虚拟滚动|`boolean`|`true`|`antdv`|3.0|
### `<ent-tree>` Events

|Event Name|Description|Parameters|Module|
|---|---|---|---|
|check|点击复选框触发|-|antdv|
|dragend|dragend 触发时调用|-|antdv|
|dragenter|dragenter 触发时调用|-|antdv|
|dragleave|dragleave 触发时调用|-|antdv|
|dragover|dragover 触发时调用|-|antdv|
|dragstart|开始拖拽时调用|-|antdv|
|drop|drop 触发时调用|-|antdv|
|expand|展开/收起节点时触发|-|antdv|
|load|节点加载完毕时触发|-|antdv|
|right-click|响应右键点击|-|antdv|
|select|点击树节点触发|-|antdv|



