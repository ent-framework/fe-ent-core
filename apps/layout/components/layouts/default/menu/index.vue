<script lang="tsx">
  import { computed, defineComponent, onDeactivated, onUnmounted, toRef, unref } from 'vue';
  import { EntAppLogo, EntScrollContainer } from 'fe-ent-core';
  import { MenuModeEnum, MenuSplitTyeEnum } from 'fe-ent-core/es/logics';
  import { isUrl, openWindow, propTypes } from 'fe-ent-core/es/utils';
  import {
    useAppInject,
    useDesign,
    useGo,
    useMenuSetting,
    useRootSetting,
    useThemeSetting,
  } from 'fe-ent-core/es/hooks';
  import EntMenu from './header-menu/index.vue';
  import EntSimpleMenu from './left-menu/index.vue';

  import { useSplitMenu } from './use-layout-menu';
  import type { Nullable } from 'fe-ent-core/es/types';
  import type { CSSProperties, PropType } from 'vue';

  export default defineComponent({
    name: 'LayoutMenu',
    components: { EntAppLogo, EntMenu, EntScrollContainer, EntSimpleMenu },
    props: {
      theme: propTypes.oneOf(['light', 'dark']),

      splitType: {
        type: Number as PropType<MenuSplitTyeEnum>,
        default: MenuSplitTyeEnum.NONE,
      },

      isHorizontal: propTypes.bool,
      // menu Mode
      menuMode: {
        type: [String] as PropType<Nullable<MenuModeEnum>>,
        default: '',
      },
    },
    setup(props) {
      const go = useGo();

      const {
        getMenuMode,
        getMenuType,
        getCollapsed,
        getCollapsedShowTitle,
        getAccordion,
        getIsHorizontal,
        getIsSidebarType,
        getSplit,
      } = useMenuSetting();
      const { getShowLogo } = useRootSetting();

      const { getGlobalTheme } = useThemeSetting();

      const { prefixCls } = useDesign('layout-menu');

      const { menusRef } = useSplitMenu(toRef(props, 'splitType'));

      const { getIsMobile } = useAppInject();

      const getComputedMenuMode = computed(() =>
        unref(getIsMobile) ? MenuModeEnum.INLINE : props.menuMode || unref(getMenuMode),
      );

      const getComputedMenuTheme = computed(() => props.theme || unref(getGlobalTheme));

      const getIsShowLogo = computed(() => unref(getShowLogo) && unref(getIsSidebarType));

      const getUseScroll = computed(() => {
        return (
          !unref(getIsHorizontal) &&
          (unref(getIsSidebarType) ||
            props.splitType === MenuSplitTyeEnum.LEFT ||
            props.splitType === MenuSplitTyeEnum.NONE)
        );
      });

      onUnmounted(() => {
        console.log('onUnmounted');
      });

      onDeactivated(() => {
        console.log('onDeactivated');
      });

      const getWrapperStyle = computed((): CSSProperties => {
        return {
          height: `calc(100% - ${unref(getIsShowLogo) ? '48px' : '0px'})`,
        };
      });

      const getLogoClass = computed(() => {
        return [
          `${prefixCls}-logo`,
          unref(getComputedMenuTheme),
          {
            [`${prefixCls}--mobile`]: unref(getIsMobile),
          },
        ];
      });

      const getCommonProps = computed(() => {
        const menus = unref(menusRef);
        return {
          menus,
          beforeClickFn: beforeMenuClickFn,
          theme: unref(getComputedMenuTheme),
          accordion: unref(getAccordion),
          collapse: unref(getCollapsed),
          collapsedShowTitle: unref(getCollapsedShowTitle),
          onMenuClick: handleMenuClick,
        };
      });
      /**
       * click menu
       * @param path
       */

      function handleMenuClick(path: string) {
        go(path);
      }

      /**
       * before click menu
       * @param path
       */
      async function beforeMenuClickFn(path: string) {
        if (!isUrl(path)) {
          return true;
        }
        openWindow(path);
        return false;
      }

      function renderHeader() {
        if (!unref(getIsShowLogo) && !unref(getIsMobile)) return null;

        return <EntAppLogo showTitle={!unref(getCollapsed)} class={unref(getLogoClass)} />;
      }

      function renderMenu() {
        const { menus, ...menuProps } = unref(getCommonProps);
        if (!menus || !menus.length) return null;
        return !props.isHorizontal ? (
          <EntSimpleMenu {...menuProps} isSplitMenu={unref(getSplit)} items={menus} />
        ) : (
          <EntMenu
            {...(menuProps as any)}
            isHorizontal={props.isHorizontal}
            type={unref(getMenuType)}
            showLogo={unref(getIsShowLogo)}
            mode={unref(getComputedMenuMode as any)}
            items={menus}
          />
        );
      }

      return () => {
        return (
          <>
            {renderHeader()}
            {unref(getUseScroll) ? (
              <EntScrollContainer style={unref(getWrapperStyle)}>
                {() => renderMenu()}
              </EntScrollContainer>
            ) : (
              renderMenu()
            )}
          </>
        );
      };
    },
  });
</script>
