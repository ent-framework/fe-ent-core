<template>
  <ConfigProvider :locale="getAntdLocale">
    <EntAppProvider>
      <RouterView />
    </EntAppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { EntAppProvider } from 'fe-ent-core/lib/components/application';
  import { useTitle } from 'fe-ent-core/lib/hooks/web/use-title';
  import { useLocale } from 'fe-ent-core/lib/locales/use-locale';

  // support Multi-language
  const { getAntdLocale } = useLocale();
  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
