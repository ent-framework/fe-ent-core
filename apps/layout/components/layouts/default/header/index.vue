<template>
  <Header :class="getHeaderClass" :style="getHeaderStyle">
    <!-- left start -->
    <div :class="`${prefixCls}-left`">
      <!-- logo -->
      <EntAppLogo
        v-if="getShowHeaderLogo || getIsMobile"
        :class="`${prefixCls}-logo`"
        :style="getLogoWidth"
      />
      <LayoutTrigger
        v-if="
          (getShowContent && getShowHeaderTrigger && !getSplit && !getIsMixSidebar) || getIsMobile
        "
        :sider="false"
      />
      <LayoutBreadcrumb v-if="getShowContent && getShowBread" />
    </div>
    <!-- left end -->

    <!-- menu start -->
    <div v-if="getShowTopMenu && !getIsMobile" :class="`${prefixCls}-menu`">
      <LayoutMenu :is-horizontal="true" :split-type="getSplitType" :menu-mode="getMenuMode" />
    </div>
    <!-- menu-end -->

    <!-- action  -->
    <div :class="`${prefixCls}-action`">
      <AppSearch v-if="getShowSearch" :class="`${prefixCls}-action__item `" />

      <ErrorAction v-if="getUseErrorHandle" :class="`${prefixCls}-action__item error-action`" />

      <Notify v-if="getShowNotice" :class="`${prefixCls}-action__item notify-item`" />

      <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-action__item fullscreen-item`" />

      <EntLocalePicker
        v-if="getShowLocalePicker"
        :reload="true"
        :show-text="false"
        :class="`${prefixCls}-action__item`"
      />

      <EntDarkModeToggle v-if="getShowDarkModeToggle" class="mx-auto" />

      <UserDropDown v-if="isLogined" />

      <SettingDrawer v-if="getShowSetting" :class="`${prefixCls}-action__item`" />
    </div>
  </Header>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import {
    useAppInject,
    useDesign,
    useHeaderSetting,
    useMenuSetting,
    useRootSetting,
    useTheme,
  } from 'fe-ent-core/es/hooks';
  import { EntAppLogo, EntDarkModeToggle, EntLocalePicker } from 'fe-ent-core';
  import { MenuModeEnum, MenuSplitTyeEnum, SettingButtonPositionEnum } from 'fe-ent-core/es/logics';
  import { propTypes } from 'fe-ent-core/es/utils';
  import { useLocale } from 'fe-ent-core/es/locales';
  import { useUserStoreWithOut } from 'fe-ent-core/es/store';
  import { Layout } from 'ant-design-vue';

  import AppSearch from '../components/app-search.vue';
  import LayoutTrigger from '../trigger/index.vue';
  import LayoutMenu from '../menu/index.vue';
  import SettingDrawer from '../setting/index.vue';
  import { ErrorAction, FullScreen, LayoutBreadcrumb, Notify, UserDropDown } from './components';
  import type { CSSProperties } from 'vue';

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      Header: Layout.Header,
      EntAppLogo,
      LayoutTrigger,
      LayoutBreadcrumb,
      LayoutMenu,
      UserDropDown,
      EntLocalePicker,
      FullScreen,
      Notify,
      AppSearch,
      ErrorAction,
      SettingDrawer,
      EntDarkModeToggle,
    },
    props: {
      fixed: propTypes.bool,
    },
    setup(props) {
      const { prefixCls } = useDesign('layout-header');
      const {
        getShowTopMenu,
        getShowHeaderTrigger,
        getSplit,
        getIsMixMode,
        getMenuWidth,
        getIsMixSidebar,
      } = useMenuSetting();
      const {
        getUseErrorHandle,
        getShowSettingButton,
        getSettingButtonPosition,
        getShowDarkModeToggle,
      } = useRootSetting();

      const {
        getShowFullScreen,
        getShowNotice,
        getShowContent,
        getShowBread,
        getShowHeaderLogo,
        getShowHeader,
        getShowSearch,
      } = useHeaderSetting();

      const { useToken, getActualHeaderTheme } = useTheme();

      const { getShowLocalePicker } = useLocale();
      const userStore = useUserStoreWithOut();
      const { getIsMobile } = useAppInject();

      const getHeaderClass = computed(() => {
        const theme = unref(getActualHeaderTheme);
        return [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: props.fixed,
            [`${prefixCls}--mobile`]: unref(getIsMobile),
            [`${prefixCls}--${theme}`]: theme,
          },
        ];
      });
      const { token } = useToken();
      const getHeaderStyle = computed((): CSSProperties => {
        const tokenValues = unref(token);
        return {
          backgroundColor: tokenValues.colorBgContainer,
        };
      });

      const getShowSetting = computed(() => {
        if (!unref(getShowSettingButton)) {
          return false;
        }
        const settingButtonPosition = unref(getSettingButtonPosition);

        if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
          return unref(getShowHeader);
        }
        return settingButtonPosition === SettingButtonPositionEnum.HEADER;
      });

      const getLogoWidth = computed(() => {
        if (!unref(getIsMixMode) || unref(getIsMobile)) {
          return {};
        }
        const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth);
        return { width: `${width}px` };
      });

      const getSplitType = computed(() => {
        return unref(getSplit) ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE;
      });

      const getMenuMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null;
      });

      const isLogined = !!userStore.getToken;

      return {
        prefixCls,
        getHeaderClass,
        getShowHeaderLogo,
        getShowHeaderTrigger,
        getShowDarkModeToggle,
        getIsMobile,
        getShowBread,
        getShowContent,
        getSplitType,
        getSplit,
        getMenuMode,
        getShowTopMenu,
        getShowLocalePicker,
        getShowFullScreen,
        getShowNotice,
        getUseErrorHandle,
        getLogoWidth,
        getIsMixSidebar,
        getShowSettingButton,
        getShowSetting,
        getShowSearch,
        getHeaderStyle,
        isLogined,
      };
    },
  });
</script>
