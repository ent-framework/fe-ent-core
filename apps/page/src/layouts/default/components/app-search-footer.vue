<template>
  <div :class="`${prefixCls}`">
    <AppSearchKeyItem :class="`${prefixCls}-item`" icon="ant-design:enter-outlined" />
    <span>{{ t('component.app.toSearch') }}</span>
    <AppSearchKeyItem :class="`${prefixCls}-item`" icon="ion:arrow-up-outline" />
    <AppSearchKeyItem :class="`${prefixCls}-item`" icon="ion:arrow-down-outline" />
    <span>{{ t('component.app.toNavigate') }}</span>
    <AppSearchKeyItem :class="`${prefixCls}-item`" icon="mdi:keyboard-esc" />
    <span>{{ t('common.closeText') }}</span>
  </div>
</template>

<script lang="ts" setup>
  import AppSearchKeyItem from './app-search-key-item.vue';
  import { useDesign } from 'fe-ent-core/lib/hooks';
  import { useI18n } from 'fe-ent-core/lib/hooks';
  const { prefixCls } = useDesign('app-search-footer');
  const { t } = useI18n();
</script>
