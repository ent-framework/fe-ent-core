<template>
  <NConfigProvider
    :abstract="true"
    :locale="getCombinedLocale.nLocale"
    :date-locale="getCombinedLocale.nDateLocale"
    :theme="theme"
  >
    <EntAppProvider>
      <RouterView />
    </EntAppProvider>
    <NGlobalStyle />
  </NConfigProvider>
</template>

<script lang="ts" setup>
  import { EntAppProvider } from 'fe-ent-core';
  import { NConfigProvider, NGlobalStyle } from 'naive-ui';
  import { useTheme, useTitle } from 'fe-ent-core/es/hooks';
  import { useLocale } from 'fe-ent-core/es/locales/use-locale';
  // support Multi-language
  const { getCombinedLocale } = useLocale();
  const { theme, themeOverrides } = useTheme();
  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
