<template>
  <ConfigProvider :locale="getAntdLocale">
    <EntAppProvider>
      <RouterView />
    </EntAppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { EntAppProvider, useLocale, useTitle } from 'fe-ent-core';

  // support Multi-language
  const { getAntdLocale } = useLocale();
  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
