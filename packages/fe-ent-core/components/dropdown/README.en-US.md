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
|popconfirm|是否用popconfirm触发|`boolean`|`false`|`-`|
|trigger|触发方式|`('contextmenu' \| 'click' \| 'hover')[]`|`['contextmenu']`|`-`|
|drop-menu-list|菜单列表|`DropMenu[]`|`[]`|`-`|
|selected-keys|已选中的菜单|`string[]`|`[]`|`-`|
### `<ent-dropdown>` Events

|Event Name|Description|Parameters|Module|
|---|---|---|---|
|menu-event|点击菜单时触发|menu: `{onClick?: Function;to?: string;icon?: string;event: string \| number; text: string;disabled?: boolean;divider?: boolean}`|-|



## Type


### DropMenu

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|onClick|onClick|`Fn`|`-`|`-`|
|to|to|`string`|`-`|`-`|
|icon|icon|`string`|`-`|`-`|
|event|event|`string \| number`|`-`|`-`|
|text|text|`string`|`-`|`-`|
|disabled|disabled|`boolean`|`false`|`-`|
|divider|divider|`boolean`|`false`|`-`|


