```yaml

```

*Auto translate by google.*


## Type


### LockInfo

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|pwd|pwd|`string \| undefined`|`-`|`-`|
|isLock|isLock|`boolean`|`false`|`-`|



### ErrorLogInfo

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|type|type|`ErrorTypeEnum`|`-`|`-`|
|file|file|`string`|`-`|`-`|
|name|name|`string`|`-`|`-`|
|message|message|`string`|`-`|`-`|
|stack|stack|`string`|`-`|`-`|
|detail|detail|`string`|`-`|`-`|
|url|url|`string`|`-`|`-`|
|time|time|`string`|`-`|`-`|



### BeforeMiniState

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|menuCollapsed|menuCollapsed|`boolean`|`false`|`-`|
|menuSplit|menuSplit|`boolean`|`false`|`-`|
|menuMode|menuMode|`MenuModeEnum`|`-`|`-`|
|menuType|menuType|`MenuTypeEnum`|`-`|`-`|



### LocaleSetting

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|showPicker|showPicker|`boolean`|`false`|`-`|
|locale|locale|`LocaleType`|`-`|`-`|
|fallback|fallback|`LocaleType`|`-`|`-`|
|availableLocales|availableLocales|`LocaleType[]`|`-`|`-`|



### ThemeSetting

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|theme|theme|`ThemeEnum`|`-`|`-`|
|name|name|`string`|`-`|`-`|
|themeOverrides|themeOverrides|`GlobalThemeOverrides`|`-`|`-`|



### TransitionSetting

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|enable|enable|`boolean`|`false`|`-`|
|basicTransition|basicTransition|`RouterTransitionEnum`|`-`|`-`|
|openPageLoading|openPageLoading|`boolean`|`false`|`-`|
|openNProgress|openNProgress|`boolean`|`false`|`-`|



### ProjectConfig

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|useErrorHandle|useErrorHandle|`boolean`|`false`|`-`|
|removeAllHttpPending|removeAllHttpPending|`boolean`|`false`|`-`|
|closeMessageOnSwitch|closeMessageOnSwitch|`boolean`|`false`|`-`|
|showDarkModeToggle|showDarkModeToggle|`boolean`|`false`|`-`|
|permissionCacheType|permissionCacheType|`CacheTypeEnum`|`-`|`-`|
|permissionMode|permissionMode|`PermissionModeEnum`|`-`|`-`|
|sessionTimeoutProcessing|sessionTimeoutProcessing|`SessionTimeoutProcessingEnum`|`-`|`-`|
|themeSetting|themeSetting|`ThemeSetting`|`-`|`-`|
|transitionSetting|transitionSetting|`TransitionSetting`|`-`|`-`|



### TableSetting

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|size|size|`Nullable<SizeType>`|`-`|`-`|
|showIndexColumn|showIndexColumn|`Recordable<Nullable<boolean>>`|`-`|`-`|
|columns|columns|`Recordable<Nullable<Array<ColumnOptionsType>>>`|`-`|`-`|
|showRowSelection|showRowSelection|`Recordable<Nullable<boolean>>`|`-`|`-`|


