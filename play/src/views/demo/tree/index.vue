<template>
  <ent-page-wrapper title="Tree基础示例">
    <Row :gutter="[16, 16]">
      <Col :span="8">
        <ent-tree title="基础示例，默认展开第一层" :tree-data="treeData" default-expand-level="1" />
      </Col>
      <Col :span="8">
        <ent-tree
          title="可勾选，默认全部展开"
          :data="treeData"
          :checkable="true"
          default-expand-all
          show-line
          @check="handleCheck"
        />
      </Col>
      <Col :span="8">
        <ent-tree
          title="指定默认展开/勾选示例"
          :data="treeData"
          :checkable="true"
          :expanded-keys="['0-0']"
          :checked-keys="['0-0']"
        />
      </Col>
      <Col :span="8">
        <ent-tree ref="asyncTreeRef" title="懒加载异步树" :data="tree" :load-data="onLoadData" />
      </Col>
      <Col :span="16">
        <Card title="异步数据，默认展开">
          <template #extra>
            <ent-button :loading="treeLoading" @click="loadTreeData">加载数据</ent-button>
          </template>
          <Spin :spinning="treeLoading">
            <ent-tree ref="asyncExpandTreeRef" :tree-data="tree2" />
          </Spin>
        </Card>
      </Col>
    </Row>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, nextTick, ref, unref } from 'vue';
  import { Card, Col, Row, Spin } from 'ant-design-vue';
  import { cloneDeep } from 'lodash';
  import { treeData } from './data';
  import type { TreeActionType, TreeItem } from 'fe-ent-core/es/components/tree/interface';
  import type { Nullable } from 'fe-ent-core/es/types';

  export default defineComponent({
    components: { Card, Row, Col, Spin },
    setup() {
      const asyncTreeRef = ref<Nullable<TreeActionType>>(null);
      const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);
      const tree2 = ref<TreeItem[]>([]);
      const treeLoading = ref(false);

      function handleCheck(checkedKeys, e) {
        console.log('onChecked', checkedKeys, e);
      }

      function loadTreeData() {
        treeLoading.value = true;
        // 以下是模拟异步获取数据
        setTimeout(() => {
          // 设置数据源
          tree2.value = cloneDeep(treeData);
          treeLoading.value = false;
          // 展开全部
          nextTick(() => {
            console.log(unref(asyncExpandTreeRef));
            unref(asyncExpandTreeRef)?.expandAll(true);
          });
        }, 2000);
      }

      const tree = ref([
        {
          title: 'parent ',
          key: '0-0',
        },
      ]);

      function onLoadData(treeNode) {
        return new Promise((resolve: (value?: unknown) => void) => {
          if (!treeNode.children) {
            resolve();
            return;
          }
          setTimeout(() => {
            const asyncTreeAction: TreeActionType | null = unref(asyncTreeRef);
            if (asyncTreeAction) {
              const nodeChildren = [
                { title: `Child Node ${treeNode.eventKey}-0`, key: `${treeNode.eventKey}-0` },
                { title: `Child Node ${treeNode.eventKey}-1`, key: `${treeNode.eventKey}-1` },
              ];
              asyncTreeAction.updateNodeByKey(treeNode.eventKey, { children: nodeChildren });
              asyncTreeAction.setExpandedKeys([
                treeNode.eventKey,
                ...asyncTreeAction.getExpandedKeys(),
              ]);
            }

            resolve();
            return;
          }, 1000);
        });
      }
      return {
        treeData,
        handleCheck,
        tree,
        onLoadData,
        asyncTreeRef,
        asyncExpandTreeRef,
        tree2,
        loadTreeData,
        treeLoading,
      };
    },
  });
</script>
