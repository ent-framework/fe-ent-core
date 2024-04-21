```yaml
meta:
  type: 组件
  category: 通用
title: Description 详情组件
description: 对 antdv 的 Descriptions 组件进行封装
```


## API


### `<ent-description>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|use-collapse|是否包裹 CollapseContainer 组件|`boolean`|`true`|`-`|
|collapse-options|CollapseContainer 组件属性|`CollapseContainerOptions`|`null`|`-`|
|schema|详情项配置，见下方 DescItem 配置|`DescItem[]`|`[]`|`-`|
|data|数据源|`object`|`-`|`-`|
|title|Title of the description.|`string`|`-`|`-`|
|column|Total columns.|`number`|`-`|`-`|
|label-placement|Label placement.|`'top' \| 'left'`|`-`|`-`|
|label-align|Label align.|`'center' \| 'left' \| 'right'`|`-`|`-`|
|separator|Separator, only work when `label-placement` is `left` and 　`bordered` is `false`.|`string`|`-`|`-`|
|size|Size of the description.|`'small' \| 'medium' \| 'large'`|`-`|`-`|
|bordered|Whether to display border.|`boolean`|`false`|`-`|
|label-class|Class of the item label.|`string`|`-`|`-`|
|label-style|Style of the item label.|`Object \| string`|`-`|`-`|
|content-class|Class of the item content.|`string`|`-`|`-`|
|content-style|Style of the item content.|`Object \| string`|`-`|`-`|


