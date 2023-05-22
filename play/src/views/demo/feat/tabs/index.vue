<template>
  <EntPageWrapper title="标签页操作示例">
    <CollapseContainer title="在下面输入框输入文本,切换后回来内容会保存">
      <a-alert banner message="该操作不会影响页面标题，仅修改Tab标题" />
      <div class="mt-2 flex flex-grow-0">
        <ent-button class="mr-2" type="primary" @click="setTabTitle"> 设置Tab标题 </ent-button>
        <a-input v-model:value="title" placeholder="请输入" class="mr-4 w-12" />
      </div>
    </CollapseContainer>

    <CollapseContainer class="mt-4" title="标签页操作">
      <ent-button class="mr-2" @click="closeAll"> 关闭所有 </ent-button>
      <ent-button class="mr-2" @click="closeLeft"> 关闭左侧 </ent-button>
      <ent-button class="mr-2" @click="closeRight"> 关闭右侧 </ent-button>
      <ent-button class="mr-2" @click="closeOther"> 关闭其他 </ent-button>
      <ent-button class="mr-2" @click="closeCurrent"> 关闭当前 </ent-button>
      <ent-button class="mr-2" @click="refreshPage"> 刷新当前 </ent-button>
    </CollapseContainer>

    <CollapseContainer class="mt-4" title="标签页复用超出限制自动关闭(使用场景: 动态路由)">
      <ent-button v-for="index in 6" :key="index" class="mr-2" @click="toDetail(index)">
        打开{{ index }}详情页
      </ent-button>
    </CollapseContainer>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntCollapseContainer, EntPageWrapper, useGo, useMessage, useTabs } from 'fe-ent-core';
  import { Alert, Input } from 'ant-design-vue';

  export default defineComponent({
    name: 'TabsDemo',
    components: {
      CollapseContainer: EntCollapseContainer,
      EntPageWrapper,
      [Input.name]: Input,
      [Alert.name]: Alert,
    },
    setup() {
      const go = useGo();
      const title = ref<string>('');
      const { closeAll, closeLeft, closeRight, closeOther, closeCurrent, refreshPage, setTitle } =
        useTabs();
      const { createMessage } = useMessage();
      function setTabTitle() {
        if (title.value) {
          setTitle(title.value);
        } else {
          createMessage.error('请输入要设置的Tab标题！');
        }
      }

      function toDetail(index: number) {
        go(`/feat/tabs/detail/${index}`);
      }
      return {
        closeAll,
        closeLeft,
        closeRight,
        closeOther,
        closeCurrent,
        toDetail,
        refreshPage,
        setTabTitle,
        title,
      };
    },
  });
</script>
