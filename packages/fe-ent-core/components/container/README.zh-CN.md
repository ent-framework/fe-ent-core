```yaml
meta:
  type: 组件
  category: 通用
title: 容器
description: 延迟加载，滚动，折叠等容器
```


## API

### 延时加载/懒加载组件, 只在组件可见或者延迟一段时间才进行加载

### `<ent-lazy-container>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|timeout|等待时间，如果指定了时间，不论可见与否，在指定时间之后自动加载|`number`|`-`|`-`|
|viewport|组件所在的视口，如果组件是在页面容器内滚动，视口就是该容器|`HTMLElement`|`() => null`|`-`|
|threshold|预加载阈值, css 单位|`string`|`'0px'`|`-`|
|direction|视口的滚动方向, vertical 代表垂直方向，horizontal 代表水平方向|`'vertical' \| 'horizontal'`|`'vertical'`|`-`|
|tag|包裹组件的外层容器的标签名|`string`|`'div'`|`-`|
|transition-name|transition 动画 name|`string`|`'lazy-container'`|`-`|



### 滚动容器组件

### `<ent-collapse-container>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|title|标题|`string`|`''`|`-`|
|loading|显示加载骨架屏|`boolean`|`false`|`-`|
|can-expan|是否可以展开，为true显示折叠按钮|`boolean`|`true`|`-`|
|help-message|标题右侧温馨提醒|`string[] \| string`|`''`|`-`|
|trigger-window-resize|展开收缩的时候是否触发 window.resize|`boolean`|`false`|`-`|
|lazy-time|延迟加载时间|`number`|`0`|`-`|



### 区域折叠卡片容器

## Types

### CollapseContainerOptions

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|canExpand|是否可折叠|`boolean`|`false`|`-`|
|title|标题|`string`|`-`|`-`|
|helpMessage|helpMessage|`Array<any> \| string`|`-`|`-`|



### ScrollContainerOptions

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|enableScroll|enableScroll|`boolean`|`false`|`-`|
|type|type|`ScrollType`|`-`|`-`|


