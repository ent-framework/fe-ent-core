```yaml
meta:
  type: 组件
  category: basic
title: 通用几个展示组件
description: 一些比较基础的通用组件使用方式
```

@import ./__demo__/basic.md

## API

### EntTitle 用于显示标题，可以显示帮助按钮及文本


### `<ent-title>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|help-message|标题右侧帮助按钮信息|`string \| string[]`|`''`|`-`|
|span|是否显示标题左侧蓝色色块|`boolean`|`false`|`-`|
|normal|将文字默认化，不加粗|`boolean`|`false`|`-`|



### EntArrow 带动画的箭头组件


### `<ent-arrow>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|expand|箭头展开状态|`boolean`|`false`|`-`|
|up|箭头默认向上|`boolean`|`false`|`-`|
|down|箭头默认向下|`boolean`|`false`|`-`|
|inset|取消 padding/margin，用于内嵌|`boolean`|`false`|`-`|



### EntHelp 帮助按钮组件


### `<ent-help>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|max-width|最大宽度|`string`|`'600px'`|`-`|
|show-index|是否显示序号,在 text 为 string[] 情况下生效|`boolean`|`false`|`-`|
|color|颜色|`string`|`'#ffffff'`|`-`|
|font-size|字体大小|`string`|`'14px'`|`-`|
|placement|显示方向，参考 Tooltip 组件|`string`|`'right'`|`-`|
|text|文本列表|`string[] \| string`|`-`|`-`|


