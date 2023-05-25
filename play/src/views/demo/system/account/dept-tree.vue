<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <ent-tree
      title="部门列表"
      toolbar
      search
      tree-wrapper-class-name="h-[calc(100%-35px)] overflow-auto"
      :click-row-to-expand="false"
      :tree-data="treeData"
      :field-names="{ key: 'id', title: 'deptName' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';

  import type { TreeItem } from 'fe-ent-core/es/components/tree/interface';
  import { getDeptList } from '/@/api/system';

  export default defineComponent({
    name: 'DeptTree',
    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);

      async function fetch() {
        treeData.value = (await getDeptList()) as unknown as TreeItem[];
      }

      function handleSelect(keys) {
        emit('select', keys[0]);
      }

      onMounted(() => {
        fetch();
      });
      return { treeData, handleSelect };
    },
  });
</script>
