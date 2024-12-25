<template>
  <SiderTrigger v-if="sider" />
  <HeaderTrigger v-else :theme="theme" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import SiderTrigger from './sider-trigger.vue';
  import HeaderTrigger from './header-trigger.vue';

  export default defineComponent({
    name: 'LayoutTrigger',
    components: {
      SiderTrigger,
      HeaderTrigger
    },
    props: {
      sider: {
        type: Boolean,
        default: true
      },
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
    }
  });
</script>
