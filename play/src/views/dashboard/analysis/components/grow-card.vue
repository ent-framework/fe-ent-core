<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0 !mt-4"
        :class="[index + 1 < 4 && '!md:mr-4']"
        :canExpan="false"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between">
          <ent-count-to prefix="$" :startVal="1" :endVal="item.value" class="text-2xl" />
          <ent-icon :icon="item.icon" :size="40" />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <ent-count-to prefix="$" :startVal="1" :endVal="item.total" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { EntIcon } from 'fe-ent-core/lib/components/icon';
  import { Tag, Card } from 'ant-design-vue';
  import { growCardList } from '../data';

  defineProps({
    loading: {
      type: Boolean,
    },
  });
</script>
