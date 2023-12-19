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



### UserInfo

|Name|Description|Type|Default|Module|
|---|---|---|:---:|---|
|userId|userId|`string \| number`|`-`|`-`|
|username|username|`string`|`-`|`-`|
|realName|realName|`string`|`-`|`-`|
|avatar|avatar|`string`|`-`|`-`|
|desc|desc|`string`|`-`|`-`|
|homePath|homePath|`string`|`-`|`-`|
|roles|roles|`RoleInfo[]`|`-`|`-`|



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
|token|token|`Partial<AliasToken>`|`-`|`-`|



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


