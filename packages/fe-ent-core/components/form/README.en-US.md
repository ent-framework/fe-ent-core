```yaml

```

*Auto translate by google.*


## API


### `<ent-form>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|label-width|扩展 form 组件，增加 label 宽度，表单内所有组件适用，可以单独在某个项覆盖或者禁用|`number \| string`|`0`|`-`|
|field-map-to-time|用于将表单内时间区域的应设成 2 个字段,见下方说明|`FieldMapToTime`|`() => []`|`-`|
|compact|紧凑类型表单，减少 margin-bottom|`boolean`|`false`|`-`|
|schemas|表单配置|`FormSchema[]`|`[]`|`-`|
|merge-dynamic-data|额外传递到子组件的参数 values|`Recordable`|`null`|`-`|
|base-row-style|配置所有 Row 的 style 样式|`CSSProperties`|`-`|`-`|
|base-col-props|配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局|`Partial<ColEx>`|`-`|`-`|
|auto-set-place-holder|自动设置表单内组件的 placeholder，自定义组件需自行实现|`boolean`|`true`|`-`|
|auto-submit-on-enter|在input中输入时按回车自动提交|`boolean`|`false`|`-`|
|submit-on-reset|重置时是否提交表单|`boolean`|`true`|`-`|
|submit-on-change|FormItem发生变化时是否提交表单|`boolean`|`false`|`-`|
|empty-span|空白行格,可以是数值或者 col 对象 数|`number \| Recordable`|`0`|`-`|
|show-advanced-button|是否显示收起展开按钮|`boolean`|`false`|`-`|
|transform-date-func|转化时间格式|`Fn`|`(date: any) => date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date`|`-`|
|rules-message-join-label|校验信息是否加入 label|`boolean`|`true`|`-`|
|auto-advanced-line|如果 showAdvancedButton 为 true，超过指定行数行默认折叠|`number`|`3`|`-`|
|always-show-lines|折叠时始终保持显示的行数|`number`|`1`|`-`|
|show-action-button-group|是否显示操作按钮|`boolean`|`true`|`-`|
|action-col-options|操作按钮外层 Col 组件配置，如果开启 showAdvancedButton，则不用设置，具体见下方 actionColOptions|`Partial<ColEx>`|`-`|`-`|
|show-reset-button|显示重置按钮|`boolean`|`true`|`-`|
|auto-focus-first-item|是否聚焦第一个输入框，只在第一个表单项为input的时候作用|`boolean`|`false`|`-`|
|reset-button-options|重置按钮配置见下方 ActionButtonOption|`Partial<ButtonProps>`|`-`|`-`|
|show-submit-button|是否显示确认按钮|`boolean`|`true`|`-`|
|submit-button-options|确认按钮配置|`Partial<ButtonProps>`|`-`|`-`|
|reset-func|自定义重置按钮逻辑|`() => Promise<void>`|`-`|`-`|
|submit-func|自定义提交按钮逻辑|`() => Promise<void>`|`-`|`-`|



