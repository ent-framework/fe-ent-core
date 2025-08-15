<template>
  <LayoutLockPage />
  <NBackTop v-if="getUseOpenBackTop" :listen-to="getTarget" :right="100" />
  <SessionTimeoutLogin v-if="getIsSessionTimeout" />
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { NBackTop } from 'naive-ui';

  import { useDesign } from 'fe-ent-core/es/hooks';
  import { useUserStore } from 'fe-ent-core/es/store';
  import { useLayoutThemeSetting } from '../../../../hooks';

  import SessionTimeoutLogin from '../../../views/login/session-timeout-login.vue';
  import LayoutLockPage from '../../../views/lock/index.vue';
  export default defineComponent({
    name: 'LayoutFeatures',
    components: {
      NBackTop,
      LayoutLockPage,
      SessionTimeoutLogin
    },
    setup() {
      const { getUseOpenBackTop } =
        useLayoutThemeSetting();
      const userStore = useUserStore();
      const { prefixCls } = useDesign('setting-drawer-feature');

      const getIsSessionTimeout = computed(() => userStore.getSessionTimeout);

      return {
        getTarget: () => document.body,
        getUseOpenBackTop,
        prefixCls,
        getIsSessionTimeout
      };
    }
  });
</script>
