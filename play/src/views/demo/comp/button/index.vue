<template>
  <ent-page-wrapper
    content-full-height
    title="基础组件"
    content=" 基础组件依赖于ant-design-vue,组件库已有的基础组件,项目中不会再次进行demo展示（二次封装组件除外）"
  >
    <a-row :gutter="[20, 20]">
      <a-col :xl="10" :lg="24">
        <a-card title="BasicButton Color">
          <div class="my-2">
            <h3>success</h3>
            <div class="py-2">
              <ent-button> 成功 </ent-button>
              <ent-button class="ml-2" disabled> 禁用 </ent-button>
              <ent-button class="ml-2" loading> loading </ent-button>
              <ent-button type="link" class="ml-2"> link </ent-button>
              <ent-button type="link" class="ml-2" loading> loading link </ent-button>
              <ent-button type="link" class="ml-2" disabled> disabled link </ent-button>
            </div>
          </div>

          <div class="my-2">
            <h3>warning</h3>
            <ent-button> 警告 </ent-button>
            <ent-button class="ml-2" disabled> 禁用 </ent-button>
            <ent-button class="ml-2" loading> loading </ent-button>
            <ent-button type="link" class="ml-2"> link </ent-button>
            <ent-button type="link" class="ml-2" loading> loading link </ent-button>
            <ent-button type="link" class="ml-2" disabled> disabled link </ent-button>
          </div>

          <div class="my-2">
            <h3>error</h3>
            <ent-button> 错误 </ent-button>
            <ent-button class="ml-2" disabled> 禁用 </ent-button>
            <ent-button class="ml-2" loading> loading </ent-button>
            <ent-button type="link" class="ml-2"> link </ent-button>
            <ent-button type="link" class="ml-2" loading> loading link </ent-button>
            <ent-button type="link" class="ml-2" disabled> disabled link </ent-button>
          </div>

          <div class="my-2">
            <h3>ghost</h3>
            <ent-button ghost class="ml-2"> 幽灵成功 </ent-button>
            <ent-button ghost class="ml-2"> 幽灵警告 </ent-button>
            <ent-button ghost class="ml-2"> 幽灵错误 </ent-button>
            <ent-button ghost type="dashed" class="ml-2"> 幽灵警告dashed </ent-button>
            <ent-button ghost danger class="ml-2"> 幽灵危险 </ent-button>
          </div>
        </a-card>
      </a-col>
      <a-col :xl="14" :lg="24">
        <a-card title="BasicButton Types">
          <div class="my-2">
            <h3>primary</h3>
            <ent-button type="primary" pre-icon="mdi:page-next-outline"> 主按钮 </ent-button>
            <ent-button type="primary" class="ml-2" disabled> 禁用 </ent-button>
            <ent-button type="primary" class="ml-2" danger pre-icon="mdi:page-next-outline">
              危险
            </ent-button>
            <ent-button type="primary" class="ml-2" loading> loading </ent-button>
            <ent-button type="link" class="ml-2"> link </ent-button>
            <ent-button type="link" class="ml-2" loading> loading link </ent-button>
            <ent-button type="link" class="ml-2" disabled> disabled link </ent-button>
          </div>

          <div class="my-2">
            <h3>default</h3>
            <ent-button type="default"> 默认 </ent-button>
            <ent-button type="default" class="ml-2" disabled> 禁用 </ent-button>
            <ent-button type="default" class="ml-2" danger> 危险 </ent-button>
            <ent-button type="default" class="ml-2" loading> loading </ent-button>
            <ent-button type="link" class="ml-2"> link </ent-button>
            <ent-button type="link" class="ml-2" loading> loading link </ent-button>
            <ent-button type="link" class="ml-2" disabled> disabled link </ent-button>
          </div>

          <div class="my-2">
            <h3>dashed</h3>
            <ent-button type="dashed"> dashed </ent-button>
            <ent-button type="dashed" class="ml-2" disabled> 禁用 </ent-button>
            <ent-button type="dashed" class="ml-2" danger> 危险 </ent-button>
            <ent-button type="dashed" class="ml-2" loading> loading </ent-button>
          </div>

          <div class="my-2">
            <h3>ghost 常规幽灵按钮通常用于有色背景下</h3>
            <div class="bg-gray-400 py-2">
              <ent-button ghost type="primary" class="ml-2"> 幽灵主要 </ent-button>
              <ent-button ghost type="default" class="ml-2"> 幽灵默认 </ent-button>
              <ent-button ghost type="dashed" class="ml-2"> 幽灵dashed </ent-button>
              <ent-button ghost type="primary" class="ml-2" disabled> 禁用 </ent-button>
              <ent-button ghost type="primary" class="ml-2" loading> loading </ent-button>
            </div>
            <!-- antd 按钮不能同时使用ghost和link -->
            <!--      <ent-button ghost type="link" class="ml-2"> link </ent-button>-->
            <!--      <ent-button ghost type="link" class="ml-2" loading> loading link </ent-button>-->
            <!--      <ent-button ghost type="link" class="ml-2" disabled> disabled link </ent-button>-->
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[20, 20]">
      <a-col :xl="10" :lg="24">
        <a-card title="PopConfirm Color">
          <div class="my-2">
            <h3>带确认的按钮</h3>
            <div class="py-2">
              <ent-pop-button icon="ant-design:delete-outlined" @click="alert">
                <template #confirm> 确认删除？ </template>
                删除
              </ent-pop-button>
            </div>
          </div>
          <div class="my-2">
            <h3>带Tooltip & 确认的按钮</h3>
            <div class="py-2">
              <ent-pop-button icon="ant-design:delete-outlined" @click="alert">
                <template #confirm> 确认删除？ </template>
                <template #tooltip> 点击删除？ </template>
                删除
              </ent-pop-button>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :xl="14" :lg="24">
        <a-card>
          <StatisticCountdown
            title="Million Seconds"
            :value="deadline"
            format="HH:mm:ss:SSS"
            style="margin-right: 50px"
          />
          <StatisticCountdown title="Number" :value="100000" style="margin-right: 50px" />
        </a-card>
        <a-card>
          <ent-help text="Tooltip 内容"> Tooltip </ent-help>
        </a-card>
        <a-card>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-popconfirm
                @positive-click="handlePositiveClick"
                @negative-click="handleNegativeClick"
              >
                <template #trigger>
                  <n-button>引用</n-button>
                </template>
                一切都将一去杳然，任何人都无法将其捕获。
              </n-popconfirm>
            </template>
            如果它长得像鸭子，走起来像鸭子，叫起来也像鸭子，那它一定是个鸭子。
          </n-tooltip>
        </a-card>
      </a-col>
    </a-row>
  </ent-page-wrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Card, Col, Row, StatisticCountdown } from 'ant-design-vue';
  import { useMessage } from 'naive-ui';
  export default defineComponent({
    components: {
      ACard: Card,
      ARow: Row,
      ACol: Col,
      StatisticCountdown,
    },
    setup(props) {
      const alert = () => {
        console.log('clicked');
      };
      const message = useMessage();
      return {
        alert,
        deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
        handlePositiveClick() {
          message.info('是的');
        },
        handleNegativeClick() {
          message.info('并不');
        },
      };
    },
  });
</script>
