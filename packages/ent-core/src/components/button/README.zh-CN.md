```yaml
meta:
  type: 组件
  category: 通用
title: 按钮
description: 二次封装按钮组件
```


## API


### `<ent-button>` Props

|参数名|描述|类型|默认值|模块|版本|
|---|---|---|:---:|---|:---|
|pre-icon|按钮文本前图标，参考 Icon 组件|`string`|`-`|`-`||
|post-icon|按钮文本后图标，参考 Icon 组件|`string`|`-`|`-`||
|icon-size|按钮图标大小|`number`|`14`|`-`||
|block|将按钮宽度调整为其父宽度的选项|`boolean`|``false``|`antdv`||
|danger|设置危险按钮|`boolean`|``false``|`antdv`|2.2.0|
|disabled|按钮失效状态|`boolean`|``false``|`antdv`||
|ghost|幽灵属性，使按钮背景透明|`boolean`|``false``|`antdv`||
|href|点击跳转的地址，指定此属性 button 的行为和 a 链接一致|`string`|`-`|`antdv`||
|html-type|设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type)|`string`|``button``|`antdv`||
|icon|设置按钮的图标类型|`v-slot`|`-`|`antdv`||
|loading|设置按钮载入状态|`boolean \| { delay: number }`|``false``|`antdv`||
|shape|设置按钮形状|``default` \| `circle` \| `round``|``default``|`antdv`||
|size|设置按钮大小|``large` \| `middle` \| `small``|``middle``|`antdv`||
|target|相当于 a 链接的 target 属性，href 存在时生效|`string`|`-`|`antdv`||
|type|设置按钮类型|``primary` \| `ghost` \| `dashed` \| `link` \| `text` \| `default``|``default``|`antdv`||
### `<ent-button>` Events

|事件名|描述|参数|模块|
|---|---|---|---|
|click|点击按钮时的回调|-|antdv|




### `<ent-pop-button>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|icon|图标文件|`string \| (() => VNodeChild)`|`-`|`-`|
|pop-confirm-props|弹窗的配置属性|`Partial<PopconfirmProps>`|`-`|`-`|
|tooltip-props|提示|`Partial<TooltipProps>`|`-`|`-`|


