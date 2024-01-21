<!--
 * @Author: Vben
 * @Description: logo component
-->
<template>
  <div class="anticon" :class="getAppLogoClass" :style="getWrapStyle" @click="goHome">
    <img :src="logoImageURL" />
    <Text v-show="$props.showTitle" class="ml-2 truncate" :class="getTitleClass">{{ title }}</Text>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { Typography } from 'ant-design-vue';
  import { useDesign, useGlobSetting, useGo, useTheme } from '@ent-core/hooks';
  import { useUserStore } from '@ent-core/store';
  import LogoImg from './logo.png';
  import type { CSSProperties } from 'vue';
  const props = {
    /**
     * 是否显示标题
     */
    showTitle: { type: Boolean, default: true },

    /**
     * 是否有背景色
     */
    noBackground: { type: Boolean, default: false },
  };

  export default defineComponent({
    name: 'EntAppLogo',
    components: { Text: Typography.Text },
    props,
    setup() {
      const { prefixCls } = useDesign('app-logo');
      const userStore = useUserStore();
      const { title, logoUrl, homePath } = useGlobSetting();

      const go = useGo();

      const getAppLogoClass = computed(() => [prefixCls]);

      const getTitleClass = computed(() => [`${prefixCls}__title`]);
      const { useToken } = useTheme();
      const { token } = useToken();

      const getWrapStyle = computed((): CSSProperties => {
        if (!props.noBackground) {
          const tokenValue = unref(token);
          return {
            backgroundColor: tokenValue.colorBgContainer,
          };
        }

        return {};
      });
      function goHome() {
        go(userStore.getUserInfo?.homePath || homePath);
      }

      const logoImageURL = logoUrl || LogoImg;

      return {
        title,
        token,
        goHome,
        getAppLogoClass,
        getTitleClass,
        getWrapStyle,
        logoImageURL,
      };
    },
  });
</script>
