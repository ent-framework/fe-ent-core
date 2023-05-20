<template>
  <ConfigProvider :locale="getAntdLocale">
    <EntAppProvider>
      <RouterView />
    </EntAppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { EntAppProvider } from '@ent-core/components/app-provider';
  import { useTitle } from '@ent-core/hooks/web/use-title';
  import { useLocale } from '@ent-core/locales/use-locale';

  // support Multi-language
  const { getAntdLocale } = useLocale();
  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
