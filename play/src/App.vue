<template>
  <NConfigProvider
    :abstract="true"
    :locale="getCombinedLocale.nLocale"
    :date-locale="getCombinedLocale.nDateLocale"
    :theme="theme"
  >
    <NLoadingBarProvider>
      <NDialogProvider>
        <NNotificationProvider>
          <NMessageProvider>
            <NModalProvider>
              <EntAppProvider>
                <RouterView />
              </EntAppProvider>
            </NModalProvider>
          </NMessageProvider>
        </NNotificationProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
    <NGlobalStyle />
  </NConfigProvider>
</template>

<script lang="ts" setup>
  import { EntAppProvider } from 'fe-ent-core';
  import {
    NLoadingBarProvider,
    NMessageProvider,
    NModalProvider,
    NNotificationProvider,
    NDialogProvider
  } from 'naive-ui';
  import { NConfigProvider, NGlobalStyle } from 'naive-ui';
  import { useLocale } from 'fe-ent-core/es/locales';
  import { useTheme, useTitle } from 'fe-ent-core/es/hooks';

  // support Multi-language
  const { getCombinedLocale } = useLocale();
  const { theme, themeOverrides } = useTheme();
  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
