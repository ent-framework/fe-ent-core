<script lang="tsx">
  import { computed, defineComponent, h, toRef, unref } from 'vue';
  import { EntAppLogo, EntScrollContainer } from 'fe-ent-core';
  import { MenuModeEnum, MenuSplitTyeEnum } from 'fe-ent-core/es/logics';
  import { isUrl, openWindow, propTypes } from 'fe-ent-core/es/utils';
  import { useAppInject, useDesign, useGo } from 'fe-ent-core/es/hooks';
  import EntIcon from 'fe-ent-core/es/components/icon';
  import { useI18n } from 'fe-ent-core/es/hooks/web/use-i18n';
  import { useLayoutTheme, useLayoutThemeSetting, useMenuSetting } from '../../../../hooks';
  import EntHeaderMenu from './header-menu/index.vue';
  import EntLeftMenu from './left-menu/index.vue';
  import { useSplitMenu } from './use-layout-menu';
  import type { Nullable } from 'fe-ent-core/es/types';
  import type { CSSProperties, PropType } from 'vue';
  import type { Menu } from 'fe-ent-core/es/router';
  import type { MenuOption } from 'naive-ui/es/menu';

  export default defineComponent({
    name: 'LayoutMenu',
    components: { EntAppLogo, EntHeaderMenu, EntScrollContainer, EntLeftMenu },
    props: {
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
      const { t } = useI18n();
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
      const { getShowLogo } = useLayoutThemeSetting();

      const { getActualHeaderTheme, getActualMenuTheme } = useLayoutTheme();

      const { prefixCls } = useDesign('layout-menu');

      const { menusRef } = useSplitMenu(toRef(props, 'splitType'));

      const { getIsMobile } = useAppInject();

      const getComputedMenuMode = computed(() =>
        unref(getIsMobile) ? MenuModeEnum.INLINE : props.menuMode || unref(getMenuMode),
      );

      const getIsShowLogo = computed(() => unref(getShowLogo) && unref(getIsSidebarType));

      const getUseScroll = computed(() => {
        return (
          !unref(getIsHorizontal) &&
          (unref(getIsSidebarType) ||
            props.splitType === MenuSplitTyeEnum.LEFT ||
            props.splitType === MenuSplitTyeEnum.NONE)
        );
      });
      const getWrapperStyle = computed((): CSSProperties => {
        return {
          height: `calc(100% - ${unref(getIsShowLogo) ? '48px' : '0px'})`,
        };
      });

      const getLogoClass = computed(() => {
        return [
          `${prefixCls}-logo`,
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

        return (
          <EntAppLogo
            showTitle={!unref(getCollapsed)}
            class={unref(getLogoClass)}
            collapsed-show-title={unref(getCollapsedShowTitle)}
          />
        );
      }

      function renderMenuIcon(option: Menu) {
        if (option.meta?.icon) {
          return h(EntIcon, { icon: option.icon });
        }
        return null;
      }

      function convertToItem(menu: Menu): MenuOption {
        const m: MenuOption = {
          label: t(menu.meta?.title as string),
          key: menu.path,
          icon: () => {
            return renderMenuIcon(menu);
          },
          children: menu.children ? menu.children.map((m) => convertToItem(m)) : undefined,
          name: menu.name,
          path: menu.path,
        };

        return m;
      }

      function convertItems(menus: Menu[]) {
        const results: MenuOption[] = menus.map((menu) => {
          return convertToItem(menu);
        });
        return results;
      }

      function renderMenu() {
        const { menus, ...menuProps } = unref(getCommonProps);
        if (!menus || !menus.length) return null;
        const nMenuItems = convertItems(menus);
        return !props.isHorizontal ? (
          <EntLeftMenu
            {...menuProps}
            theme={unref(getActualMenuTheme)}
            isSplitMenu={unref(getSplit)}
            items={nMenuItems}
          />
        ) : (
          <EntHeaderMenu
            {...(menuProps as any)}
            isHorizontal={props.isHorizontal}
            type={unref(getMenuType)}
            showLogo={unref(getIsShowLogo)}
            mode={unref(getComputedMenuMode as any)}
            theme={unref(getActualHeaderTheme)}
            items={nMenuItems}
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
