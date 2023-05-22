<template>
  <CollapseContainer title="账号绑定" :can-expan="false">
    <List>
      <template v-for="item in list" :key="item.key">
        <ListItem>
          <ListItemMeta>
            <template #avatar>
              <Icon v-if="item.avatar" class="avatar" :icon="item.avatar" :color="item.color" />
            </template>
            <template #title>
              {{ item.title }}
              <ent-button v-if="item.extra" type="link" size="small" class="extra">
                {{ item.extra }}
              </ent-button>
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
  import Icon, { EntCollapseContainer } from 'fe-ent-core';

  import { accountBindList } from './data';

  export default defineComponent({
    components: {
      CollapseContainer: EntCollapseContainer,
      List,
      ListItem: List.Item,
      ListItemMeta: List.Item.Meta,
      Icon,
    },
    setup() {
      return {
        list: accountBindList,
      };
    },
  });
</script>
<style lang="less" scoped>
  .avatar {
    font-size: 40px !important;
  }

  .extra {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
    cursor: pointer;
  }
</style>
