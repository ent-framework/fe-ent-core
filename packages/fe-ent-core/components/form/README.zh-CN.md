```yaml
meta:
  type: 组件
  category: 容器
title: 页面包装
description: 页面包装
```


## API

### 皮肤选择(暗黑模式切换)

### `<ent-form>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|schemas|表单配置|`FormSchema[]`|`[]`|
|size|Size|`propTypes.oneOf(['default', 'small', 'large']).def('default')`|`-`|
|disabled|禁用表单|`propTypes.bool`|`-`|
|show-submit-button|是否显示确认按钮|`propTypes.bool.def(true)`|`-`|
|submit-button-options|确认按钮配置|`Partial<ButtonProps>`|`-`|



