<template>
  <ent-page-wrapper title="卡片列表示例" content="基础封装">
    <ent-card-list :params="params" :api="demoListApi" @getMethod="getMethod" @delete="handleDel">
      <template #header>
        <ent-button type="primary" color="error"> 按钮1 </ent-button>
        <ent-button type="primary" color="success"> 按钮2 </ent-button>
      </template>
    </ent-card-list>
  </ent-page-wrapper>
</template>
<script lang="ts" setup>
  import { demoListApi } from '/@/api/table';
  import { useMessage } from 'fe-ent-core/lib/hooks/web/use-message';
  import { EntCardList } from 'fe-ent-core/lib/components/card-list';
  const { notification } = useMessage();
  // 请求api时附带参数
  const params = {};

  let reload = () => {};
  // 获取内部fetch方法;
  function getMethod(m: any) {
    reload = m;
  }
  //删除按钮事件
  function handleDel(id) {
    console.log(id);
    notification.success({ message: `成功删除${id}` });
    reload();
  }
</script>
