<!--
 * @Author: Vben
 * @Description: logo component
-->
<template>
  <div class="anticon" :class="getAppLogoClass" @click="goHome">
    <img :src="logoImageURL" />
    <div v-show="$props.showTitle" class="ml-2 truncate md:opacity-100" :class="getTitleClass">
      {{ title }}
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { useDesign, useGlobSetting, useGo, useMenuSetting } from '@ent-core/hooks';
  import { useGlobalStore, useUserStore } from '@ent-core/store';
  import LogoImg from './logo.png';
  const props = {
    /**
     * The theme of the current parent component
     */
    theme: { type: String, validator: (v: string) => ['light', 'dark'].includes(v) },
    /**
     * Whether to show title
     */
    showTitle: { type: Boolean, default: true },
    /**
     * The title is also displayed when the menu is collapsed
     */
    alwaysShowTitle: { type: Boolean },
  };

  export default defineComponent({
    name: 'EntAppLogo',
    props,
    setup(props) {
      const { prefixCls } = useDesign('app-logo');
      const { getCollapsedShowTitle } = useMenuSetting();
      const userStore = useUserStore();
      const { title, logoUrl } = useGlobSetting();
      const globalStore = useGlobalStore();

      const go = useGo();

      const getAppLogoClass = computed(() => [
        prefixCls,
        props.theme,
        { 'collapsed-show-title': unref(getCollapsedShowTitle) },
      ]);

      const getTitleClass = computed(() => [
        `${prefixCls}__title`,
        {
          'xs:opacity-0': !props.alwaysShowTitle,
        },
      ]);

      function goHome() {
        go(userStore.getUserInfo.homePath || globalStore.getBaseHomePath);
      }

      const logoImageURL = logoUrl || LogoImg;

      return {
        title,
        goHome,
        getAppLogoClass,
        getTitleClass,
        logoImageURL,
      };
    },
  });
</script>
