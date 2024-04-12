<template>
  <div :class="prefixCls">
    <NPopover title="" trigger="click" :overlay-class-name="`${prefixCls}__overlay`">
      <template #trigger>
        <NBadge :count="count" dot :number-style="numberStyle">
          <BellOutlined />
        </NBadge>
      </template>
      <NTabs>
        <template v-for="item in listData" :key="item.key">
          <NTabPane :name="item.name" :tab="item.name">
            <template #tab>
              {{ item.name }}
              <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
            </template>
            <!-- 绑定title-click事件的通知列表中标题是“可点击”的-->
            <NoticeList v-if="item.key === '1'" :list="item.list" @title-click="onNoticeClick" />
            <NoticeList v-else :list="item.list" />
          </NTabPane>
        </template>
      </NTabs>
    </NPopover>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import { NBadge, NPopover, NTabs } from 'naive-ui';
  import { BellOutlined } from '@ant-design/icons-vue';
  import { useDesign, useMessage } from 'fe-ent-core/es/hooks';
  import { tabListData } from './data';
  import NoticeList from './notice-list.vue';
  import type { ListItem } from './data';

  export default defineComponent({
    components: { NPopover, BellOutlined, NTabs, NTabPane: NTabs.TabPane, NBadge, NoticeList },
    setup() {
      const { prefixCls } = useDesign('header-notify');
      const { createMessage } = useMessage();
      const listData = ref(tabListData);

      const count = computed(() => {
        let count = 0;
        for (const tabListDatum of tabListData) {
          count += tabListDatum.list.length;
        }
        return count;
      });

      function onNoticeClick(record: ListItem) {
        createMessage.success(`你点击了通知，ID=${record.id}`);
        // 可以直接将其标记为已读（为标题添加删除线）,此处演示的代码会切换删除线状态
        record.titleDelete = !record.titleDelete;
      }

      return {
        prefixCls,
        listData,
        count,
        onNoticeClick,
        numberStyle: {},
      };
    },
  });
</script>
