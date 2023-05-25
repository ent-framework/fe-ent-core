<template>
  <ConfigProvider :locale="getAntdLocale">
    <EntAppProvider>
      <RouterView />
    </EntAppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { EntAppProvider } from 'fe-ent-core';
  import { useLocale } from 'fe-ent-core/es/locales';
  import { useTitle } from 'fe-ent-core/es/hooks';

  // support Multi-language
  const { getAntdLocale } = useLocale();
  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
