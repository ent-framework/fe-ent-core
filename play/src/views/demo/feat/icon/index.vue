<template>
  <ent-page-wrapper title="Icon组件示例">
    <ent-collapse-container title="Antv Icon使用 (直接按需引入相应组件即可)">
      <div class="flex justify-around">
        <GithubFilled :style="{ fontSize: '30px' }" />
        <QqCircleFilled :style="{ fontSize: '30px' }" />
        <WechatFilled :style="{ fontSize: '30px' }" />
        <AlipayCircleFilled :style="{ fontSize: '30px' }" />
        <IeCircleFilled :style="{ fontSize: '30px' }" />
        <TaobaoCircleFilled :style="{ fontSize: '30px' }" />
        <CodepenCircleFilled :style="{ fontSize: '30px' }" />
      </div>
    </ent-collapse-container>

    <ent-collapse-container title="IconIfy 组件使用" class="my-5">
      <div class="flex justify-around flex-wrap">
        <ent-icon icon="ion:language" />
        <ent-icon icon="ion:layers-outline" :size="30" />
        <ent-icon icon="ion:bar-chart-outline" :size="30" />
        <ent-icon icon="ion:tv-outline" :size="30" />
        <ent-icon icon="ion:settings-outline" :size="30" />
      </div>
    </ent-collapse-container>

    <ent-collapse-container title="svg 雪碧图" class="my-5">
      <div class="flex justify-around flex-wrap">
        <ent-svg-icon name="test" size="32" />
        <template v-for="item in 6" :key="item">
          <ent-svg-icon :name="`dynamic-avatar-${item}`" size="32" />
        </template>
      </div>
    </ent-collapse-container>

    <ent-collapse-container title="图标选择器(Iconify)" class="my-5">
      <div class="flex justify-around flex-wrap">
        <ent-icon-picker />
      </div>
    </ent-collapse-container>

    <ent-collapse-container title="图标选择器(Svg)" class="my-5">
      <div class="flex justify-around flex-wrap">
        <ent-icon-picker mode="svg" />
      </div>
    </ent-collapse-container>

    <Alert
      show-icon
      message="推荐使用Iconify组件"
      description="Icon组件基本包含所有的图标,在下面网址内你可以查询到你想要的任何图标。并且打包只会打包所用到的图标。"
    />
    <ent-button type="link" @click="toIconify"> Iconify 图标大全 </ent-button>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { openWindow } from 'fe-ent-core';
  import { Alert } from 'ant-design-vue';
  import {
    AlipayCircleFilled,
    CodepenCircleFilled,
    GithubFilled,
    IeCircleFilled,
    QqCircleFilled,
    TaobaoCircleFilled,
    WechatFilled,
  } from '@ant-design/icons-vue';

  export default defineComponent({
    components: {
      GithubFilled,
      QqCircleFilled,
      WechatFilled,
      AlipayCircleFilled,
      IeCircleFilled,
      TaobaoCircleFilled,
      CodepenCircleFilled,
      Alert,
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
