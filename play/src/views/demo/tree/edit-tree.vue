<template>
  <ent-page-wrapper title="Tree函数操作示例">
    <div class="flex">
      <ent-tree
        class="w-1/3"
        title="右侧操作按钮/自定义图标"
        help-message="帮助信息"
        :tree-data="treeData"
        :action-list="actionList"
        :render-icon="createIcon"
      />
      <ent-tree
        class="w-1/3 mx-4"
        title="右键菜单"
        :tree-data="treeData"
        :before-right-click="getRightMenuList"
      />
      <ent-tree
        class="w-1/3"
        title="工具栏使用"
        toolbar
        checkable
        search
        :tree-data="treeData"
        :before-right-click="getRightMenuList"
      />
    </div>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';
  import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { treeData } from './data';
  import type { TreeActionItem } from 'fe-ent-core/es/components/tree/interface';
  import type { ContextMenuItem } from 'fe-ent-core/es/components/context-menu/interface';

  export default defineComponent({
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
