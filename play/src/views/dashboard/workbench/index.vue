<template>
  <EntPageWrapper>
    <template #headerContent> <WorkbenchHeader /> </template>
    <div class="lg:flex">
      <div class="lg:w-7/10 w-full !mr-4 enter-y">
        <ProjectCard :loading="loading" class="enter-y" />
        <DynamicInfo :loading="loading" class="!my-4 enter-y" />
      </div>
      <div class="lg:w-3/10 w-full enter-y">
        <QuickNav :loading="loading" class="enter-y" />

        <Card class="!my-4 enter-y" :loading="loading">
          <img class="xl:h-50 h-30 mx-auto" :src="img" />
        </Card>

        <SaleRadar :loading="loading" class="enter-y" />
      </div>
    </div>
  </EntPageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';
  import WorkbenchHeader from './components/workbench-header.vue';
  import ProjectCard from './components/project-card.vue';
  import QuickNav from './components/quick-nav.vue';
  import DynamicInfo from './components/dynamic-info.vue';
  import SaleRadar from './components/sale-radar.vue';
  import img from '/@/assets/svg/illustration.svg';
  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
