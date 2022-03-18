<template>
  <EntPageWrapper title="Icon组件示例">
    <CollapseContainer title="Antv Icon使用 (直接按需引入相应组件即可)">
      <div class="flex justify-around">
        <GithubFilled :style="{ fontSize: '30px' }" />
        <QqCircleFilled :style="{ fontSize: '30px' }" />
        <WechatFilled :style="{ fontSize: '30px' }" />
        <AlipayCircleFilled :style="{ fontSize: '30px' }" />
        <IeCircleFilled :style="{ fontSize: '30px' }" />
        <TaobaoCircleFilled :style="{ fontSize: '30px' }" />
        <CodepenCircleFilled :style="{ fontSize: '30px' }" />
      </div>
    </CollapseContainer>

    <CollapseContainer title="IconIfy 组件使用" class="my-5">
      <div class="flex justify-around flex-wrap">
        <EntIcon icon="ion:layers-outline" :size="30" />
        <EntIcon icon="ion:bar-chart-outline" :size="30" />
        <EntIcon icon="ion:tv-outline" :size="30" />
        <EntIcon icon="ion:settings-outline" :size="30" />
      </div>
    </CollapseContainer>

    <CollapseContainer title="svg 雪碧图" class="my-5">
      <div class="flex justify-around flex-wrap">
        <EntSvgIcon name="test" size="32" />
        <template v-for="item in 6" :key="item">
          <EntSvgIcon :name="`dynamic-avatar-${item}`" size="32" />
        </template>
      </div>
    </CollapseContainer>

    <CollapseContainer title="图标选择器(Iconify)" class="my-5">
      <div class="flex justify-around flex-wrap">
        <EntIconPicker />
      </div>
    </CollapseContainer>

    <CollapseContainer title="图标选择器(Svg)" class="my-5">
      <div class="flex justify-around flex-wrap">
        <EntIconPicker mode="svg" />
      </div>
    </CollapseContainer>

    <Alert
      show-icon
      message="推荐使用Iconify组件"
      description="Icon组件基本包含所有的图标,在下面网址内你可以查询到你想要的任何图标。并且打包只会打包所用到的图标。"
    />
    <a-button type="link" @click="toIconify"> Iconify 图标大全 </a-button>
  </EntPageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { EntCollapseContainer } from 'fe-ent-core/lib/components/container';
  import { Alert } from 'ant-design-vue';
  import {
    QqCircleFilled,
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    IeCircleFilled,
    TaobaoCircleFilled,
    CodepenCircleFilled,
  } from '@ant-design/icons-vue';

  import { EntIcon, EntIconPicker, EntSvgIcon } from 'fe-ent-core/lib/components/icon';

  import { openWindow } from 'fe-ent-core/lib/utils';
  import { EntPageWrapper } from 'fe-ent-core/lib/components/page';

  export default defineComponent({
    components: {
      EntPageWrapper,
      CollapseContainer: EntCollapseContainer,
      GithubFilled,
      QqCircleFilled,
      WechatFilled,
      AlipayCircleFilled,
      IeCircleFilled,
      TaobaoCircleFilled,
      CodepenCircleFilled,
      EntIcon,
      Alert,
      EntIconPicker,
      EntSvgIcon,
    },
    setup() {
      return {
        toIconify: () => {
          openWindow('https://iconify.design/');
        },
      };
    },
  });
</script>
