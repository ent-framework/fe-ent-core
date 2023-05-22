<template>
  <ent-page-wrapper title="MarkDown组件示例">
    <div>
      <ent-button class="mb-2" type="primary" @click="toggleTheme"> 黑暗主题 </ent-button>
      <ent-button class="mb-2" type="default" @click="clearValue"> 清空内容 </ent-button>
      <ent-mark-down
        ref="markDownRef"
        v-model:value="value"
        placeholder="这是占位文本"
        @change="handleChange"
      />
    </div>
    <div class="mt-2">
      <a-card title="Markdown Viewer 组件演示">
        <ent-markdown-viewer :value="value" />
      </a-card>
    </div>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { EntMarkDown, EntMarkdownViewer } from 'fe-ent-markdown';
  import { EntPageWrapper } from 'fe-ent-core';
  import { Card } from 'ant-design-vue';
  import type { MarkDownActionType } from 'fe-ent-markdown';

  export default defineComponent({
    components: { EntMarkDown, EntPageWrapper, EntMarkdownViewer, ACard: Card },
    setup() {
      const markDownRef = ref<Nullable<MarkDownActionType>>(null);
      const valueRef = ref(`
# title

# content
`);

      function toggleTheme() {
        const markDown = unref(markDownRef);
        if (!markDown) return;
        const vditor = markDown.getVditor();
        vditor.setTheme('dark');
      }

      function handleChange(v: string) {
        valueRef.value = v;
      }

      function clearValue() {
        valueRef.value = '';
      }

      return {
        value: valueRef,
        toggleTheme,
        markDownRef,
        handleChange,
        clearValue,
      };
    },
  });
</script>
