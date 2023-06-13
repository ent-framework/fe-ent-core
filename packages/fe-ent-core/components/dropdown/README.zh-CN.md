```yaml
meta:
  type: 组件
  category: 通用
title: 按钮
description: 二次封装按钮组件，按钮不需要 import，已经全局注册，直接使用 ent-button 标签即可
```


## API


### `<ent-dropdown>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|popconfirm|是否用popconfirm触发|`boolean`|`false`|`-`|
|trigger|触发方式|`('contextmenu' \| 'click' \| 'hover')[]`|`['contextmenu']`|`-`|
|drop-menu-list|菜单列表|`DropMenu[]`|`[]`|`-`|
|selected-keys|已选中的菜单|`string[]`|`[]`|`-`|
### `<ent-dropdown>` Events

|事件名|描述|参数|模块|
|---|---|---|---|
|menu-event|点击菜单时触发|menu: `{onClick?: Function;to?: string;icon?: string;event: string \| number; text: string;disabled?: boolean;divider?: boolean}`|-|



## Type


### DropMenu

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|onClick|onClick|`Fn`|`-`|`-`|
|to|to|`string`|`-`|`-`|
|icon|icon|`string`|`-`|`-`|
|event|event|`string \| number`|`-`|`-`|
|text|text|`string`|`-`|`-`|
|disabled|disabled|`boolean`|`false`|`-`|
|divider|divider|`boolean`|`false`|`-`|


