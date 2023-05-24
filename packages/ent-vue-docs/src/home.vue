<template>
  <div>
    <LayoutFeature />
    <LayoutHeader />
    <div style="text-align: center; margin: 4rem 0 4.25rem">
      <figure>
        <img :src="LogoImg" style="width: 100px" />
        <div><h3>fe-ent-core是一个开箱即用的前端框架，来自于<a href="https://doc.vvbin.cn/">vben admin</a></h3></div>
        <div><h3>在vben admin的基础上做了模块化，可以基于fe-ent-core的依赖包做二次开发，可以快速起步。</h3></div>
        <div><h3>目前功能正在预览阶段，参考了Arco的工具链，目前组件的文档正在完善中。</h3>
          <a href="https://github.com/ent-framework/fe-ent-core" target="_blank" rel="noopener">
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="height: 20px;width: 20px;"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg></a></div>
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
  import { LayoutFeature, LayoutHeader } from 'fe-ent-layout';
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
