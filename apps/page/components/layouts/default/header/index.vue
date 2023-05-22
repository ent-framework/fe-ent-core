<template>
  <Header :class="getHeaderClass">
    <!-- left start -->
    <div :class="`${prefixCls}-left`">
      <!-- logo -->
      <EntAppLogo
        v-if="getShowHeaderLogo || getIsMobile"
        :class="`${prefixCls}-logo`"
        :theme="getHeaderTheme"
        :style="getLogoWidth"
      />
      <LayoutTrigger
        v-if="
          (getShowContent && getShowHeaderTrigger && !getSplit && !getIsMixSidebar) || getIsMobile
        "
        :theme="getHeaderTheme"
        :sider="false"
      />
      <LayoutBreadcrumb v-if="getShowContent && getShowBread" :theme="getHeaderTheme" />
    </div>
    <!-- left end -->

    <!-- menu start -->
    <div v-if="getShowTopMenu && !getIsMobile" :class="`${prefixCls}-menu`">
      <LayoutMenu
        :is-horizontal="true"
        :theme="getHeaderTheme"
        :split-type="getSplitType"
        :menu-mode="getMenuMode"
      />
    </div>
    <!-- menu-end -->

    <!-- action  -->
    <div :class="`${prefixCls}-action`">
      <AppSearch v-if="getShowSearch" :class="`${prefixCls}-action__item `" />

      <ErrorAction v-if="getUseErrorHandle" :class="`${prefixCls}-action__item error-action`" />

      <Notify v-if="getShowNotice" :class="`${prefixCls}-action__item notify-item`" />

      <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-action__item fullscreen-item`" />

      <EntAppLocalePicker
        v-if="getShowLocalePicker"
        :reload="true"
        :show-text="false"
        :class="`${prefixCls}-action__item`"
      />

      <UserDropDown v-if="isLogined" :theme="getHeaderTheme" />

      <SettingDrawer v-if="getShowSetting" :class="`${prefixCls}-action__item`" />
    </div>
  </Header>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { propTypes } from 'fe-ent-core';
  import { Layout } from 'ant-design-vue';

  import {
    useAppInject,
    useDesign,
    useHeaderSetting,
    useMenuSetting,
    useRootSetting,
  } from 'fe-ent-core';

  import {
    MenuModeEnum,
    MenuSplitTyeEnum,
    SettingButtonPositionEnum,
  } from 'fe-ent-core';
  import { EntAppLocalePicker, EntAppLogo } from 'fe-ent-core';

  import { useLocale } from 'fe-ent-core';
  import { useUserStoreWithOut } from 'fe-ent-core';
  import AppSearch from '../components/app-search.vue';
  import LayoutTrigger from '../trigger/index.vue';
  import LayoutMenu from '../menu/index.vue';
  import SettingDrawer from '../setting/index.vue';
  import { ErrorAction, FullScreen, LayoutBreadcrumb, Notify, UserDropDown } from './components';

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      Header: Layout.Header,
      EntAppLogo,
      LayoutTrigger,
      LayoutBreadcrumb,
      LayoutMenu,
      UserDropDown,
      EntAppLocalePicker,
      FullScreen,
      Notify,
      AppSearch,
      ErrorAction,
      SettingDrawer,
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
      const { getUseErrorHandle, getShowSettingButton, getSettingButtonPosition } =
        useRootSetting();

      const {
        getHeaderTheme,
        getShowFullScreen,
        getShowNotice,
        getShowContent,
        getShowBread,
        getShowHeaderLogo,
        getShowHeader,
        getShowSearch,
      } = useHeaderSetting();

      const { getShowLocalePicker } = useLocale();
      const userStore = useUserStoreWithOut();
      const { getIsMobile } = useAppInject();

      const getHeaderClass = computed(() => {
        const theme = unref(getHeaderTheme);
        return [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: props.fixed,
            [`${prefixCls}--mobile`]: unref(getIsMobile),
            [`${prefixCls}--${theme}`]: theme,
          },
        ];
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
        getHeaderTheme,
        getShowHeaderTrigger,
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
        isLogined,
      };
    },
  });
</script>
<style lang="less">
  @header-trigger-prefix-cls: ~'@{vben-prefix}-layout-header-trigger';
  @header-prefix-cls: ~'@{vben-prefix}-layout-header';
  @breadcrumb-prefix-cls: ~'@{vben-prefix}-layout-breadcrumb';
  @header-logo-prefix-cls: ~'@{vben-prefix}-app-logo';

  .@{header-prefix-cls} {
    display: flex;
    height: @header-height;
    padding: 0;
    margin-left: -1px;
    line-height: @header-height;
    color: @white;
    background-color: @white;
    align-items: center;
    justify-content: space-between;

    &--mobile {
      .@{breadcrumb-prefix-cls},
      .error-action,
      .notify-item,
      .fullscreen-item {
        display: none;
      }

      .@{header-logo-prefix-cls} {
        min-width: unset;
        padding-right: 0;

        &__title {
          display: none;
        }
      }
      .@{header-trigger-prefix-cls} {
        padding: 0 4px 0 8px !important;
      }
      .@{header-prefix-cls}-action {
        padding-right: 4px;
      }
    }

    &--fixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: @layout-header-fixed-z-index;
      width: 100%;
    }

    &-logo {
      height: @header-height;
      min-width: 192px;
      padding: 0 10px;
      font-size: 14px;

      img {
        width: @logo-width;
        height: @logo-width;
        margin-right: 2px;
      }
    }

    &-left {
      display: flex;
      height: 100%;
      align-items: center;

      .@{header-trigger-prefix-cls} {
        display: flex;
        height: 100%;
        padding: 1px 10px 0;
        cursor: pointer;
        align-items: center;

        .anticon {
          font-size: 16px;
        }

        &.light {
          &:hover {
            background-color: @header-light-bg-hover-color;
          }

          svg {
            fill: #000;
          }
        }

        &.dark {
          &:hover {
            background-color: @header-dark-bg-hover-color;
          }
        }
      }
    }

    &-menu {
      height: 100%;
      min-width: 0;
      flex: 1;
      align-items: center;
    }

    &-action {
      display: flex;
      min-width: 180px;
      // padding-right: 12px;
      align-items: center;

      &__item {
        display: flex !important;
        height: @header-height;
        padding: 0 2px;
        font-size: 1.2em;
        cursor: pointer;
        align-items: center;

        .ant-badge {
          height: @header-height;
          line-height: @header-height;
        }

        .ant-badge-dot {
          top: 18px;
          right: 2px;
        }
      }

      span[role='img'] {
        padding: 0 8px;
      }
    }

    &--light {
      background-color: @white !important;
      border-bottom: 1px solid @header-light-bottom-border-color;
      border-left: 1px solid @header-light-bottom-border-color;

      .@{header-prefix-cls}-logo {
        color: @text-color-base;

        &:hover {
          background-color: @header-light-bg-hover-color;
        }
      }

      .@{header-prefix-cls}-action {
        &__item {
          color: @text-color-base;

          .app-iconify {
            padding: 0 10px;
            font-size: 16px !important;
          }

          &:hover {
            background-color: @header-light-bg-hover-color;
          }
        }

        &-icon,
        span[role='img'] {
          color: @text-color-base;
        }
      }
    }

    &--dark {
      background-color: @header-dark-bg-color !important;
      // border-bottom: 1px solid @border-color-base;
      border-left: 1px solid @border-color-base;
      .@{header-prefix-cls}-logo {
        &:hover {
          background-color: @header-dark-bg-hover-color;
        }
      }

      .@{header-prefix-cls}-action {
        &__item {
          .app-iconify {
            padding: 0 10px;
            font-size: 16px !important;
          }

          .ant-badge {
            span {
              color: @white;
            }
          }

          &:hover {
            background-color: @header-dark-bg-hover-color;
          }
        }
      }
    }
  }
</style>
