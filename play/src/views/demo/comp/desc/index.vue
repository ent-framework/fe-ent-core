<template>
  <ent-page-wrapper title="详情组件示例">
    <ent-description
      title="基础示例"
      :collapse-options="{ canExpand: true, helpMessage: 'help me' }"
      :column="3"
      :data="mockData"
      :schema="schema"
    />

    <ent-description
      class="mt-4"
      title="垂直示例"
      layout="vertical"
      :collapse-options="{ canExpand: true, helpMessage: 'help me' }"
      :column="2"
      :data="mockData"
      :schema="schema"
    />

    <ent-description class="mt-4" @register="register" />
    <ent-description class="mt-4" @register="register1" />
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntDescription, EntPageWrapper, useDescription } from 'fe-ent-core';
  import type { DescItem } from 'fe-ent-core';

  const mockData: Recordable = {
    username: 'test',
    nickName: 'VB',
    age: '123',
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  };
  const schema: DescItem[] = [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'nickName',
      label: '昵称',
      render: (curVal, data) => {
        return `${data.username}-${curVal}`;
      },
    },
    {
      field: 'phone',
      label: '联系电话',
    },
    {
      field: 'email',
      label: '邮箱',
    },
    {
      field: 'addr',
      label: '地址',
    },
  ];
  export default defineComponent({
    components: { EntDescription, EntPageWrapper },
    setup() {
      const [register] = useDescription({
        title: 'useDescription',
        data: mockData,
        schema,
      });

      const [register1] = useDescription({
        title: '无边框',
        bordered: false,
        data: mockData,
        schema,
      });

      return { mockData, schema, register, register1 };
    },
  });
</script>
