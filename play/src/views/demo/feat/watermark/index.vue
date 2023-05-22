<template>
  <EntPageWrapper title="水印示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Global WaterMark">
      <ent-button type="primary" class="mr-2" @click="setWatermark('WaterMark Info')">
        Create
      </ent-button>
      <ent-button color="error" class="mr-2" @click="clear"> Clear </ent-button>
      <ent-button color="warning" class="mr-2" @click="setWatermark('WaterMark Info New')">
        Reset
      </ent-button>
    </CollapseContainer>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntCollapseContainer, EntPageWrapper, useWatermark } from 'fe-ent-core';

  export default defineComponent({
    components: { CollapseContainer: EntCollapseContainer, EntPageWrapper },
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
