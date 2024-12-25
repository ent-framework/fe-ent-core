<template>
  <ent-page-wrapper title="关于">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a :href="GITHUB_URL" target="_blank">{{ name }}</a>
          是一个基于Vue3.0、Vite、 naive-ui 、TypeScript
          的后台解决方案，目标是为中大型项目开发,提供现成的开箱解决方案及丰富的示例,原则上不会限制任何代码用于商用。
        </span>
      </div>
    </template>
  </ent-page-wrapper>
</template>
<script lang="ts" setup>
  // github repo url
  const GITHUB_URL = 'https://github.com/ent-framework/fe-ent-core';
</script>
