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


