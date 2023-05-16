```yaml
meta:
  type: 组件
  category: 其他
title: 固钉 Affix
description: 将页面元素钉在可视范围。当内容区域比较长，需要滚动页面时，固钉可以将内容固定在屏幕上。常用于侧边菜单和按钮组合。
```

@import ./__demo__/basic.md

## API


### `<basic-title>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|help-message|Help text list or string|`string \| string[]`|`''`|
|span|Whether the color block on the left side of the title|`boolean`|`false`|
|normal|Whether to default the text, that is, not bold|`boolean`|`false`|



### `<basic-arrow>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|expand|Arrow expand state|`boolean`|`false`|
|up|Arrow up by default|`boolean`|`false`|
|down|Arrow down by default|`boolean`|`false`|
|inset|Cancel padding/margin for inline|`boolean`|`false`|



### `<ent-help>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|max-width|Help text max-width|`string`|`'600px'`|
|show-index|Whether to display the serial number|`boolean`|`false`|
|color|Help text font color|`string`|`'#ffffff'`|
|font-size|Help text font size|`string`|`'14px'`|
|placement|Help text list|`string`|`'right'`|
|text|Help text list|`string[] \| string`|`-`|


