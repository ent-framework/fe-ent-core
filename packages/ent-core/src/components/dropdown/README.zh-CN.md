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
|drop-menu-list|菜单列表|`DropMenu[]`|`[]`|`-`|
### `<ent-dropdown>` Events

|事件名|描述|参数|模块|
|---|---|---|---|
|menu-event|点击菜单时触发|menu: `{onClick?: Function;to?: string;icon?: string;event: string \| number; text: string;disabled?: boolean;divider?: boolean}`|-|



## Type


### DropMenu

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|onClick|菜单的点击事件|`Fn`|`-`|`-`|
|label|菜单的文本|`string`|`-`|`-`|
|appendDivider|下一行追加分割符号|`boolean`|`false`|`-`|
|popConfirmProps|弹窗的配置属性<br>confirmContent - 确认文本|`Partial<PopconfirmProps>`|`-`|`-`|
|confirm|确认文本内容|`string \| (() => VNodeChild)`|`-`|`-`|
|tooltipProps|提示的配置属性|`Partial<TooltipProps>`|`-`|`-`|
|tooltip|提示的内容|`string \| (() => VNodeChild)`|`-`|`-`|


