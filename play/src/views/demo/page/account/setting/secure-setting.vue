<template>
  <CollapseContainer title="安全设置" :can-expan="false">
    <List>
      <template v-for="item in list" :key="item.key">
        <ListItem>
          <ListItemMeta>
            <template #title>
              {{ item.title }}
              <div v-if="item.extra" class="extra">
                {{ item.extra }}
              </div>
            </template>
            <template #description>
              <div>{{ item.description }}</div>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </CollapseContainer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { List } from 'ant-design-vue';
  import { EntCollapseContainer } from 'fe-ent-core';

  import { secureSettingList } from './data';

  export default defineComponent({
    components: {
      CollapseContainer: EntCollapseContainer,
      List,
      ListItem: List.Item,
      ListItemMeta: List.Item.Meta,
    },
    setup() {
      return {
        list: secureSettingList,
      };
    },
  });
</script>
<style lang="less" scoped>
  .extra {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
    font-weight: normal;
    color: #1890ff;
    cursor: pointer;
  }
</style>
