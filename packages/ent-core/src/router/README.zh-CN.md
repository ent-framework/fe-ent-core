```yaml
meta:
  type: API
  category: 路由
title: API 定义
description: 路由相关的Types
```


## Type


### AppRouteRecordRaw

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|name|路由名称|`string`|`-`|`-`|
|meta|meta|`AppRouteMeta`|`-`|`-`|
|component|component|`Component \| string`|`-`|`-`|
|components|components|`Component`|`-`|`-`|
|children|children|`AppRouteRecordRaw[]`|`-`|`-`|
|props|props|`Recordable`|`-`|`-`|
|fullPath|fullPath|`string`|`-`|`-`|



### AppRouteMeta

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|orderNo|顺序|`number`|`-`|`-`|
|title|标题|`string`|`-`|`-`|
|dynamicLevel|dynamicLevel|`number`|`-`|`-`|
|realPath|realPath|`string`|`-`|`-`|
|ignoreAuth|ignoreAuth|`boolean`|`false`|`-`|
|roles|roles|`string[]`|`-`|`-`|
|ignoreKeepAlive|ignoreKeepAlive|`boolean`|`false`|`-`|
|affix|affix|`boolean`|`false`|`-`|
|icon|icon on menu|`string`|`-`|`-`|
|frameSrc|frameSrc|`string`|`-`|`-`|
|transitionName|transitionName|`string`|`-`|`-`|
|hideBreadcrumb|hideBreadcrumb|`boolean`|`false`|`-`|
|hideChildrenInMenu|hideChildrenInMenu|`boolean`|`false`|`-`|
|carryParam|carryParam|`boolean`|`false`|`-`|
|single|single|`boolean`|`false`|`-`|
|currentActiveMenu|currentActiveMenu|`string`|`-`|`-`|
|hideTab|hideTab|`boolean`|`false`|`-`|
|hideMenu|Never show in menu|`boolean`|`false`|`-`|
|isLink|isLink|`boolean`|`false`|`-`|
|ignoreRoute|ignoreRoute|`boolean`|`false`|`-`|
|hidePathForChildren|hidePathForChildren|`boolean`|`false`|`-`|



### MenuTag

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|type|type|`'primary' \| 'error' \| 'warn' \| 'success'`|`-`|`-`|
|content|content|`string`|`-`|`-`|
|dot|dot|`boolean`|`false`|`-`|


