```yaml

```

*Auto translate by google.*


## Type


### AppRouteRecordRaw

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|name|路由名称|`string`|`-`|`-`|
|meta|meta|`AppRouteMeta`|`-`|`-`|
|component|component|`Component \| string`|`-`|`-`|
|components|components|`Component`|`-`|`-`|
|children|children|`AppRouteRecordRaw[]`|`-`|`-`|
|props|props|`Recordable`|`-`|`-`|
|fullPath|fullPath|`string`|`-`|`-`|



### AppRouteMeta

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|orderNo|顺序|`number`|`-`|`-`|
|title|标题|`string`|`-`|`-`|
|dynamicLevel|dynamicLevel|`number`|`-`|`-`|
|realPath|realPath|`string`|`-`|`-`|
|ignoreAuth|ignoreAuth|`boolean`|`false`|`-`|
|roles|roles|`string[]`|`-`|`-`|
|ignoreKeepAlive|ignoreKeepAlive|`boolean`|`false`|`-`|
|affix|affix|`boolean`|`false`|`-`|
|icon|icon|`string`|`-`|`-`|
|frameSrc|frameSrc|`string`|`-`|`-`|
|transitionName|transitionName|`string`|`-`|`-`|
|hideBreadcrumb|hideBreadcrumb|`boolean`|`false`|`-`|
|hideChildrenInMenu|hideChildrenInMenu|`boolean`|`false`|`-`|
|carryParam|carryParam|`boolean`|`false`|`-`|
|single|single|`boolean`|`false`|`-`|
|currentActiveMenu|currentActiveMenu|`string`|`-`|`-`|
|hideTab|hideTab|`boolean`|`false`|`-`|
|hideMenu|hideMenu|`boolean`|`false`|`-`|
|isLink|isLink|`boolean`|`false`|`-`|
|ignoreRoute|ignoreRoute|`boolean`|`false`|`-`|
|hidePathForChildren|hidePathForChildren|`boolean`|`false`|`-`|



### MenuTag

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|type|type|`'primary' \| 'error' \| 'warn' \| 'success'`|`-`|`-`|
|content|content|`string`|`-`|`-`|
|dot|dot|`boolean`|`false`|`-`|


