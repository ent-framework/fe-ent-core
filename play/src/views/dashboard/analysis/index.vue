<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" />
    <div class="md:flex enter-y">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from './components/grow-card.vue';
  import SiteAnalysis from './components/site-analysis.vue';
  import VisitSource from './components/visit-source.vue';
  import VisitRadar from './components/visit-radar.vue';
  import SalesProductPie from './components/sales-product-pie.vue';

  const loading = ref(true);
  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
