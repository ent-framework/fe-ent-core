```yaml

```

*Auto translate by google.*


## API


### `<ent-tree>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|toolbar|是否显示工具栏|`boolean`|`false`|`-`|
|search|显示搜索框|`boolean`|`false`|`-`|
|accordion|Whether to use accrodion expand mode.|`boolean`|`false`|`-`|
|show-irrelevant-nodes|Whether to filter unmached nodes when tree is in filter mode.|`boolean`|`false`|`-`|
|data|The node data of the tree. Reset `data` will cause clearing of some uncontrolled status. If you need to modify data, you'd better make tree work in a controlled manner.|`Array<TreeOption>`|`-`|`-`|
|expand-on-dragenter|Whether to expand nodes after dragenter.|`boolean`|`false`|`-`|
|expand-on-click|Whether to expand or collapse nodes after click.|`boolean`|`false`|`-`|
|check-on-click|Allow node clicking to trigger check when `checkable` is `true`.|`boolean \| ((node: TreeOption) => boolean)`|`-`|`-`|
|cancelable|Whether node's select status can be cancelled.|`boolean`|`false`|`-`|
|checkable|Whether to display the selection box.|`boolean`|`false`|`-`|
|draggable|Whether it can be dragged.|`boolean`|`false`|`-`|
|block-node|The node name is spread out in the whole row.|`boolean`|`false`|`-`|
|block-line|Nodes spread out the whole row.|`boolean`|`false`|`-`|
|show-line|Whether to display the connection line.|`boolean`|`false`|`-`|
|disabled|Whether to disable|`boolean`|`false`|`-`|
|checked-keys|Checked keys of the tree.|`Array<string \| number>`|`-`|`-`|
|default-checked-keys|Multiple options selected by default.|`Array<string \| number>`|`-`|`-`|
|selected-keys|If set, selected status will work in controlled manner.|`Array<string \| number>`|`-`|`-`|
|default-selected-keys|Nodes selected by default.|`Array<string \| number>`|`-`|`-`|
|multiple|Whether to allow multiple selection of nodes.|`boolean`|`false`|`-`|
|pattern|What to search by default.|`string`|`-`|`-`|
|cascade|Whether to cascade checkboxes.|`boolean`|`false`|`-`|
|selectable|Whether the node can be selected.|`boolean`|`false`|`-`|
|scrollbar-props|See [Scrollbar props](scrollbar#Scrollbar-Props)|`object`|`-`|`-`|
|allow-drop|Whether to allow dropping.|`(info: { dropPosition: DropPosition, node: TreeOption, phase: 'drag' \| 'drop' }) => boolean`|`-`|`-`|
|animated|Whether to show expand animation.|`boolean`|`false`|`-`|
|checkbox-placement|Checkbox's placement.|`'left' \| 'right'`|`-`|`-`|
|virtual-scroll|Whether to enable virtual scroll. You need to set proper style height of the tree in advance.|`boolean`|`false`|`-`|
|watch-props|Default prop names that needed to be watched. Components will be updated after the prop is changed. Note: the `watch-props` itself is not reactive.|`Array<'defaultCheckedKeys' \| 'defaultSelectedKeys' \|'defaultExpandedKeys'>`|`-`|`-`|
|render-label|Render function of all the options' label.|`(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild`|`-`|`-`|
|render-prefix|Render function of all the options' prefix.|`(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild`|`-`|`-`|
|render-suffix|Render function of all the options' suffix.|`(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild`|`-`|`-`|
|node-props|HTML attributes of node.|`(info: { option: TreeOption }) => HTMLAttributes`|`-`|`-`|
|keyboard|Whether to support keyboard operation.|`boolean`|`false`|`-`|
|get-children|Get children of the option.|`(option: any) => unknown`|`-`|`-`|
|allow-checking-not-loaded|Whether to allow cascade checking on not loaded nodes. If you want to use this, you should know the `check-keys` may be incomplete. Also, you should aware about the consistency bewteen naive's checking logic and your backend's checking logic, especially when there are disabled nodes.|`boolean`|`false`|`-`|
|filter|The function that filter tree nodes based on pattern.|`(pattern: string, node: TreeOption) => boolean`|`-`|`-`|
|default-expand-all|Expand all options.|`boolean`|`false`|`-`|
|expanded-keys|If set, expanded status will work in controlled manner.|`Array<string \| number>`|`-`|`-`|
|key-field|The key field in `TreeOption`.|`string`|`-`|`-`|
|label-field|The label field in `TreeOption`.|`string`|`-`|`-`|
|children-field|The children field in `TreeOption`.|`string`|`-`|`-`|
|disabled-field|The disabled field in `TreeOption`.|`string`|`-`|`-`|
|default-expanded-keys|Expanded items by default.|`Array<string \| number>`|`-`|`-`|
|indeterminate-keys|Indeterminate keys of the tree.|`Array<string \| number>`|`-`|`-`|
|render-switcher-icon|Render function of option switcher icon.|`(props: { option: TreeOption, expanded: boolean, selected: boolean }) => VNodeChild`|`-`|`-`|
|override-default-node-click-behavior|Override default node click behavior.|`(info: { option: TreeSelectOption }) => 'toggleExpand' \| 'toggleSelect' \| 'toggleCheck' \| 'default' \| 'none'`|`-`|`-`|
|check-strategy|The strategy of setting checked callback's keys argument. `all` means setting all checked node. `parent` means setting all checked parent node of whom all child node are checked. `child` means setting all child node.|`string`|`-`|`-`|



