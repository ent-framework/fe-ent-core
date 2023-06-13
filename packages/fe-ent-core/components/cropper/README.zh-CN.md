```yaml
meta:
  type: 组件
  category: 通用
title: 图片裁剪组件
description: 该组件对 vue-countTo 进行了重构，改造成适配 vue3 语法的组件。
```


## API

### 图片裁剪组件

### `<ent-cropper-image>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|src **(必填)**|图片源|`string`|`-`|`-`|
|alt|图片 alt|`string`|`-`|`-`|
|circled|圆形裁剪框|`boolean`|`false`|`-`|
|real-time-preview|实时触发预览|`boolean`|`true`|`-`|
|height|高度|`string\|number`|`'360px'`|`-`|
|crossorigin|crossorigin|`'' \| 'anonymous' \| 'use-credentials' \| undefined`|`-`|`-`|
|image-style|图片样式|`CSSProperties`|`() => ({})`|`-`|
|options|corpperjs 配置项|`Options`|`() => ({})`|`-`|



### 头像裁剪组件

### `<ent-cropper-avatar>` Props

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|width|图片宽|`string\|number`|`'200px'`|`-`|
|value|当前头像地址(v-model)|`string`|`-`|`-`|
|show-btn|是否显示按钮|`boolean`|`true`|`-`|
|btn-props|按钮的其它属性|`ButtonProps`|`-`|`-`|
|btn-text|按钮显示文本|`string`|`''`|`-`|
|upload-api|图片上传接口|`(params: apiFunParams) => Promise<void>`|`-`|`-`|



## Type

### CropendResult

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|imgBase64|imgBase64|`string`|`-`|`-`|
|imgInfo|imgInfo|`Cropper.Data`|`-`|`-`|


