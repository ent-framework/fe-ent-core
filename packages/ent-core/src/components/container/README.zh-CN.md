```yaml
meta:
  type: 组件
  category: 通用
title: 容器
description: 延迟加载，滚动，折叠等容器
```


## API

### 延时加载/懒加载组件, 只在组件可见或者延迟一段时间才进行加载
%%API(src/lazy-container.vue)%%

### 滚动容器组件
%%API(src/collapse/collapse-container.vue)%%

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


