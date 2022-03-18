<template>
  <Card title="快捷导航" v-bind="$attrs">
    <template v-for="item in navItems" :key="item">
      <CardGrid>
        <span class="flex flex-col items-center">
          <EntIcon :icon="item.icon" :color="item.color" size="20" />
          <span class="text-md mt-2">{{ item.title }}</span>
        </span>
      </CardGrid>
    </template>
  </Card>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { navItems } from './data';
  import { EntIcon } from 'fe-ent-core/lib/components/icon';

  const CardGrid = Card.Grid;
</script>
