<template>
  <ent-page-wrapper title="拖动校验示例">
    <div class="flex justify-center p-4 items-center bg-gray-700">
      <ent-drag-verify ref="el1" @success="handleSuccess" />
      <ent-button type="primary" class="ml-2" @click="handleBtnClick(el1)"> 还原 </ent-button>
    </div>

    <div class="flex justify-center p-4 items-center bg-gray-700">
      <ent-drag-verify ref="el2" circle @success="handleSuccess" />
      <ent-button type="primary" class="ml-2" @click="handleBtnClick(el2)"> 还原 </ent-button>
    </div>

    <div class="flex justify-center p-4 items-center bg-gray-700">
      <ent-drag-verify
        ref="el3"
        text="拖动以进行校验"
        success-text="校验成功"
        :bar-style="{
          backgroundColor: '#018ffb',
        }"
        @success="handleSuccess"
      />
      <ent-button type="primary" class="ml-2" @click="handleBtnClick(el3)"> 还原 </ent-button>
    </div>

    <div class="flex justify-center p-4 items-center bg-gray-700">
      <ent-drag-verify ref="el4" @success="handleSuccess">
        <template #actionIcon="isPassing">
          <BugOutlined v-if="isPassing" />
          <RightOutlined v-else />
        </template>
      </ent-drag-verify>
      <ent-button type="primary" class="ml-2" @click="handleBtnClick(el4)"> 还原 </ent-button>
    </div>

    <div class="flex justify-center p-4 items-center bg-gray-700">
      <ent-drag-verify ref="el5" @success="handleSuccess">
        <template #text="isPassing">
          <div v-if="isPassing">
            <BugOutlined />
            成功
          </div>
          <div v-else>
            拖动
            <RightOutlined />
          </div>
        </template>
      </ent-drag-verify>
      <ent-button type="primary" class="ml-2" @click="handleBtnClick(el5)"> 还原 </ent-button>
    </div>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useMessage } from 'fe-ent-core/es/hooks';
  import { BugOutlined, RightOutlined } from '@ant-design/icons-vue';
  import type {
    DragVerifyActionType,
    PassingData,
  } from 'fe-ent-core/es/components/verify/interface';
  import type { Nullable } from 'fe-ent-core/es/types';

  export default defineComponent({
    components: { BugOutlined, RightOutlined },
    setup() {
      const { createMessage } = useMessage();
      const el1 = ref<Nullable<DragVerifyActionType>>(null);
      const el2 = ref<Nullable<DragVerifyActionType>>(null);
      const el3 = ref<Nullable<DragVerifyActionType>>(null);
      const el4 = ref<Nullable<DragVerifyActionType>>(null);
      const el5 = ref<Nullable<DragVerifyActionType>>(null);

      function handleSuccess(data: PassingData) {
        const { time } = data;
        createMessage.success(`校验成功,耗时${time}秒`);
      }

      function handleBtnClick(elRef: Nullable<DragVerifyActionType>) {
        if (!elRef) {
          return;
        }
        elRef.resume();
      }
      return {
        handleSuccess,
        el1,
        el2,
        el3,
        el4,
        el5,
        handleBtnClick,
      };
    },
  });
</script>
<style lang="less" scoped>
  .bg-gray-700 {
    background-color: #4a5568;
  }
</style>
