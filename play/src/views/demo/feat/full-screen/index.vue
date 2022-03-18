<template>
  <EntPageWrapper title="全屏示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Window Full Screen">
      <a-button type="primary" @click="enter" class="mr-2"> Enter Window Full Screen </a-button>
      <a-button color="success" @click="toggle" class="mr-2"> Toggle Window Full Screen </a-button>

      <a-button color="error" @click="exit" class="mr-2"> Exit Window Full Screen </a-button>

      Current State: {{ isFullscreen }}
    </CollapseContainer>

    <CollapseContainer class="w-full mt-5 bg-white rounded-md" title="Dom Full Screen">
      <a-button type="primary" @click="toggleDom" class="mr-2"> Enter Dom Full Screen </a-button>
    </CollapseContainer>

    <div
      ref="domRef"
      class="flex items-center justify-center w-1/2 h-64 mx-auto mt-10 bg-white rounded-md"
    >
      <a-button type="primary" @click="toggleDom" class="mr-2"> Exit Dom Full Screen </a-button>
    </div>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntCollapseContainer } from 'fe-ent-core/lib/components/container';
  import { useFullscreen } from '@vueuse/core';

  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

  export default defineComponent({
    components: { CollapseContainer: EntCollapseContainer, EntPageWrapper },
    setup() {
      const domRef = ref<Nullable<HTMLElement>>(null);
      const { enter, toggle, exit, isFullscreen } = useFullscreen();

      const { toggle: toggleDom } = useFullscreen(domRef);
      return {
        enter,
        toggleDom,
        toggle,
        isFullscreen,
        exit,
        domRef,
      };
    },
  });
</script>
