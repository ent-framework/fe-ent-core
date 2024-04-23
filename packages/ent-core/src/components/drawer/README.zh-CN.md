```yaml
meta:
  type: 组件
  category: 通用
title: Drawer 抽屉组件
description: 对 antdv 的 drawer 组件进行封装，扩展拖拽，全屏，自适应高度等功能。
```


## API


### `<ent-drawer>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|title|抽屉标题|`string`|`-`|`-`|
|is-detail|是否明细页面|`boolean`|`false`|`-`|
|loading-text|装载中显示文本|`string`|`-`|`-`|
|show-detail-back|是否显示退回按钮|`boolean`|`true`|`-`|
|loading|是否正在装载|`boolean`|`false`|`-`|
|close-func|关闭后回调函数|`any`|`null`|`-`|
|show|Whether to show drawer.|`boolean`|`false`|`NDrawer`|
|width|Works when placement is `left` and `right`.|`number \| string`|`-`|`NDrawer`|
|height|Works when placement is `top` and `bottom`.|`number \| string`|`-`|`NDrawer`|
|placement|Drawer placement.|`string`|`-`|`NDrawer`|
|mask-closable|Whether to emit `hide` event when click mask.|`boolean`|`false`|`NDrawer`|
|show-mask|Whether to show mask. If set to `'transparent'`, transparent mask would be shown. If set to false, `trap-focus` will be disabled.|`boolean \| string`|`-`|`NDrawer`|
|to|Container node of the drawer.|`string \| object`|`-`|`NDrawer`|
|display-directive|The display directive to use when `n-drawer` is rendered. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`.|`string`|`-`|`NDrawer`|
|native-scrollbar|Whether to use native scrollbar on drawer.|`boolean`|`false`|`NDrawer`|
|z-index|Z index of the drawer.|`number`|`-`|`NDrawer`|
|scrollbar-props|See [Scrollbar props](scrollbar#Scrollbar-Props).|`object`|`-`|`NDrawer`|
|content-class|Class of drawer's scrollable content node.|`string`|`-`|`NDrawer`|
|content-style|Style of drawer's scrollable content node.|`object \| string`|`-`|`NDrawer`|
|trap-focus|Whether to trap focus inside drawer.|`boolean`|`false`|`NDrawer`|
|auto-focus|Whether to focus the first focusable element inside drawer.|`boolean`|`false`|`NDrawer`|
|close-on-esc|Whether to close drawer on Esc is pressed.|`boolean`|`false`|`NDrawer`|
|block-scroll|Whether to disabled body scrolling when it's active.|`boolean`|`false`|`NDrawer`|
|max-width|Max width of draggable drawer.|`number`|`-`|`NDrawer`|
|max-height|Max height of draggable drawer.|`number`|`-`|`NDrawer`|
|min-width|Min width of draggable drawer.|`number`|`-`|`NDrawer`|
|min-height|Max height of draggable drawer.|`number`|`-`|`NDrawer`|
|resizable|Whether to resize the width / height of drawer.|`boolean`|`false`|`NDrawer`|
|default-width|Default width of the drawer, works when placement is `left` and `right`.|`number \| string`|`-`|`NDrawer`|
|default-height|Default height of the drawer, works when placement is `top` and `bottom`.|`number \| string`|`-`|`NDrawer`|


