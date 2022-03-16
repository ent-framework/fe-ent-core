<template>
  <ent-page-wrapper title="MarkDown组件示例">
    <div>
      <a-button @click="toggleTheme" class="mb-2" type="primary"> 黑暗主题 </a-button>
      <a-button @click="clearValue" class="mb-2" type="default"> 清空内容 </a-button>
      <ent-mark-down
        v-model:value="value"
        @change="handleChange"
        ref="markDownRef"
        placeholder="这是占位文本"
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
  import { EntMarkDown, MarkDownActionType, EntMarkdownViewer } from '@fe-ent-extension/markdown';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/Page';
  import { Card } from 'ant-design-vue';

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
