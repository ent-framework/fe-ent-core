<template>
  <EntPageWrapper title="水印示例">
    <CollapseContainer class="w-full h-32 bg-white rounded-md" title="Global WaterMark">
      <a-button type="primary" class="mr-2" @click="setWatermark('WaterMark Info')">
        Create
      </a-button>
      <a-button color="error" class="mr-2" @click="clear"> Clear </a-button>
      <a-button color="warning" class="mr-2" @click="setWatermark('WaterMark Info New')">
        Reset
      </a-button>
    </CollapseContainer>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { EntCollapseContainer } from 'fe-ent-core/lib/components/container';
  import { useWatermark } from 'fe-ent-core/lib/hooks/web/use-watermark';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

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
