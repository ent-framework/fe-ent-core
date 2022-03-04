<template>
  <EntPageWrapper title="文本复制示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Copy Example">
      <div class="flex justify-center">
        <a-input placeholder="请输入" v-model:value="value" />
        <a-button type="primary" @click="handleCopy"> Copy </a-button>
      </div>
    </CollapseContainer>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, unref, ref } from 'vue';
  import { EntCollapseContainer } from 'fe-ent-core/components/Container/index';
  import { useCopyToClipboard } from 'fe-ent-core/hooks/web/useCopyToClipboard';
  import { useMessage } from 'fe-ent-core/hooks/web/useMessage';
  import { EntPageWrapper } from 'fe-ent-core/components/Page';

  export default defineComponent({
    name: 'Copy',
    components: { CollapseContainer: EntCollapseContainer, EntPageWrapper },
    setup() {
      const valueRef = ref('');
      const { createMessage } = useMessage();
      const { clipboardRef, copiedRef } = useCopyToClipboard();

      function handleCopy() {
        const value = unref(valueRef);
        if (!value) {
          createMessage.warning('请输入要拷贝的内容！');
          return;
        }
        clipboardRef.value = value;
        if (unref(copiedRef)) {
          createMessage.warning('copy success！');
        }
      }
      return { handleCopy, value: valueRef };
    },
  });
</script>
