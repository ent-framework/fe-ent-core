<template>
  <ent-collapse-container>
    <div ref="wrapperRef" :class="prefixCls">
      <Tabs tab-position="left" :tab-bar-style="tabBarStyle">
        <template v-for="item in settingList" :key="item.key">
          <TabPane :tab="item.name">
            <component :is="item.component" />
          </TabPane>
        </template>
      </Tabs>
    </div>
  </ent-collapse-container>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import { settingList } from './data';
  import BaseSetting from './base-setting.vue';
  import SecureSetting from './secure-setting.vue';
  import AccountBind from './account-bind.vue';
  import MsgNotify from './msg-notify.vue';

  export default defineComponent({
    components: {
      Tabs,
      TabPane: Tabs.TabPane,
      BaseSetting,
      SecureSetting,
      AccountBind,
      MsgNotify,
    },
    setup() {
      return {
        prefixCls: 'account-setting',
        settingList,
        tabBarStyle: {
          width: '220px',
        },
      };
    },
  });
</script>
<style lang="less">
  .account-setting {
    margin: 12px;

    .base-title {
      padding-left: 0;
    }
  }
</style>
