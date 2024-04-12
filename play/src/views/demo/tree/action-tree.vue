<template>
  <ent-page-wrapper title="Tree函数操作示例" content-background content-class="p-4">
    <div class="mb-4">
      <ent-button class="mr-2" @click="expandAll(true)"> 展开全部 </ent-button>
      <ent-button class="mr-2" @click="expandAll(false)"> 折叠全部 </ent-button>
      <ent-button class="mr-2" @click="checkAll(true)"> 全选 </ent-button>
      <ent-button class="mr-2" @click="checkAll(false)"> 全不选 </ent-button>
      <ent-button class="mr-2" @click="handleLevel(2)"> 显示到第2级 </ent-button>
      <ent-button class="mr-2" @click="handleLevel(1)"> 显示到第1级 </ent-button>
    </div>
    <div class="mb-4">
      <ent-button class="mr-2" @click="handleSetCheckData"> 设置勾选数据 </ent-button>
      <ent-button class="mr-2" @click="handleGetCheckData"> 获取勾选数据 </ent-button>
      <ent-button class="mr-2" @click="handleSetSelectData"> 设置选中数据 </ent-button>
      <ent-button class="mr-2" @click="handleGetSelectData"> 获取选中数据 </ent-button>

      <ent-button class="mr-2" @click="handleSetExpandData"> 设置展开数据 </ent-button>
      <ent-button class="mr-2" @click="handleGetExpandData"> 获取展开数据 </ent-button>
    </div>
    <div class="mb-4">
      <ent-button class="mr-2" @click="appendNodeByKey(null)"> 添加根节点 </ent-button>
      <ent-button class="mr-2" @click="appendNodeByKey('2-2')">
        添加在parent3内添加节点
      </ent-button>
      <ent-button class="mr-2" @click="deleteNodeByKey('2-2')"> 删除parent3节点 </ent-button>
      <ent-button class="mr-2" @click="updateNodeByKey('1-1')"> 更新parent2节点 </ent-button>
    </div>
    <ent-tree ref="treeRef" :data="treeData" title="函数操作" :checkable="true" />
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { useMessage } from 'fe-ent-core/es/hooks';
  import { treeData } from './data';
  import type { Nullable } from 'fe-ent-core/es/types';
  import type { TreeActionType } from 'fe-ent-core/es/components/tree/interface';

  export default defineComponent({
    setup() {
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const { createMessage } = useMessage();

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      function handleLevel(level: number) {
        getTree().filterByLevel(level);
      }

      function handleSetCheckData() {
        getTree().setCheckedKeys(['0-0']);
      }

      function handleGetCheckData() {
        const keys = getTree().getCheckedKeys();
        createMessage.success(JSON.stringify(keys));
      }

      function handleSetSelectData() {
        getTree().setSelectedKeys(['0-0']);
      }

      function handleGetSelectData() {
        const keys = getTree().getSelectedKeys();
        createMessage.success(JSON.stringify(keys));
      }

      function handleSetExpandData() {
        getTree().setExpandedKeys(['0-0']);
      }

      function handleGetExpandData() {
        const keys = getTree().getExpandedKeys();
        createMessage.success(JSON.stringify(keys));
      }

      function checkAll(checkAll: boolean) {
        getTree().checkAll(checkAll);
      }

      function expandAll(checkAll: boolean) {
        getTree().expandAll(checkAll);
      }

      function appendNodeByKey(parentKey: string | null = null) {
        getTree().insertNodeByKey({
          parentKey,
          node: {
            title: '新增节点',
            key: '2-2-2',
          },
          // 往后插入
          push: 'push',
          // 往前插入
          // push:'unshift'
        });
      }

      function deleteNodeByKey(key: string) {
        getTree().deleteNodeByKey(key);
      }

      function updateNodeByKey(key: string) {
        getTree().updateNodeByKey(key, {
          title: 'parent2-new',
        });
      }

      return {
        treeData,
        treeRef,
        handleLevel,
        handleSetCheckData,
        handleGetCheckData,
        handleSetSelectData,
        handleGetSelectData,
        handleSetExpandData,
        handleGetExpandData,
        appendNodeByKey,
        deleteNodeByKey,
        updateNodeByKey,
        checkAll,
        expandAll,
      };
    },
  });
</script>
