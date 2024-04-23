```yaml
meta:
  type: 组件
  category: 通用
title: 按钮
description: 二次封装按钮组件
```


## API


### `<ent-button>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|icon|按钮图标，参考 Icon 组件|`string`|`-`|`-`|
|color|Button color (support `#FFF`, `#FFFFFF`, `yellow`,`rgb(0, 0, 0)` formatted colors).|`string`|`-`|`NButton`|
|text-color|Button text color (support `#FFF`, `#FFFFFF`, `yellow`,`rgb(0, 0, 0)` formatted colors).|`string`|`-`|`NButton`|
|text|Whether to display as a text button.|`boolean`|`false`|`NButton`|
|block|Whether the button is displayed as block.|`boolean`|`false`|`NButton`|
|loading|Whether the button shows the loading status.|`boolean`|`false`|`NButton`|
|disabled|Whether the button is disabled.|`boolean`|`false`|`NButton`|
|circle|Whether the button is round.|`boolean`|`false`|`NButton`|
|size|Button size.|`'tiny' \| 'small' \| 'medium' \| 'large'`|`-`|`NButton`|
|ghost|Whether the button is ghost.|`boolean`|`false`|`NButton`|
|round|Whether the button shows rounded corners.|`boolean`|`false`|`NButton`|
|secondary|Whether the button is secondary button.|`boolean`|`false`|`NButton`|
|tertiary|Whether the button is tertiary button.|`boolean`|`false`|`NButton`|
|quaternary|Whether the button is quaternary button.|`boolean`|`false`|`NButton`|
|strong|Whether to use strong text in the button.|`boolean`|`false`|`NButton`|
|focusable|Whether the button is focusable.|`boolean`|`false`|`NButton`|
|keyboard|Whether is supports keyboard operation.|`boolean`|`false`|`NButton`|
|tag|What tag need the button be rendered as.|`string`|`-`|`NButton`|
|type|Button type.|`'default' \| 'tertiary' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'`|`-`|`NButton`|
|dashed|Whether the button's border is a dashed line.|`boolean`|`false`|`NButton`|
|render-icon|Render function that renders button icon.|`() => VNodeChild`|`-`|`NButton`|
|icon-placement|The position of the icon in the button.|`'left' \| 'right'`|`-`|`NButton`|
|attr-type|The `type` attribute of the button's DOM.|`'button' \| 'submit' \| 'reset'`|`-`|`NButton`|
|bordered|Whether the button shows the border.|`boolean`|`false`|`NButton`|
|native-focus-behavior|Whether to follow button's native focus behavior. Since safari's button can't be focused by click, naive-ui uses some tricks to make it focusable on safari. If you don't need the behavior or need the button to be draggable, you can enable the prop.|`boolean`|`false`|`NButton`|




### `<ent-pop-button>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|icon|图标文件|`string \| (() => VNodeChild)`|`-`|`-`|
|pop-confirm-props|弹窗的配置属性|`Partial<PopconfirmProps>`|`-`|`-`|
|tooltip-props|提示|`Partial<TooltipProps>`|`-`|`-`|
|color|Button color (support `#FFF`, `#FFFFFF`, `yellow`,`rgb(0, 0, 0)` formatted colors).|`string`|`-`|`NButton`|
|text-color|Button text color (support `#FFF`, `#FFFFFF`, `yellow`,`rgb(0, 0, 0)` formatted colors).|`string`|`-`|`NButton`|
|text|Whether to display as a text button.|`boolean`|`false`|`NButton`|
|block|Whether the button is displayed as block.|`boolean`|`false`|`NButton`|
|loading|Whether the button shows the loading status.|`boolean`|`false`|`NButton`|
|disabled|Whether the button is disabled.|`boolean`|`false`|`NButton`|
|circle|Whether the button is round.|`boolean`|`false`|`NButton`|
|size|Button size.|`'tiny' \| 'small' \| 'medium' \| 'large'`|`-`|`NButton`|
|ghost|Whether the button is ghost.|`boolean`|`false`|`NButton`|
|round|Whether the button shows rounded corners.|`boolean`|`false`|`NButton`|
|secondary|Whether the button is secondary button.|`boolean`|`false`|`NButton`|
|tertiary|Whether the button is tertiary button.|`boolean`|`false`|`NButton`|
|quaternary|Whether the button is quaternary button.|`boolean`|`false`|`NButton`|
|strong|Whether to use strong text in the button.|`boolean`|`false`|`NButton`|
|focusable|Whether the button is focusable.|`boolean`|`false`|`NButton`|
|keyboard|Whether is supports keyboard operation.|`boolean`|`false`|`NButton`|
|tag|What tag need the button be rendered as.|`string`|`-`|`NButton`|
|type|Button type.|`'default' \| 'tertiary' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'`|`-`|`NButton`|
|dashed|Whether the button's border is a dashed line.|`boolean`|`false`|`NButton`|
|render-icon|Render function that renders button icon.|`() => VNodeChild`|`-`|`NButton`|
|icon-placement|The position of the icon in the button.|`'left' \| 'right'`|`-`|`NButton`|
|attr-type|The `type` attribute of the button's DOM.|`'button' \| 'submit' \| 'reset'`|`-`|`NButton`|
|bordered|Whether the button shows the border.|`boolean`|`false`|`NButton`|
|native-focus-behavior|Whether to follow button's native focus behavior. Since safari's button can't be focused by click, naive-ui uses some tricks to make it focusable on safari. If you don't need the behavior or need the button to be draggable, you can enable the prop.|`boolean`|`false`|`NButton`|


