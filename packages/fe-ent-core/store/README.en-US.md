```yaml

```


## Type


### LockInfo

|Name|Description|Type|Default|
|---|---|---|:---:|
|pwd|pwd|`string \| undefined`|`-`|
|isLock|isLock|`boolean`|`false`|



### ErrorLogInfo

|Name|Description|Type|Default|
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

|Name|Description|Type|Default|
|---|---|---|:---:|
|userId|userId|`string \| number`|`-`|
|username|username|`string`|`-`|
|realName|realName|`string`|`-`|
|avatar|avatar|`string`|`-`|
|desc|desc|`string`|`-`|
|homePath|homePath|`string`|`-`|
|roles|roles|`RoleInfo[]`|`-`|



### BeforeMiniState

|Name|Description|Type|Default|
|---|---|---|:---:|
|menuCollapsed|menuCollapsed|`boolean`|`false`|
|menuSplit|menuSplit|`boolean`|`false`|
|menuMode|menuMode|`MenuModeEnum`|`-`|
|menuType|menuType|`MenuTypeEnum`|`-`|



### MenuSetting

菜单设置

|Name|Description|Type|Default|
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

|Name|Description|Type|Default|
|---|---|---|:---:|
|cache|cache|`boolean`|`false`|
|show|show|`boolean`|`false`|
|showQuick|showQuick|`boolean`|`false`|
|canDrag|canDrag|`boolean`|`false`|
|showRedo|showRedo|`boolean`|`false`|
|showFold|showFold|`boolean`|`false`|



### HeaderSetting

|Name|Description|Type|Default|
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

|Name|Description|Type|Default|
|---|---|---|:---:|
|showPicker|showPicker|`boolean`|`false`|
|locale|locale|`LocaleType`|`-`|
|fallback|fallback|`LocaleType`|`-`|
|availableLocales|availableLocales|`LocaleType[]`|`-`|



### TransitionSetting

|Name|Description|Type|Default|
|---|---|---|:---:|
|enable|enable|`boolean`|`false`|
|basicTransition|basicTransition|`RouterTransitionEnum`|`-`|
|openPageLoading|openPageLoading|`boolean`|`false`|
|openNProgress|openNProgress|`boolean`|`false`|



### ProjectConfig

项目配置

|Name|Description|Type|Default|
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


