<template>
  <ent-page-wrapper title="水印示例">
    <ent-collapse-container class="w-full h-32 bg-white rounded-md" title="Global WaterMark">
      <ent-button type="primary" class="mr-2" @click="setWatermark('WaterMark Info')">
        Create
      </ent-button>
      <ent-button color="error" class="mr-2" @click="clear"> Clear </ent-button>
      <ent-button color="warning" class="mr-2" @click="setWatermark('WaterMark Info New')">
        Reset
      </ent-button>
    </ent-collapse-container>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useWatermark } from 'fe-ent-core/es/hooks';
  import type { Nullable } from 'fe-ent-core/es/types';

  export default defineComponent({
    setup() {
      const areaRef = ref<Nullable<HTMLElement>>(null);
      const { setWatermark, clear } = useWatermark();
      return {
        setWatermark,
        clear,
        areaRef,
      };
    },
  });
</script>
