```yaml

```

*Auto translate by google.*


## API

### 延时加载/懒加载组件, 只在组件可见或者延迟一段时间才进行加载

### `<ent-lazy-container>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|timeout|Waiting time, if the time is specified, whether visible or not, it will be automatically loaded after the specified time|`number`|`-`|`-`|
|viewport|The viewport where the component is located. If the component is scrolling in the page container, the viewport is the container|`HTMLElement`|`() => null`|`-`|
|threshold|Preload threshold, css unit|`string`|`'0px'`|`-`|
|direction|The scroll direction of the viewport, vertical represents the vertical direction, horizontal represents the horizontal direction|`'vertical' \| 'horizontal'`|`'vertical'`|`-`|
|tag|The label name of the outer container that wraps the component|`string`|`'div'`|`-`|
|transition-name|transition name|`string`|`'lazy-container'`|`-`|



### 滚动容器组件

### `<ent-collapse-container>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|title|标题|`string`|`''`|`-`|
|loading|显示加载骨架屏|`boolean`|`false`|`-`|
|can-expan|Can it be expanded|`boolean`|`true`|`-`|
|help-message|Warm reminder on the right side of the title|`string[] \| string`|`''`|`-`|
|trigger-window-resize|Whether to trigger window.resize when expanding and contracting, Can adapt to tables and forms, when the form shrinks, the form triggers resize to adapt to the height|`boolean`|`false`|`-`|
|lazy-time|Delayed loading time|`number`|`0`|`-`|



### 区域折叠卡片容器

## Types

### CollapseContainerOptions

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|canExpand|是否可折叠|`boolean`|`false`|`-`|
|title|标题|`string`|`-`|`-`|
|helpMessage|helpMessage|`Array<any> \| string`|`-`|`-`|



### ScrollContainerOptions

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|enableScroll|enableScroll|`boolean`|`false`|`-`|
|type|type|`ScrollType`|`-`|`-`|


