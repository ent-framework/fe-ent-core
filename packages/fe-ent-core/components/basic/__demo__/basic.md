```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

展现需要关注的信息，适用于简短的警告提示。

---

## en-US

Display information that needs attention, suitable for brief warning prompts.

---

```vue
<template>
  <div>
    <ent-title helpMessage="提示1">标题</ent-title>
    <ent-title :helpMessage="['提示1', '提示2']">标题</ent-title>
  </div>
</template>
```
