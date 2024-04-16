```yaml
meta:
  type: 组件
  category: 容器
title: Modal
description: 对 antv 的 modal 组件进行封装，扩展拖拽，全屏，自适应高度等功能
```


## API


### `<ent-modal>` Props

|参数名|描述|类型|默认值|模块|版本|
|---|---|---|:---:|---|:---|
|default-fullscreen|默认全屏|`boolean`|`false`|`-`||
|can-fullscreen|是否可以进行全屏|`boolean`|`true`|`-`||
|wrapper-footer-offset|开启是适应高度后，如果超过屏幕高度，底部和顶部会保持一样的间距，该参数可以用来缩小底部的间距|`number`|`0`|`-`||
|help-message|标题右侧提示文本|`string \| string[]`|`-`|`-`||
|use-wrapper|是否开启自适应高度，开启后会跟随屏幕变化自适应内容，并出现滚动条|`boolean`|`true`|`-`||
|confirm-loading|确定按钮 loading|`boolean`|`无`|`antdv`||
|loading|loading 状态|`boolean`|`false`|`-`||
|loading-tip|loading 文本|`string`|`-`|`-`||
|show-cancel-btn|显示关闭按钮|`boolean`|`true`|`-`||
|show-ok-btn|显示确认按钮|`boolean`|`true`|`-`||
|after-close|Modal 完全关闭后的回调|`function`|`无`|`antdv`||
|body-style|Modal body 样式|`object`|`{}`|`antdv`||
|cancel-button-props|cancel 按钮 props|`[ButtonProps](/components/button/#api)`|`-`|`antdv`||
|cancel-text|取消按钮文字|`string\| slot`|`取消`|`antdv`||
|centered|垂直居中展示 Modal|`boolean`|``false``|`antdv`||
|closable|是否显示右上角的关闭按钮|`boolean`|`true`|`antdv`||
|close-icon|自定义关闭图标|`VNode \| slot`|`-`|`antdv`||
|destroy-on-close|关闭时销毁 Modal 里的子元素|`boolean`|`false`|`antdv`||
|dialog-class|可用于设置浮层的类名|`string`|`-`|`antdv`||
|dialog-style|可用于设置浮层的样式，调整浮层位置等|`object`|`-`|`antdv`||
|footer|底部内容，当不需要默认底部按钮时，可以设为 `:footer="null"`|`string\|slot`|`确定取消按钮`|`antdv`||
|force-render|强制渲染 Modal|`boolean`|`false`|`antdv`||
|get-container|指定 Modal 挂载的 HTML 节点|`(instance): HTMLElement`|`() => document.body`|`antdv`||
|keyboard|是否支持键盘 esc 关闭|`boolean`|`true`|`antdv`||
|mask|是否展示遮罩|`boolean`|`true`|`antdv`||
|mask-closable|点击蒙层是否允许关闭|`boolean`|`true`|`antdv`||
|mask-style|遮罩样式|`object`|`{}`|`antdv`||
|ok-button-props|ok 按钮 props|`[ButtonProps](/components/button/#api)`|`-`|`antdv`||
|ok-text|确认按钮文字|`string\|slot`|`确定`|`antdv`||
|ok-type|确认按钮类型|`string`|`primary`|`antdv`||
|title|标题|`string\|slot`|`无`|`antdv`||
|open(v-model)|对话框是否可见|`boolean`|`无`|`antdv`||
|width|宽度|`string\|number`|`520`|`antdv`||
|wrap-class-name|对话框外层容器的类名|`string`|`-`|`antdv`||
|z-index|设置 Modal 的 `z-index`|`number`|`1000`|`antdv`||
### `<ent-modal>` Events

|事件名|描述|参数|模块|
|---|---|---|---|
|cancel|点击遮罩层或右上角叉或取消按钮的回调|-|antdv|
|ok|点击确定回调|-|antdv|



