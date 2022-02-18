<template>
  <span :class="$attrs.class">
    <Icon :icon="icon" />
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Icon } from 'fe-ent-core/components//Icon';
  const props = {
    icon: String,
  };
  export default defineComponent({
    name: 'AppSearchKeyItem',
    components: { Icon },
    props,
  });
</script>
