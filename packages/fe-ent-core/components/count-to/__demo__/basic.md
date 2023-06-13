```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

数字动画

---

## en-US

Display information that needs attention, suitable for brief warning prompts.

---

```vue
<template>
  <CountTo prefix="$" :color="'#409EFF'" :startVal="1" :endVal="200000" :duration="8000" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CountTo from 'fe-ent-core/es/components/count-to';

export default defineComponent({
  components: {
    CountTo,
  },
});
</script>
```
