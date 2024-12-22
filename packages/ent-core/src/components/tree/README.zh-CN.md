```yaml
meta:
  type: 组件
  category: 容器
title: 树 Tree
description: 对 antv 的 tree 组件进行封装
```


## API


### `<ent-tree>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|toolbar|是否显示工具栏|`boolean`|`false`|`-`|
|search|显示搜索框|`boolean`|`false`|`-`|
|accordion|Whether to use accrodion expand mode.|`boolean`|`false`|`NTree`|
|show-irrelevant-nodes|Whether to filter unmached nodes when tree is in filter mode.|`boolean`|`false`|`NTree`|
|data|The node data of the tree. Reset `data` will cause clearing of some uncontrolled status. If you need to modify data, you'd better make tree work in a controlled manner.|`Array<TreeOption>`|`-`|`NTree`|
|expand-on-dragenter|Whether to expand nodes after dragenter.|`boolean`|`false`|`NTree`|
|expand-on-click|Whether to expand or collapse nodes after click.|`boolean`|`false`|`NTree`|
|check-on-click|Allow node clicking to trigger check when `checkable` is `true`.|`boolean \| ((node: TreeOption) => boolean)`|`-`|`NTree`|
|cancelable|Whether node's select status can be cancelled.|`boolean`|`false`|`NTree`|
|checkable|Whether to display the selection box.|`boolean`|`false`|`NTree`|
|draggable|Whether it can be dragged.|`boolean`|`false`|`NTree`|
|block-node|The node name is spread out in the whole row.|`boolean`|`false`|`NTree`|
|block-line|Nodes spread out the whole row.|`boolean`|`false`|`NTree`|
|show-line|Whether to display the connection line.|`boolean`|`false`|`NTree`|
|disabled|是否禁用|`boolean`|`false`|`NTree`|
|checked-keys|Checked keys of the tree.|`Array<string \| number>`|`-`|`NTree`|
|default-checked-keys|Multiple options selected by default.|`Array<string \| number>`|`-`|`NTree`|
|selected-keys|If set, selected status will work in controlled manner.|`Array<string \| number>`|`-`|`NTree`|
|default-selected-keys|Nodes selected by default.|`Array<string \| number>`|`-`|`NTree`|
|multiple|Whether to allow multiple selection of nodes.|`boolean`|`false`|`NTree`|
|pattern|What to search by default.|`string`|`-`|`NTree`|
|cascade|Whether to cascade checkboxes.|`boolean`|`false`|`NTree`|
|selectable|Whether the node can be selected.|`boolean`|`false`|`NTree`|
|scrollbar-props|See [Scrollbar props](scrollbar#Scrollbar-Props)|`ScrollbarProps`|`-`|`NTree`|
|allow-drop|Whether to allow dropping.|`(info: { dropPosition: DropPosition, node: TreeOption, phase: 'drag' \| 'drop' }) => boolean`|`-`|`NTree`|
|animated|Whether to show expand animation.|`boolean`|`false`|`NTree`|
|checkbox-placement|Checkbox's placement.|`'left' \| 'right'`|`-`|`NTree`|
|virtual-scroll|Whether to enable virtual scroll. You need to set proper style height of the tree in advance.|`boolean`|`false`|`NTree`|
|watch-props|Default prop names that needed to be watched. Components will be updated after the prop is changed. Note: the `watch-props` itself is not reactive.|`Array<'defaultCheckedKeys' \| 'defaultSelectedKeys' \|'defaultExpandedKeys'>`|`-`|`NTree`|
|render-label|Render function of all the options' label.|`(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild`|`-`|`NTree`|
|render-prefix|Render function of all the options' prefix.|`(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild`|`-`|`NTree`|
|render-suffix|Render function of all the options' suffix.|`(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild`|`-`|`NTree`|
|node-props|HTML attributes of node.|`(info: { option: TreeOption }) => HTMLAttributes`|`-`|`NTree`|
|keyboard|Whether to support keyboard operation.|`boolean`|`false`|`NTree`|
|get-children|Get children of the option.|`(option: any) => unknown`|`-`|`NTree`|
|allow-checking-not-loaded|Whether to allow cascade checking on not loaded nodes. If you want to use this, you should know the `check-keys` may be incomplete. Also, you should aware about the consistency bewteen naive's checking logic and your backend's checking logic, especially when there are disabled nodes.|`boolean`|`false`|`NTree`|
|filter|The function that filter tree nodes based on pattern.|`(pattern: string, node: TreeOption) => boolean`|`-`|`NTree`|
|default-expand-all|Expand all options.|`boolean`|`false`|`NTree`|
|expanded-keys|If set, expanded status will work in controlled manner.|`Array<string \| number>`|`-`|`NTree`|
|key-field|The key field in `TreeOption`.|`string`|`-`|`NTree`|
|label-field|The label field in `TreeOption`.|`string`|`-`|`NTree`|
|children-field|The children field in `TreeOption`.|`string`|`-`|`NTree`|
|disabled-field|The disabled field in `TreeOption`.|`string`|`-`|`NTree`|
|default-expanded-keys|Expanded items by default.|`Array<string \| number>`|`-`|`NTree`|
|indeterminate-keys|Indeterminate keys of the tree.|`Array<string \| number>`|`-`|`NTree`|
|render-switcher-icon|Render function of option switcher icon.|`(props: { option: TreeOption, expanded: boolean, selected: boolean }) => VNodeChild`|`-`|`NTree`|
|override-default-node-click-behavior|Override default node click behavior.|`(info: { option: TreeSelectOption }) => 'toggleExpand' \| 'toggleSelect' \| 'toggleCheck' \| 'default' \| 'none'`|`-`|`NTree`|
|check-strategy|The strategy of setting checked callback's keys argument. `all` means setting all checked node. `parent` means setting all checked parent node of whom all child node are checked. `child` means setting all child node.|`string`|`-`|`NTree`|



