```yaml
meta:
  type: API
  category: Store
title: Store 定义
description: Store相关的Types
```


## Type


### LockInfo

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|pwd|pwd|`string \| undefined`|`-`|`-`|
|isLock|isLock|`boolean`|`false`|`-`|



### ErrorLogInfo

|参数名|描述|类型|默认值|模块|
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

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|userId|userId|`string \| number`|`-`|`-`|
|username|username|`string`|`-`|`-`|
|realName|realName|`string`|`-`|`-`|
|avatar|avatar|`string`|`-`|`-`|
|desc|desc|`string`|`-`|`-`|
|homePath|homePath|`string`|`-`|`-`|
|roles|roles|`RoleInfo[]`|`-`|`-`|



### BeforeMiniState

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|menuCollapsed|menuCollapsed|`boolean`|`false`|`-`|
|menuSplit|menuSplit|`boolean`|`false`|`-`|
|menuMode|menuMode|`MenuModeEnum`|`-`|`-`|
|menuType|menuType|`MenuTypeEnum`|`-`|`-`|



### LocaleSetting

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|showPicker|showPicker|`boolean`|`false`|`-`|
|locale|locale|`LocaleType`|`-`|`-`|
|fallback|fallback|`LocaleType`|`-`|`-`|
|availableLocales|availableLocales|`LocaleType[]`|`-`|`-`|



### ThemeSetting

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|theme|theme|`ThemeEnum`|`-`|`-`|
|name|name|`string`|`-`|`-`|
|token|token|`Partial<SeedToken>`|`-`|`-`|



### TransitionSetting

|参数名|描述|类型|默认值|模块|
|---|---|---|:---:|---|
|enable|enable|`boolean`|`false`|`-`|
|basicTransition|basicTransition|`RouterTransitionEnum`|`-`|`-`|
|openPageLoading|openPageLoading|`boolean`|`false`|`-`|
|openNProgress|openNProgress|`boolean`|`false`|`-`|



### ProjectConfig

|参数名|描述|类型|默认值|模块|
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


