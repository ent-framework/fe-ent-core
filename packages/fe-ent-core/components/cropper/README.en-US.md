```yaml

```

*Auto translate by google.*


## API

### 图片裁剪组件

### `<ent-cropper-image>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|src **(required)**|图片源|`string`|`-`|`-`|
|alt|图片 alt|`string`|`-`|`-`|
|circled|圆形裁剪框|`boolean`|`false`|`-`|
|real-time-preview|实时触发预览|`boolean`|`true`|`-`|
|height|高度|`string\|number`|`'360px'`|`-`|
|crossorigin|crossorigin|`'' \| 'anonymous' \| 'use-credentials' \| undefined`|`-`|`-`|
|image-style|图片样式|`CSSProperties`|`() => ({})`|`-`|
|options|corpperjs 配置项|`Options`|`() => ({})`|`-`|



### 头像裁剪组件

### `<ent-cropper-avatar>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|width|图片宽|`string\|number`|`'200px'`|`-`|
|value|当前头像地址(v-model)|`string`|`-`|`-`|
|show-btn|是否显示按钮|`boolean`|`true`|`-`|
|btn-props|按钮的其它属性|`ButtonProps`|`-`|`-`|
|btn-text|按钮显示文本|`string`|`''`|`-`|
|upload-api|图片上传接口|`(params: apiFunParams) => Promise<void>`|`-`|`-`|



## Type

### CropendResult

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|imgBase64|imgBase64|`string`|`-`|`-`|
|imgInfo|imgInfo|`Cropper.Data`|`-`|`-`|


