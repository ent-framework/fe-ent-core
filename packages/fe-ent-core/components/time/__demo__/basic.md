```yaml
title:
  zh-CN: 基本用法
  en-US: Basic Usage
```

## zh-CN

相对时间组件， 开始时间为3分钟

---

## en-US

Display information that needs attention, suitable for brief warning prompts.

---

```vue
<template>
  <Time :value="time" />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import Time from 'fe-ent-core/es/components/time';

export default defineComponent({
  components: { Time },
  setup() {
    const now = new Date().getTime();
    const state = reactive({
      time: now - 60 * 3 * 1000,
    });
    return {
      ...toRefs(state),
      now,
    };
  },
});
</script>
```
