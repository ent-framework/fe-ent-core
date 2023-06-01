<template>
  <ent-page-wrapper title="全屏示例">
    <ent-collapse-container class="w-full h-32 rounded-md" title="Window Full Screen">
      <ent-button type="primary" class="mr-2" @click="enter"> Enter Window Full Screen </ent-button>
      <ent-button color="success" class="mr-2" @click="toggle">
        Toggle Window Full Screen
      </ent-button>

      <ent-button color="error" class="mr-2" @click="exit"> Exit Window Full Screen </ent-button>

      Current State: {{ isFullscreen }}
    </ent-collapse-container>

    <ent-collapse-container class="w-full mt-5 rounded-md" title="Dom Full Screen">
      <ent-button type="primary" class="mr-2" @click="toggleDom">
        Enter Dom Full Screen
      </ent-button>
    </ent-collapse-container>

    <div
      ref="domRef"
      class="flex items-center justify-center w-1/2 h-64 mx-auto mt-10 rounded-md"
    >
      <ent-button type="primary" class="mr-2" @click="toggleDom"> Exit Dom Full Screen </ent-button>
    </div>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useFullscreen } from '@vueuse/core';

  export default defineComponent({
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
