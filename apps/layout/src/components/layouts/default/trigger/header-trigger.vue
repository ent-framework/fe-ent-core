<template>
  <span :class="[prefixCls, theme]" @click="toggleCollapsed">
    <EntIcon v-if="getCollapsed" icon="ant-design:menu-unfold-outlined" />
    <EntIcon v-else icon="ant-design:menu-fold-outlined" />
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntIcon } from 'fe-ent-core';
  import { useDesign } from 'fe-ent-core/es/hooks';
  import { useMenuSetting } from '../../../../hooks';

  export default defineComponent({
    name: 'HeaderTrigger',
    components: { EntIcon },
    props: {
      theme: {
        type: String,
        required: true,
        validator: (value: string) => {
          // 定义允许的值
          const validThemes = ['dark', 'light'];
          // 检查传入的值是否有效
          return validThemes.includes(value);
        }
      }
    },
    setup() {
      const { getCollapsed, toggleCollapsed } = useMenuSetting();
      const { prefixCls } = useDesign('layout-header-trigger');
      return { getCollapsed, toggleCollapsed, prefixCls };
    }
  });
</script>
