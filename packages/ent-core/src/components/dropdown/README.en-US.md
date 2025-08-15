```yaml
meta:
  type: Component
  category: Common
title: Button
description: 
```

*Auto translate by google.*


## API

%%API(src/index.vue)%%

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


