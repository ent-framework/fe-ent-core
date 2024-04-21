```yaml

```

*Auto translate by google.*


## API


### `<ent-modal>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|default-fullscreen|默认全屏|`boolean`|`false`|`-`|
|can-fullscreen|是否可以进行全屏|`boolean`|`true`|`-`|
|wrapper-footer-offset|开启是适应高度后，如果超过屏幕高度，底部和顶部会保持一样的间距，该参数可以用来缩小底部的间距|`number`|`0`|`-`|
|help-message|标题右侧提示文本|`string \| string[]`|`-`|`-`|
|use-wrapper|是否开启自适应高度，开启后会跟随屏幕变化自适应内容，并出现滚动条|`boolean`|`true`|`-`|
|loading-tip|loading 文本|`string`|`-`|`-`|
|show-cancel-btn|显示关闭按钮|`boolean`|`true`|`-`|
|show-ok-btn|显示确认按钮|`boolean`|`true`|`-`|
|show|Whether to show modal.|`boolean`|`false`|`-`|
|mask-closable|Whether to emit `hide` event when click mask.|`boolean`|`false`|`-`|
|preset|The preset of `n-modal`.|`'dialog' \| 'card'`|`-`|`-`|
|to|Container node of the modal content.|`string \| HTMLElement`|`-`|`-`|
|display-directive|Use which directive to control the rendering of modal body.|`'if' \| 'show'`|`-`|`-`|
|transform-origin|The transform origin of the modal's display animation.|`'mouse' \| 'center'`|`-`|`-`|
|z-index|Z index of the modal.|`number`|`-`|`-`|
|auto-focus|Whether to focus the first focusable element inside modal.|`boolean`|`false`|`-`|
|trap-focus|Whether to trap focus inside modal.|`boolean`|`false`|`-`|
|close-on-esc|Whether to close modal on Esc is pressed.|`boolean`|`false`|`-`|
|block-scroll|Whether to disabled body scrolling when it's active.|`boolean`|`false`|`-`|



