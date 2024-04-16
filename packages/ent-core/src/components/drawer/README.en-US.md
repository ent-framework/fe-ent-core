```yaml
meta:
  type: Component
  category: Common
title: Button
description: 
```

*Auto translate by google.*


## API


### `<ent-drawer>` Props

|Attribute|Description|Type|Default|Module|version|
|---|---|---|:---:|---|:---|
|title|标题|`string \| slot`|`-`|`antdv`||
|is-detail|是否明细页面|`boolean`|`false`|`-`||
|loading-text|装载中显示文本|`string`|`-`|`-`||
|show-detail-back|是否显示退回按钮|`boolean`|`true`|`-`||
|loading|是否正在装载|`boolean`|`false`|`-`||
|close-func|关闭后回调函数|`any`|`null`|`-`||
|autofocus|抽屉展开后是否将焦点切换至其 Dom 节点|`boolean`|`true`|`antdv`|3.0.0|
|body-style|可用于设置 Drawer 内容部分的样式|`CSSProperties`|`-`|`antdv`||
|class|Drawer 容器外层 className 设置，如果需要设置最外层，请使用 rootClassName|`string`|`-`|`antdv`||
|closable|是否显示左上角的关闭按钮|`boolean`|`true`|`antdv`||
|close-icon|自定义关闭图标|`VNode \| slot`|``<CloseOutlined />``|`antdv`|3.0.0|
|content-wrapper-style|可用于设置 Drawer 包裹内容部分的样式|`CSSProperties`|`-`|`antdv`|3.0.0|
|destroy-on-close|关闭时销毁 Drawer 里的子元素|`boolean`|`false`|`antdv`||
|extra|抽屉右上角的操作区域|`VNode \| slot`|`-`|`antdv`|3.0.0|
|footer|抽屉的页脚|`VNode \| slot`|`-`|`antdv`|3.0.0|
|footer-style|抽屉页脚部件的样式|`CSSProperties`|`-`|`antdv`|3.0.0|
|force-render|预渲染 Drawer 内元素|`boolean`|`false`|`antdv`|3.0.0|
|get-container|指定 Drawer 挂载的节点，**并在容器内展现** \| `() => HTMLElement` \| Selectors|`'body'`|`-`|`antdv`||
|header-style|用于设置 Drawer 头部的样式|`CSSProperties`|`-`|`antdv`|3.0.0|
|height|高度, 在 `placement` 为 `top` 或 `bottom` 时使用|`string \| number`|`378`|`antdv`||
|keyboard|是否支持键盘 esc 关闭|`boolean`|`true`|`antdv`||
|mask|是否展示遮罩|`Boolean`|`true`|`antdv`||
|mask-closable|点击蒙层是否允许关闭|`boolean`|`true`|`antdv`||
|mask-style|遮罩样式|`CSSProperties`|`{}`|`antdv`||
|placement|抽屉的方向|`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`|`antdv`||
|push|用于设置多层 Drawer 的推动行为|`boolean \| {distance: string \| number}`|`{ distance: 180 }`|`antdv`|3.0.0|
|root-class-name|对话框外层容器的类名|`string`|`-`|`antdv`|4.0|
|root-style|可用于设置 Drawer 最外层容器的样式，和 `style` 的区别是作用节点包括 `mask`|`CSSProperties`|`-`|`antdv`|4.0|
|size|预设抽屉宽度（或高度），default `378px` 和 large `736px`|``default` \| `large``|``default``|`antdv`|3.0.0|
|style|设计 Drawer 容器样式，如果你只需要设置内容部分请使用 `bodyStyle`|`CSSProperties`|`-`|`antdv`||
|open(v-model)|Drawer 是否可见|`boolean`|`-`|`antdv`|4.0|
|width|宽度|`string \| number`|`378`|`antdv`||
|z-index|设置 Drawer 的 `z-index`|`Number`|`1000`|`antdv`||
### `<ent-drawer>` Events

|Event Name|Description|Parameters|Module|
|---|---|---|---|
|close|点击遮罩层或左上角叉或取消按钮的回调|-|antdv|
|after-open-change|切换抽屉时动画结束后的回调|-|antdv|


