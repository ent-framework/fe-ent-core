```yaml
meta:
  type: API
  category: Store
title: Store 定义
description: Store相关的Types
```


## Type


### LockInfo

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|pwd|pwd|`string \| undefined`|`-`|
|isLock|isLock|`boolean`|`false`|



### ErrorLogInfo

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|type|`ErrorTypeEnum`|`-`|
|file|file|`string`|`-`|
|name|name|`string`|`-`|
|message|message|`string`|`-`|
|stack|stack|`string`|`-`|
|detail|detail|`string`|`-`|
|url|url|`string`|`-`|
|time|time|`string`|`-`|



### UserInfo

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|userId|userId|`string \| number`|`-`|
|username|username|`string`|`-`|
|realName|realName|`string`|`-`|
|avatar|avatar|`string`|`-`|
|desc|desc|`string`|`-`|
|homePath|homePath|`string`|`-`|
|roles|roles|`RoleInfo[]`|`-`|



### BeforeMiniState

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|menuCollapsed|menuCollapsed|`boolean`|`false`|
|menuSplit|menuSplit|`boolean`|`false`|
|menuMode|menuMode|`MenuModeEnum`|`-`|
|menuType|menuType|`MenuTypeEnum`|`-`|



### MenuSetting

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|bgColor|bgColor|`string`|`-`|
|fixed|fixed|`boolean`|`false`|
|collapsed|collapsed|`boolean`|`false`|
|canDrag|canDrag|`boolean`|`false`|
|show|show|`boolean`|`false`|
|hidden|hidden|`boolean`|`false`|
|split|split|`boolean`|`false`|
|menuWidth|menuWidth|`number`|`-`|
|mode|mode|`MenuModeEnum`|`-`|
|type|type|`MenuTypeEnum`|`-`|
|theme|theme|`ThemeEnum`|`-`|
|topMenuAlign|topMenuAlign|`'start' \| 'center' \| 'end'`|`-`|
|trigger|trigger|`TriggerEnum`|`-`|
|accordion|accordion|`boolean`|`false`|
|closeMixSidebarOnChange|closeMixSidebarOnChange|`boolean`|`false`|
|collapsedShowTitle|collapsedShowTitle|`boolean`|`false`|
|mixSideTrigger|mixSideTrigger|`MixSidebarTriggerEnum`|`-`|
|mixSideFixed|mixSideFixed|`boolean`|`false`|



### MultiTabsSetting

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|cache|cache|`boolean`|`false`|
|show|show|`boolean`|`false`|
|showQuick|showQuick|`boolean`|`false`|
|canDrag|canDrag|`boolean`|`false`|
|showRedo|showRedo|`boolean`|`false`|
|showFold|showFold|`boolean`|`false`|



### HeaderSetting

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|bgColor|bgColor|`string`|`-`|
|fixed|fixed|`boolean`|`false`|
|show|show|`boolean`|`false`|
|theme|theme|`ThemeEnum`|`-`|
|showFullScreen|showFullScreen|`boolean`|`false`|
|useLockPage|useLockPage|`boolean`|`false`|
|showDoc|showDoc|`boolean`|`false`|
|showNotice|showNotice|`boolean`|`false`|
|showSearch|showSearch|`boolean`|`false`|



### LocaleSetting

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|showPicker|showPicker|`boolean`|`false`|
|locale|locale|`LocaleType`|`-`|
|fallback|fallback|`LocaleType`|`-`|
|availableLocales|availableLocales|`LocaleType[]`|`-`|



### TransitionSetting

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|enable|enable|`boolean`|`false`|
|basicTransition|basicTransition|`RouterTransitionEnum`|`-`|
|openPageLoading|openPageLoading|`boolean`|`false`|
|openNProgress|openNProgress|`boolean`|`false`|



### ProjectConfig

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|permissionCacheType|permissionCacheType|`CacheTypeEnum`|`-`|
|showSettingButton|showSettingButton|`boolean`|`false`|
|showDarkModeToggle|showDarkModeToggle|`boolean`|`false`|
|settingButtonPosition|settingButtonPosition|`SettingButtonPositionEnum`|`-`|
|permissionMode|permissionMode|`PermissionModeEnum`|`-`|
|sessionTimeoutProcessing|sessionTimeoutProcessing|`SessionTimeoutProcessingEnum`|`-`|
|grayMode|grayMode|`boolean`|`false`|
|colorWeak|colorWeak|`boolean`|`false`|
|themeColor|themeColor|`string`|`-`|
|fullContent|fullContent|`boolean`|`false`|
|contentMode|contentMode|`ContentEnum`|`-`|
|showLogo|showLogo|`boolean`|`false`|
|showFooter|showFooter|`boolean`|`false`|
|headerSetting|headerSetting|`HeaderSetting`|`-`|
|menuSetting|menuSetting|`MenuSetting`|`-`|
|multiTabsSetting|multiTabsSetting|`MultiTabsSetting`|`-`|
|transitionSetting|transitionSetting|`TransitionSetting`|`-`|
|openKeepAlive|openKeepAlive|`boolean`|`false`|
|lockTime|lockTime|`number`|`-`|
|showBreadCrumb|showBreadCrumb|`boolean`|`false`|
|showBreadCrumbIcon|showBreadCrumbIcon|`boolean`|`false`|
|useErrorHandle|useErrorHandle|`boolean`|`false`|
|useOpenBackTop|useOpenBackTop|`boolean`|`false`|
|canEmbedIFramePage|canEmbedIFramePage|`boolean`|`false`|
|closeMessageOnSwitch|closeMessageOnSwitch|`boolean`|`false`|
|removeAllHttpPending|removeAllHttpPending|`boolean`|`false`|


