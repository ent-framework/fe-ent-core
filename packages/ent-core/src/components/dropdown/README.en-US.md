```yaml
meta:
  type: Component
  category: Common
title: Button
description: 
```

*Auto translate by google.*


## API


### `<ent-dropdown>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|drop-menu-list|菜单列表|`DropMenu[]`|`[]`|`-`|
|disabled|Whether to disable|`boolean`|`false`|`NDropdown`|
|animated|Use an animation when showing options.|`boolean`|`false`|`NDropdown`|
|keyboard|Whether the component supports keyboard operation. (Be careful about the potential conflicts with other components keyboard operations)|`boolean`|`false`|`NDropdown`|
|size|Dropdown size.|`'small'\|'medium'\|'large'\|'huge'`|`-`|`NDropdown`|
|inverted|Use the inverted style.|`boolean`|`false`|`NDropdown`|
|options|Dropdown options.|`Array<DropdownOption \| DropdownGroupOption \| DropdownDividerOption \| DropdownRenderOption>`|`-`|`NDropdown`|
|menu-props|Menu HTML attributes generator.|`(option: DropdownOption \| undefined, options: (DropdownOption \| DropdownGroupOption)[]) => HTMLAttributes`|`-`|`NDropdown`|
|render-label|Render function that renders option labels.|`(option: DropdownOption) => VNodeChild`|`-`|`NDropdown`|
|render-icon|Render function that renders option icons.|`(option: DropdownOption) => VNodeChild`|`-`|`NDropdown`|
|render-option|Render function that renders option itself.|`(props: { node: VNode, option: DropdownOption \| DropdownGroupOption }) => VNodeChild`|`-`|`NDropdown`|
|node-props|Option HTML attributes generator.|`(option: DropdownOption \| DropdownGroupOption) => HTMLAttributes`|`-`|`NDropdown`|
|label-field|Field name of label.|`string`|`-`|`NDropdown`|
|key-field|Field name of key.|`string`|`-`|`NDropdown`|
|children-field|Field name of children.|`string`|`-`|`NDropdown`|
### `<ent-dropdown>` Events

|Event Name|Description|Parameters|Module|
|---|---|---|---|
|menu-event|点击菜单时触发|menu: `{onClick?: Function;to?: string;icon?: string;event: string \| number; text: string;disabled?: boolean;divider?: boolean}`|-|



## Type


### DropMenu

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|onClick|菜单的点击事件|`Fn`|`-`|`-`|
|label|菜单的文本|`string`|`-`|`-`|
|appendDivider|下一行追加分割符号|`boolean`|`false`|`-`|
|popConfirmProps|弹窗的配置属性<br>confirmContent - 确认文本|`Partial<PopconfirmProps>`|`-`|`-`|
|confirm|确认文本内容|`string \| (() => VNodeChild)`|`-`|`-`|
|tooltipProps|提示的配置属性|`Partial<TooltipProps>`|`-`|`-`|
|tooltip|提示的内容|`string \| (() => VNodeChild)`|`-`|`-`|


