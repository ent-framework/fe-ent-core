```yaml
meta:
  type: 组件
  category: basic
title: 通用几个展示组件
description: 一些比较基础的通用组件使用方式
```

@import ./__demo__/basic.md

## API

### EntTitle
用于显示标题，可以显示帮助按钮及文本


### `<ent-title>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|help-message|Help text list or string|`string \| string[]`|`''`|
|span|Whether the color block on the left side of the title|`boolean`|`false`|
|normal|Whether to default the text, that is, not bold|`boolean`|`false`|



### EntArrow
带动画的箭头组件


### `<ent-arrow>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|expand|Arrow expand state|`boolean`|`false`|
|up|Arrow up by default|`boolean`|`false`|
|down|Arrow down by default|`boolean`|`false`|
|inset|Cancel padding/margin for inline|`boolean`|`false`|



### EntHelp
帮助按钮组件


### `<ent-help>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|max-width|Help text max-width|`string`|`'600px'`|
|show-index|Whether to display the serial number|`boolean`|`false`|
|color|Help text font color|`string`|`'#ffffff'`|
|font-size|Help text font size|`string`|`'14px'`|
|placement|Help text list|`string`|`'right'`|
|text|Help text list|`string[] \| string`|`-`|


