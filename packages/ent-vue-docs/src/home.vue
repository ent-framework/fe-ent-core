<template>
  <div>
    <LayoutFeature />
    <LayoutHeader />
    <div style="text-align: center; margin: 4rem 0 4.25rem">
      <figure>
        <img :src="LogoImg" style="width: 100px" />
      </figure>
      <div class="home-features">
        <div class="wrapper">
          <div class="features">
            <section class="feature"
              ><h2 class="title">💡 最新技术栈</h2>
              <p class="details">基于Vue3、Vite、TypeScript等最新技术栈开发</p>
            </section>
            <section class="feature"
              ><h2 class="title">⚡️ 轻量快速的热重载</h2>
              <p class="details"> 无论应用程序大小如何，都始终极快的模块热重载（HMR）</p></section
            >
            <section class="feature"
              ><h2 class="title">🛠️ 丰富的示例</h2>
              <p class="details">常见的Web端插件示例实现</p></section
            >
            <section class="feature"
              ><h2 class="title">📦 组件封装</h2>
              <p class="details"> 对日常使用频率较高的组件二次封装,满足基础工作需求</p></section
            >
            <section class="feature"
              ><h2 class="title">🔩 主题配置</h2>
              <p class="details">丰富的主题配置及黑暗主题适配</p></section
            >
            <section class="feature"
              ><h2 class="title">🔑 权限管理</h2>
              <p class="details">完善的前后端权限管理方案</p></section
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { LayoutFeature, LayoutHeader } from 'fe-ent-page';
  import LogoImg from './assets/images/logo.png';
</script>
<style scoped lang="less">
  .home-features {
    padding-top: 0;
    margin: 0 auto;
    max-width: 960px;

    .wrapper {
      padding-top: 3.25rem;
      border-top: 1px solid #f8f8f8;
      max-width: 960px;
      .features {
        display: flex;
        flex-wrap: wrap;
        max-width: 960px;
        .feature {
          width: calc(100% / 3);
          flex-shrink: 0;
          padding: 20px 24px;
        }
      }
    }
  }
</style>
