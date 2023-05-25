<template>
  <MenuItem :key="itemKey">
    <span class="flex items-center">
      <EntIcon :icon="icon" class="mr-1" />
      <span>{{ text }}</span>
    </span>
  </MenuItem>
</template>
<script lang="ts">
  import { computed, defineComponent, getCurrentInstance } from 'vue';
  import { Menu } from 'ant-design-vue';

  import { EntIcon } from 'fe-ent-core';
  import { propTypes } from 'fe-ent-core/es/utils';

  export default defineComponent({
    name: 'DropdownMenuItem',
    components: { MenuItem: Menu.Item, EntIcon },
    props: {
      key: propTypes.string,
      text: propTypes.string,
      icon: propTypes.string,
    },
    setup(props) {
      const instance = getCurrentInstance();
      const itemKey = computed(() => props.key || instance?.vnode?.props?.key);
      return { itemKey };
    },
  });
</script>
