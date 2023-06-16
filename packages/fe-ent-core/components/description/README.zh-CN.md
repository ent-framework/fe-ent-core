```yaml
meta:
  type: 组件
  category: 通用
title: Description 详情组件
description: 对 antdv 的 Descriptions 组件进行封装
```


## API


### `<ent-description>` Props

|参数名|描述|类型|默认值|模块|版本|
|---|---|---|:---:|---|:---|
|use-collapse|是否包裹 CollapseContainer 组件|`boolean`|`true`|`-`||
|collapse-options|CollapseContainer 组件属性|`CollapseContainerOptions`|`null`|`-`||
|schema|详情项配置，见下方 DescItem 配置|`DescItem[]`|`[]`|`-`||
|data|数据源|`object`|`-`|`-`||
|bordered|是否展示边框|`boolean`|`false`|`antdv`||
|colon|配置 `Descriptions.Item` 的 `colon` 的默认值|`boolean`|`true`|`antdv`||
|column|一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}`|`number`|`3`|`antdv`||
|content-style|自定义内容样式|`CSSProperties`|`-`|`antdv`|2.2.0|
|extra|描述列表的操作区域，显示在右上方|`string \| VNode \| slot`|`-`|`antdv`|2.0.0|
|label-style|自定义标签样式|`CSSProperties`|`-`|`antdv`|2.2.0|
|layout|描述布局|``horizontal` \| `vertical``|``horizontal``|`antdv`||
|size|设置列表的大小。可以设置为 `middle` 、`small`, 或不填（只有设置 `bordered={true}` 生效）|``default` \| `middle` \| `small``|``default``|`antdv`||
|title|描述列表的标题，显示在最顶部|`string \| VNode \| slot`|`-`|`antdv`||


