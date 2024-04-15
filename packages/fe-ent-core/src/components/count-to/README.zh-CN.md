```yaml
meta:
  type: 组件
  category: 通用
title: 数字动画组件
description: 该组件对 vue-countTo 进行了重构，改造成适配 vue3 语法的组件。
```

@import ./__demo__/basic.md

## API


### `<ent-count-to>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|start-val|起始值|`number`|`0`|`-`|
|end-val|结束值|`number`|`2021`|`-`|
|duration|周期|`number`|`1500`|`-`|
|autoplay|自动开始|`boolean`|`true`|`-`|
|decimals|保留小数点位数|`number`|`0`|`-`|
|prefix|前缀|`string`|`''`|`-`|
|suffix|后缀|`string`|`''`|`-`|
|separator|分割字符|`string`|`','`|`-`|
|color|颜色|`string`|`-`|`-`|
|use-easing|是否启用数字动画|`boolean`|`true`|`-`|
|transition|动画效果|`string`|`'linear'`|`-`|



