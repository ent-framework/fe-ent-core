```yaml

```

*Auto translate by google.*

@import ./__demo__/count-button.md

@import ./__demo__/countdown-input.md

## API

### 倒计时按钮组件

### `<ent-count-button>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|value|绑定值|`object\|number\|string\|array`|`-`|`-`|
|count|倒计时时间(秒)|`number`|`60`|`-`|
|before-start-func|倒计时之前执行的函数，返回 true 才会开始执行|`() => Promise<boolean>`|`null`|`-`|



### 倒计时输入框按钮组件

### `<ent-count-down-input>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|value|绑定值|`string`|`-`|`-`|
|size|输入框即按钮大小|`'default' \| 'large' \| 'small'`|`-`|`-`|
|count|倒计时时间(秒)|`number`|`60`|`-`|
|send-code-api|倒计时之前执行的函数，返回 true 才会开始执行|`() => Promise<boolean>`|`null`|`-`|


