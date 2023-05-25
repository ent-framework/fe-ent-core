<template>
  <ent-page-wrapper title="WebSocket 示例">
    <div class="flex">
      <div class="w-1/3 bg-white p-4">
        <div class="flex items-center">
          <span class="text-lg font-medium mr-4"> 连接状态: </span>
          <Tag :color="getTagColor">{{ status }}</Tag>
        </div>
        <hr class="my-4" />

        <div class="flex">
          <a-input v-model:value="server" disabled>
            <template #addonBefore> 服务地址 </template>
          </a-input>
          <ent-button :type="getIsOpen ? 'danger' : 'primary'" @click="toggle">
            {{ getIsOpen ? '关闭连接' : '开启连接' }}
          </ent-button>
        </div>
        <p class="text-lg font-medium mt-4">设置</p>
        <hr class="my-4" />

        <InputTextArea
          v-model:value="sendValue"
          placeholder="需要发送到服务器的内容"
          :disabled="!getIsOpen"
          allow-clear
        />

        <ent-button type="primary" block class="mt-4" :disabled="!getIsOpen" @click="handlerSend">
          发送
        </ent-button>
      </div>

      <div class="w-2/3 bg-white ml-4 p-4">
        <span class="text-lg font-medium mr-4"> 消息记录: </span>
        <hr class="my-4" />

        <div class="max-h-80 overflow-auto">
          <ul>
            <li v-for="item in getList" :key="item.time" class="mt-2">
              <div class="flex items-center">
                <span class="mr-2 text-primary font-medium">收到消息:</span>
                <span>{{ formatToDateTime(item.time) }}</span>
              </div>
              <div>
                {{ item.res }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { computed, defineComponent, reactive, toRefs, watchEffect } from 'vue';
  import { Input, Tag } from 'ant-design-vue';
  import { formatToDateTime } from 'fe-ent-core/es/utils';
  import { useWebSocket } from '@vueuse/core';

  export default defineComponent({
    components: {
      [Input.name]: Input,
      InputTextArea: Input.TextArea,
      Tag,
    },
    setup() {
      const state = reactive({
        server: 'ws://localhost:3300/test',
        sendValue: '',
        recordList: [] as { id: number; time: number; res: string }[],
      });

      const { status, data, send, close, open } = useWebSocket(state.server, {
        autoReconnect: false,
        heartbeat: true,
      });

      watchEffect(() => {
        if (data.value) {
          try {
            const res = JSON.parse(data.value);
            state.recordList.push(res);
          } catch {
            state.recordList.push({
              res: data.value,
              id: Math.ceil(Math.random() * 1000),
              time: Date.now(),
            });
          }
        }
      });

      const getIsOpen = computed(() => status.value === 'OPEN');
      const getTagColor = computed(() => (getIsOpen.value ? 'success' : 'red'));

      const getList = computed(() => {
        return [...state.recordList].reverse();
      });

      function handlerSend() {
        send(state.sendValue);
        state.sendValue = '';
      }

      function toggle() {
        if (getIsOpen.value) {
          close();
        } else {
          open();
        }
      }
      return {
        status,
        formatToDateTime,
        ...toRefs(state),
        handlerSend,
        getList,
        toggle,
        getIsOpen,
        getTagColor,
      };
    },
  });
</script>
