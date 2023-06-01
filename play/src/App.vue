<template>
  <ConfigProvider :locale="getAntdLocale" :theme="theme">
    <EntAppProvider>
      <RouterView />
    </EntAppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { EntAppProvider } from 'fe-ent-core';
  import { useLocale } from 'fe-ent-core/es/locales';
  import { useTheme, useTitle } from 'fe-ent-core/es/hooks';

  // support Multi-language
  const { getAntdLocale } = useLocale();
  const { theme } = useTheme();
  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
