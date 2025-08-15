<template>
  <NCard title="快捷导航" v-bind="$attrs">
    <NGrid :x-gap="12" :y-gap="12" :cols="3">
      <NGridItem v-for="item in navItems" :key="item">
        <span class="flex flex-col items-center">
          <ent-icon :icon="item.icon" :color="item.color" size="20"/>
          <span class="text-md mt-2">{{ item.title }}</span>
        </span>
      </NGridItem>
    </NGrid>
  </NCard>
</template>
<script lang="ts" setup>
import {NCard, NGrid, NGridItem} from 'naive-ui';
import {navItems} from './data';

</script>
