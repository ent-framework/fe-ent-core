```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

带输入框的倒计时插件，按钮点击后倒计时。

---

## en-US

Display information that needs attention, suitable for brief warning prompts.

---

```vue
<template>
  <CountDownInput />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { CountDownInput } from 'fe-ent-core/es/components/count-down';

export default defineComponent({
  components: { CountDownInput },
});
</script>
```
