```yaml

```

*Auto translate by google.*


## API


### `<ent-lazy-container>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|timeout|Waiting time, if the time is specified, whether visible or not, it will be automatically loaded after the specified time|`number`|`-`|
|viewport|The viewport where the component is located.<br>If the component is scrolling in the page container, the viewport is the container|`HTMLElement`|`() => null`|
|threshold|Preload threshold, css unit|`string`|`'0px'`|
|direction|The scroll direction of the viewport, vertical represents the vertical direction, horizontal represents the horizontal direction|`'vertical' \| 'horizontal'`|`'vertical'`|
|tag|The label name of the outer container that wraps the component|`string`|`'div'`|
|transition-name|transition name|`string`|`'lazy-container'`|








### CollapseContainerOptions

|Name|Description|Type|Default|
|---|---|---|:---:|
|canExpand|是否可折叠|`boolean`|`false`|
|title|标题|`string`|`-`|
|helpMessage|helpMessage|`Array<any> \| string`|`-`|



### ScrollContainerOptions

|Name|Description|Type|Default|
|---|---|---|:---:|
|enableScroll|enableScroll|`boolean`|`false`|
|type|type|`ScrollType`|`-`|


