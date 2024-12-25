<template>
  <NCard title="快捷导航" v-bind="$attrs">
    <template v-for="item in navItems" :key="item">
      <CardGrid>
        <span class="flex flex-col items-center">
          <ent-icon :icon="item.icon" :color="item.color" size="20" />
          <span class="text-md mt-2">{{ item.title }}</span>
        </span>
      </CardGrid>
    </template>
  </NCard>
</template>
<script lang="ts" setup>
  import { NCard } from 'naive-ui';
  import { navItems } from './data';

  const CardGrid = Card.Grid;
</script>
