```yaml
meta:
  type: 组件
  category: 其他
title: 皮肤/语言/配置
description: 皮肤选择(暗黑模式切换)，语言切换，应用配置
```


## API


### `<ent-lazy-container>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|timeout|Waiting time, if the time is specified, whether visible or not, it will be automatically loaded after the specified time|`number`|`-`|
|viewport|The viewport where the component is located.<br>If the component is scrolling in the page container, the viewport is the container|`HTMLElement`|`() => null`|
|threshold|Preload threshold, css unit|`string`|`'0px'`|
|direction|The scroll direction of the viewport, vertical represents the vertical direction, horizontal represents the horizontal direction|`'vertical' \| 'horizontal'`|`'vertical'`|
|tag|The label name of the outer container that wraps the component|`string`|`'div'`|
|transition-name|transition name|`string`|`'lazy-container'`|








### CollapseContainerOptions

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|canExpand|是否可折叠|`boolean`|`false`|
|title|标题|`string`|`-`|
|helpMessage|helpMessage|`Array<any> \| string`|`-`|



### ScrollContainerOptions

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|enableScroll|enableScroll|`boolean`|`false`|
|type|type|`ScrollType`|`-`|


