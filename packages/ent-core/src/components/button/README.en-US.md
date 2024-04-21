```yaml
meta:
  type: Component
  category: Common
title: Button
description: 
```

*Auto translate by google.*


## API


### `<ent-button>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|icon|按钮图标，参考 Icon 组件|`string`|`-`|`-`|
|color|Button color (support `#FFF`, `#FFFFFF`, `yellow`,`rgb(0, 0, 0)` formatted colors).|`string`|`-`|`-`|
|text-color|Button text color (support `#FFF`, `#FFFFFF`, `yellow`,`rgb(0, 0, 0)` formatted colors).|`string`|`-`|`-`|
|text|Whether to display as a text button.|`boolean`|`false`|`-`|
|block|Whether the button is displayed as block.|`boolean`|`false`|`-`|
|loading|Whether the button shows the loading status.|`boolean`|`false`|`-`|
|disabled|Whether the button is disabled.|`boolean`|`false`|`-`|
|circle|Whether the button is round.|`boolean`|`false`|`-`|
|size|Button size.|`'tiny' \| 'small' \| 'medium' \| 'large'`|`-`|`-`|
|ghost|Whether the button is ghost.|`boolean`|`false`|`-`|
|round|Whether the button shows rounded corners.|`boolean`|`false`|`-`|
|secondary|Whether the button is secondary button.|`boolean`|`false`|`-`|
|tertiary|Whether the button is tertiary button.|`boolean`|`false`|`-`|
|quaternary|Whether the button is quaternary button.|`boolean`|`false`|`-`|
|strong|Whether to use strong text in the button.|`boolean`|`false`|`-`|
|focusable|Whether the button is focusable.|`boolean`|`false`|`-`|
|keyboard|Whether is supports keyboard operation.|`boolean`|`false`|`-`|
|tag|What tag need the button be rendered as.|`string`|`-`|`-`|
|type|Button type.|`'default' \| 'tertiary' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'`|`-`|`-`|
|dashed|Whether the button's border is a dashed line.|`boolean`|`false`|`-`|
|render-icon|Render function that renders button icon.|`() => VNodeChild`|`-`|`-`|
|icon-placement|The position of the icon in the button.|`'left' \| 'right'`|`-`|`-`|
|attr-type|The `type` attribute of the button's DOM.|`'button' \| 'submit' \| 'reset'`|`-`|`-`|
|bordered|Whether the button shows the border.|`boolean`|`false`|`-`|
|native-focus-behavior|Whether to follow button's native focus behavior. Since safari's button can't be focused by click, naive-ui uses some tricks to make it focusable on safari. If you don't need the behavior or need the button to be draggable, you can enable the prop.|`boolean`|`false`|`-`|




### `<ent-pop-button>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|icon|图标文件|`string \| (() => VNodeChild)`|`-`|`-`|
|pop-confirm-props|弹窗的配置属性|`Partial<PopconfirmProps>`|`-`|`-`|
|tooltip-props|提示|`Partial<TooltipProps>`|`-`|`-`|
|color|Button color (support `#FFF`, `#FFFFFF`, `yellow`,`rgb(0, 0, 0)` formatted colors).|`string`|`-`|`-`|
|text-color|Button text color (support `#FFF`, `#FFFFFF`, `yellow`,`rgb(0, 0, 0)` formatted colors).|`string`|`-`|`-`|
|text|Whether to display as a text button.|`boolean`|`false`|`-`|
|block|Whether the button is displayed as block.|`boolean`|`false`|`-`|
|loading|Whether the button shows the loading status.|`boolean`|`false`|`-`|
|disabled|Whether the button is disabled.|`boolean`|`false`|`-`|
|circle|Whether the button is round.|`boolean`|`false`|`-`|
|size|Button size.|`'tiny' \| 'small' \| 'medium' \| 'large'`|`-`|`-`|
|ghost|Whether the button is ghost.|`boolean`|`false`|`-`|
|round|Whether the button shows rounded corners.|`boolean`|`false`|`-`|
|secondary|Whether the button is secondary button.|`boolean`|`false`|`-`|
|tertiary|Whether the button is tertiary button.|`boolean`|`false`|`-`|
|quaternary|Whether the button is quaternary button.|`boolean`|`false`|`-`|
|strong|Whether to use strong text in the button.|`boolean`|`false`|`-`|
|focusable|Whether the button is focusable.|`boolean`|`false`|`-`|
|keyboard|Whether is supports keyboard operation.|`boolean`|`false`|`-`|
|tag|What tag need the button be rendered as.|`string`|`-`|`-`|
|type|Button type.|`'default' \| 'tertiary' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'`|`-`|`-`|
|dashed|Whether the button's border is a dashed line.|`boolean`|`false`|`-`|
|render-icon|Render function that renders button icon.|`() => VNodeChild`|`-`|`-`|
|icon-placement|The position of the icon in the button.|`'left' \| 'right'`|`-`|`-`|
|attr-type|The `type` attribute of the button's DOM.|`'button' \| 'submit' \| 'reset'`|`-`|`-`|
|bordered|Whether the button shows the border.|`boolean`|`false`|`-`|
|native-focus-behavior|Whether to follow button's native focus behavior. Since safari's button can't be focused by click, naive-ui uses some tricks to make it focusable on safari. If you don't need the behavior or need the button to be draggable, you can enable the prop.|`boolean`|`false`|`-`|


