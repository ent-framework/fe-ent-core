```yaml

```

*Auto translate by google.*


## API


### `<ent-form>` Props

|Attribute|Description|Type|Default|Module|
|---|---|---|:---:|---|
|field-map-to-time|用于将表单内时间区域的应设成 2 个字段,见下方说明|`FieldMapToTime`|`() => []`|`-`|
|schemas|表单配置|`FormSchema[]`|`[]`|`-`|
|merge-dynamic-data|额外传递到子组件的参数 values|`Recordable`|`null`|`-`|
|base-grid-style|配置所有 Grid 的 style 样式|`CSSProperties`|`-`|`-`|
|grid-props|配置所有 Grid 的 props 配置|`GridProps`|`() => ({  cols: 24,  xGap: 10})`|`-`|
|base-grid-item-props|配置所有选子项的 GridItemProps，不需要逐个配置，子项也可单独配置优先与全局|`Partial<GridItemProps>`|`() => ({  span: 6})`|`-`|
|base-form-item-props|配置所有 FormItem 的 props 配置，schema中可以通过 formItemProps 覆盖|`Partial<FormItemProps>`|`() => ({  labelPlacement: 'left',  labelWidth: 'auto'})`|`-`|
|auto-set-place-holder|自动设置表单内组件的 placeholder，自定义组件需自行实现|`boolean`|`true`|`-`|
|auto-submit-on-enter|在input中输入时按回车自动提交|`boolean`|`false`|`-`|
|submit-on-reset|重置时是否提交表单|`boolean`|`true`|`-`|
|submit-on-change|FormItem发生变化时是否提交表单|`boolean`|`false`|`-`|
|empty-span|空白行格,可以是数值或者 col 对象 数|`number \| Recordable`|`0`|`-`|
|transform-date-func|转化时间格式|`Fn`|`(date: any) => date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date`|`-`|
|rules-message-join-label|校验信息是否加入 label|`boolean`|`true`|`-`|
|auto-advanced-line|如果 showAdvancedButton 为 true，超过指定行数行默认折叠|`number`|`3`|`-`|
|always-show-lines|折叠时始终保持显示的行数|`number`|`1`|`-`|
|auto-focus-first-item|是否聚焦第一个输入框，只在第一个表单项为input的时候作用|`boolean`|`false`|`-`|
|reset-func|自定义重置按钮逻辑|`() => Promise<void>`|`-`|`-`|
|submit-func|自定义提交按钮逻辑|`() => Promise<void>`|`-`|`-`|
|inline|Whether to display as an inline form.|`boolean`|`false`|`NForm`|
|label-width|The width of label. Particularly useful when `label-placement` is set to `'left'`,`'auto'` means label width will be auto adjusted.|`number \| string \| 'auto'`|`-`|`NForm`|
|label-align|Label text alignment.|`'left' \| 'right'`|`-`|`NForm`|
|label-placement|Label placement.|`'left' \| 'top'`|`-`|`NForm`|
|model|The object to get/set form item values.|`Object`|`-`|`NForm`|
|rules|The rules to validate form items.|`type FormRules = { [itemValidatePath: string]: FormItemRule \| Array<FormItemRule> \| FormRules }`|`-`|`NForm`|
|disabled|Whether to disable the form.|`boolean`|`false`|`NForm`|
|size|Size.|`'small' \| 'medium' \| 'large'`|`-`|`NForm`|
|show-require-mark|Whether to show a required symbol when a form item is required.|`boolean`|`false`|`NForm`|
|require-mark-placement|Require mark placement|`'left' \| 'right' \| 'right-hanging'`|`-`|`NForm`|
|show-feedback|Whether to show the feedback area.|`boolean`|`false`|`NForm`|
|show-label|Whether to show the label.|`boolean`|`false`|`NForm`|
|validate-messages|Validation messages of `async-validator`.|`FormValidateMessages`|`-`|`NForm`|



