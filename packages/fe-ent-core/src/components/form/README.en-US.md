```yaml

```

*Auto translate by google.*


## API


### `<ent-form>` Props

|Attribute|Description|Type|Default|Module|version|
|---|---|---|:---:|---|:---|
|label-width|扩展 form 组件，增加 label 宽度，表单内所有组件适用，可以单独在某个项覆盖或者禁用|`number \| string`|`0`|`-`||
|field-map-to-time|用于将表单内时间区域的应设成 2 个字段,见下方说明|`FieldMapToTime`|`() => []`|`-`||
|compact|紧凑类型表单，减少 margin-bottom|`boolean`|`false`|`-`||
|schemas|表单配置|`FormSchema[]`|`[]`|`-`||
|merge-dynamic-data|额外传递到子组件的参数 values|`Recordable`|`null`|`-`||
|base-row-style|配置所有 Row 的 style 样式|`CSSProperties`|`-`|`-`||
|base-col-props|配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局|`Partial<ColEx>`|`-`|`-`||
|auto-set-place-holder|自动设置表单内组件的 placeholder，自定义组件需自行实现|`boolean`|`true`|`-`||
|auto-submit-on-enter|在input中输入时按回车自动提交|`boolean`|`false`|`-`||
|submit-on-reset|重置时是否提交表单|`boolean`|`true`|`-`||
|submit-on-change|FormItem发生变化时是否提交表单|`boolean`|`false`|`-`||
|empty-span|空白行格,可以是数值或者 col 对象 数|`number \| Recordable`|`0`|`-`||
|show-advanced-button|是否显示收起展开按钮|`boolean`|`false`|`-`||
|transform-date-func|转化时间格式|`Fn`|`(date: any) => date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date`|`-`||
|rules-message-join-label|校验信息是否加入 label|`boolean`|`true`|`-`||
|auto-advanced-line|如果 showAdvancedButton 为 true，超过指定行数行默认折叠|`number`|`3`|`-`||
|always-show-lines|折叠时始终保持显示的行数|`number`|`1`|`-`||
|show-action-button-group|是否显示操作按钮|`boolean`|`true`|`-`||
|action-col-options|操作按钮外层 Col 组件配置，如果开启 showAdvancedButton，则不用设置，具体见下方 actionColOptions|`Partial<ColEx>`|`-`|`-`||
|show-reset-button|显示重置按钮|`boolean`|`true`|`-`||
|auto-focus-first-item|是否聚焦第一个输入框，只在第一个表单项为input的时候作用|`boolean`|`false`|`-`||
|reset-button-options|重置按钮配置见下方 ActionButtonOption|`Partial<ButtonProps>`|`-`|`-`||
|show-submit-button|是否显示确认按钮|`boolean`|`true`|`-`||
|submit-button-options|确认按钮配置|`Partial<ButtonProps>`|`-`|`-`||
|reset-func|自定义重置按钮逻辑|`() => Promise<void>`|`-`|`-`||
|submit-func|自定义提交按钮逻辑|`() => Promise<void>`|`-`|`-`||
|colon|配置 Form.Item 的 colon 的默认值 (只有在属性 layout 为 horizontal 时有效)|`boolean`|`true`|`antdv`||
|disabled|设置表单组件禁用，仅对 antdv 组件有效|`boolean`|`false`|`antdv`|4.0|
|hide-required-mark|隐藏所有表单项的必选标记|`Boolean`|`false`|`antdv`||
|label-align|label 标签的文本对齐方式|`'left' \| 'right'`|`'right'`|`antdv`||
|label-col|label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}`|`[object](/components/grid-cn/#col)`|`-`|`antdv`||
|label-wrap|label 标签的文本换行方式|`boolean`|`false`|`antdv`|3.0|
|layout|表单布局|`'horizontal'\|'vertical'\|'inline'`|`'horizontal'`|`antdv`||
|model|表单数据对象|`object`|`-`|`antdv`||
|name|表单名称，会作为表单字段 `id` 前缀使用|`string`|`-`|`antdv`|2.0.0|
|no-style|为 `true` 时不带样式，作为纯字段控件使用|`boolean`|`false`|`antdv`|3.0|
|rules|表单验证规则|`object`|`-`|`antdv`||
|scroll-to-first-error|提交失败自动滚动到第一个错误字段|`boolean \| [options](https://github.com/stipsan/scroll-into-view-if-needed/#options)`|`false`|`antdv`|2.0.0|
|validate-on-rule-change|是否在 rules 属性改变后立即触发一次验证|`boolean`|`true`|`antdv`||
|validate-trigger|统一设置字段校验规则|`string \| string\[]`|``change``|`antdv`|2.0.0|
|wrapper-col|需要为输入控件设置布局样式时，使用该属性，用法同 labelCol|`[object](/components/grid-cn/#col)`|`-`|`antdv`||
### `<ent-form>` Events

|Event Name|Description|Parameters|Module|
|---|---|---|---|
|submit|数据验证成功后回调事件|-|antdv|
|finish|提交表单且数据验证成功后回调事件|-|antdv|
|finish-failed|提交表单且数据验证失败后回调事件|-|antdv|
|validate|任一表单项被校验后触发|-|antdv|



