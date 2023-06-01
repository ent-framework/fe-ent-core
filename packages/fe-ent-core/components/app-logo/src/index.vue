<!--
 * @Author: Vben
 * @Description: logo component
-->
<template>
  <div class="anticon" :class="getAppLogoClass" @click="goHome">
    <img :src="logoImageURL" />
    <div
      v-show="$props.showTitle"
      class="ml-2 truncate"
      :class="getTitleClass"
      :style="getTitleStyle"
    >
      {{ title }}
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { useDesign, useGlobSetting, useGo, useMenuSetting, useTheme } from '@ent-core/hooks';
  import { useGlobalStore, useUserStore } from '@ent-core/store';
  import LogoImg from './logo.png';
  import type { CSSProperties } from 'vue';
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
        // {
        //   'xs:opacity-0': !props.alwaysShowTitle,
        // },
      ]);
      const { token } = useTheme();
      const getTitleStyle = computed((): CSSProperties => {
        return {
          color: token.value.colorInfoText,
        };
      });
      function goHome() {
        go(userStore.getUserInfo.homePath || globalStore.getBaseHomePath);
      }

      const logoImageURL = logoUrl || LogoImg;

      return {
        title,
        goHome,
        getAppLogoClass,
        getTitleClass,
        getTitleStyle,
        logoImageURL,
      };
    },
  });
</script>
