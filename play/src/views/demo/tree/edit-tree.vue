<template>
  <EntPageWrapper title="Tree函数操作示例">
    <div class="flex">
      <BasicTree
        class="w-1/3"
        title="右侧操作按钮/自定义图标"
        helpMessage="帮助信息"
        :treeData="treeData"
        :actionList="actionList"
        :renderIcon="createIcon"
      />
      <BasicTree
        class="w-1/3 mx-4"
        title="右键菜单"
        :treeData="treeData"
        :beforeRightClick="getRightMenuList"
      />
      <BasicTree
        class="w-1/3"
        title="工具栏使用"
        toolbar
        checkable
        search
        :treeData="treeData"
        :beforeRightClick="getRightMenuList"
      />
    </div>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';
  import { BasicTree, TreeActionItem } from 'fe-ent-core/lib/components/tree';
  import { ContextMenuItem } from 'fe-ent-core/lib/components/context-menu';
  import { treeData } from './data';
  import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

  export default defineComponent({
    components: { BasicTree, EntPageWrapper },
    setup() {
      function handlePlus(node: any) {
        console.log(node);
      }

      function getRightMenuList(node: any): ContextMenuItem[] {
        return [
          {
            label: '新增',
            handler: () => {
              console.log('点击了新增', node);
            },
            icon: 'bi:plus',
          },
          {
            label: '删除',
            handler: () => {
              console.log('点击了删除', node);
            },
            icon: 'bx:bxs-folder-open',
          },
        ];
      }
      const actionList: TreeActionItem[] = [
        {
          // show:()=>boolean;
          render: (node) => {
            return h(PlusOutlined, {
              class: 'ml-2',
              onClick: () => {
                handlePlus(node);
              },
            });
          },
        },
        {
          render: () => {
            return h(DeleteOutlined);
          },
        },
      ];

      function createIcon({ level }) {
        if (level === 1) {
          return 'ion:git-compare-outline';
        }
        if (level === 2) {
          return 'ion:home';
        }
        if (level === 3) {
          return 'ion:airplane';
        }
        return '';
      }
      return { treeData, actionList, getRightMenuList, createIcon };
    },
  });
</script>
