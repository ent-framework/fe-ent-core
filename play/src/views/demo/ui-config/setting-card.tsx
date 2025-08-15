import {computed, defineComponent, unref} from 'vue';
import { NCard } from 'naive-ui';
import { MenuTypeEnum, TriggerEnum } from 'fe-ent-core/es/logics';
import { useI18n, useThemeSetting, useTransitionSetting } from 'fe-ent-core/es/hooks';
import { NDivider } from 'naive-ui';
import {
  useHeaderSetting,
  useLayoutThemeSetting,
  useMenuSetting,
  useMultipleTabSetting
} from 'fe-ent-layout/es/hooks';
import { globalHandler } from './global-handler';
import { layoutHandler } from './layout-handler';
import {
  InputNumberItem,
  SelectItem,
  SettingFooter,
  SwitchItem,
  ThemeColorPicker,
  TypePicker
} from './components';

import {
  HandlerEnum,
  contentModeOptions,
  getMenuTriggerOptions,
  getThemeOptions,
  menuTypeList,
  mixSidebarTriggerOptions,
  routerTransitionOptions,
  topMenuAlignOptions
} from './enum';

export default defineComponent({
  name: 'SettingCard',
  setup(_, { attrs }) {
    const {
      getContentMode,
      getShowFooter,
      getShowBreadCrumb,
      getShowBreadCrumbIcon,
      getShowLogo,
      getFullContent,
      getGrayMode,
      getLockTime
    } = useLayoutThemeSetting();

    const { getOpenPageLoading, getBasicTransition, getEnableTransition, getOpenNProgress } =
      useTransitionSetting();

    const {
      getIsHorizontal,
      getShowMenu,
      getMenuType,
      getTrigger,
      getCollapsedShowTitle,
      getMenuFixed,
      getCollapsed,
      getCanDrag,
      getTopMenuAlign,
      getAccordion,
      getMenuWidth,
      getIsTopMenu,
      getSplit,
      getIsMixSidebar,
      getCloseMixSidebarOnChange,
      getMixSideTrigger,
      getMixSideFixed,
      getMenuTheme,
      getInverted
    } = useMenuSetting();

    const {
      getShowHeader,
      getFixed: getHeaderFixed,
      getShowSearch,
      getHeaderTheme
    } = useHeaderSetting();

    const { getThemeName } = useThemeSetting();
    const { t } = useI18n();

    const { getShowMultipleTab, getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting();

    const getShowMenuRef = computed(() => {
      return unref(getShowMenu) && !unref(getIsHorizontal);
    });

    function renderSidebar() {
      const menuTypes = menuTypeList();
      return (
          <TypePicker
            menuTypeList={menuTypes}
            handler={(item: (typeof menuTypes)[0]) => {
              layoutHandler(HandlerEnum.CHANGE_LAYOUT, {
                mode: item.mode,
                type: item.type,
                split: unref(getIsHorizontal) ? false : undefined
              });
            }}
            def={unref(getMenuType)}
          />
      );
    }

    function renderMainTheme() {
      return (
        <ThemeColorPicker
          def={unref(getThemeName)}
          event={HandlerEnum.CHANGE_THEME_TOKEN}
          handler={globalHandler}
        />
      );
    }
    /**
     * @description:
     */
    function renderFeatures() {
      let triggerDef = unref(getTrigger);

      const triggerOptions = getMenuTriggerOptions(unref(getSplit));
      const some = triggerOptions.some((item) => item.value === triggerDef);
      if (!some) {
        triggerDef = TriggerEnum.MENU_SIDE;
      }

      return (
        <div>
          <SwitchItem
            title={t('layout.setting.splitMenu')}
            event={HandlerEnum.MENU_SPLIT}
            def={unref(getSplit)}
            handler={layoutHandler}
            disabled={!unref(getShowMenuRef) || unref(getMenuType) !== MenuTypeEnum.MIX}
          />
          <SwitchItem
            title={t('layout.setting.mixSidebarFixed')}
            event={HandlerEnum.MENU_FIXED_MIX_SIDEBAR}
            def={unref(getMixSideFixed)}
            handler={layoutHandler}
            disabled={!unref(getIsMixSidebar)}
          />

          <SwitchItem
            title={t('layout.setting.closeMixSidebarOnChange')}
            event={HandlerEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE}
            def={unref(getCloseMixSidebarOnChange)}
            handler={layoutHandler}
            disabled={!unref(getIsMixSidebar)}
          />
          <SwitchItem
            title={t('layout.setting.menuCollapse')}
            event={HandlerEnum.MENU_COLLAPSED}
            def={unref(getCollapsed)}
            handler={layoutHandler}
            disabled={!unref(getShowMenuRef)}
          />

          <SwitchItem
            title={t('layout.setting.menuDrag')}
            event={HandlerEnum.MENU_HAS_DRAG}
            def={unref(getCanDrag)}
            handler={layoutHandler}
            disabled={!unref(getShowMenuRef)}
          />
          <SwitchItem
            title={t('layout.setting.menuSearch')}
            event={HandlerEnum.HEADER_SEARCH}
            def={unref(getShowSearch)}
            handler={layoutHandler}
            disabled={!unref(getShowHeader)}
          />
          <SwitchItem
            title={t('layout.setting.menuAccordion')}
            event={HandlerEnum.MENU_ACCORDION}
            def={unref(getAccordion)}
            handler={layoutHandler}
            disabled={!unref(getShowMenuRef)}
          />

          <SwitchItem
            title={t('layout.setting.collapseMenuDisplayName')}
            event={HandlerEnum.MENU_COLLAPSED_SHOW_TITLE}
            def={unref(getCollapsedShowTitle)}
            handler={layoutHandler}
            disabled={!unref(getShowMenuRef) || !unref(getCollapsed) || unref(getIsMixSidebar)}
          />

          <SwitchItem
            title={t('layout.setting.fixedHeader')}
            event={HandlerEnum.HEADER_FIXED}
            def={unref(getHeaderFixed)}
            handler={layoutHandler}
            disabled={!unref(getShowHeader)}
          />
          <SwitchItem
            title={t('layout.setting.fixedSideBar')}
            event={HandlerEnum.MENU_FIXED}
            def={unref(getMenuFixed)}
            handler={layoutHandler}
            disabled={!unref(getShowMenuRef) || unref(getIsMixSidebar)}
          />
          <SelectItem
            title={t('layout.setting.mixSidebarTrigger')}
            event={HandlerEnum.MENU_TRIGGER_MIX_SIDEBAR}
            def={unref(getMixSideTrigger)}
            options={mixSidebarTriggerOptions()}
            handler={layoutHandler}
            disabled={!unref(getIsMixSidebar)}
          />
          <SelectItem
            title={t('layout.setting.topMenuLayout')}
            event={HandlerEnum.MENU_TOP_ALIGN}
            def={unref(getTopMenuAlign)}
            options={topMenuAlignOptions()}
            handler={layoutHandler}
            disabled={
              !unref(getShowHeader) ||
              unref(getSplit) ||
              (!unref(getIsTopMenu) && !unref(getSplit)) ||
              unref(getIsMixSidebar)
            }
          />
          <SelectItem
            title={t('layout.setting.menuCollapseButton')}
            event={HandlerEnum.MENU_TRIGGER}
            def={triggerDef}
            options={triggerOptions}
            handler={layoutHandler}
            disabled={!unref(getShowMenuRef) || unref(getIsMixSidebar)}
          />
          <SelectItem
            title={t('layout.setting.contentMode')}
            event={HandlerEnum.CONTENT_MODE}
            def={unref(getContentMode)}
            options={contentModeOptions()}
          />
          <InputNumberItem
            title={t('layout.setting.autoScreenLock')}
            min={0}
            handler={layoutHandler}
            event={HandlerEnum.LOCK_TIME}
            defaultValue={unref(getLockTime)}
            format={(value: number) => {
              return value === 0
                ? `0(${t('layout.setting.notAutoScreenLock')})`
                : `${value}${t('layout.setting.minute')}`;
            }}
          />
          <InputNumberItem
            title={t('layout.setting.expandedMenuWidth')}
            max={600}
            min={100}
            step={10}
            event={HandlerEnum.MENU_WIDTH}
            disabled={!unref(getShowMenuRef)}
            defaultValue={unref(getMenuWidth)}
            handler={layoutHandler}
            format={(value: number) => `${value}px`}
          />
        </div>
      );
    }

    function renderContent() {
      return (
        <div>
          <SwitchItem
            title={t('layout.setting.breadcrumb')}
            event={HandlerEnum.SHOW_BREADCRUMB}
            def={unref(getShowBreadCrumb)}
            disabled={!unref(getShowHeader)}
            handler={layoutHandler}
          />

          <SwitchItem
            title={t('layout.setting.breadcrumbIcon')}
            event={HandlerEnum.SHOW_BREADCRUMB_ICON}
            def={unref(getShowBreadCrumbIcon)}
            disabled={!unref(getShowHeader)}
            handler={layoutHandler}
          />

          <SwitchItem
            title={t('layout.setting.tabs')}
            event={HandlerEnum.TABS_SHOW}
            def={unref(getShowMultipleTab)}
            handler={layoutHandler}
          />

          <SwitchItem
            title={t('layout.setting.tabsRedoBtn')}
            event={HandlerEnum.TABS_SHOW_REDO}
            def={unref(getShowRedo)}
            disabled={!unref(getShowMultipleTab)}
            handler={layoutHandler}
          />

          <SwitchItem
            title={t('layout.setting.tabsQuickBtn')}
            event={HandlerEnum.TABS_SHOW_QUICK}
            def={unref(getShowQuick)}
            disabled={!unref(getShowMultipleTab)}
            handler={layoutHandler}
          />
          <SwitchItem
            title={t('layout.setting.tabsFoldBtn')}
            event={HandlerEnum.TABS_SHOW_FOLD}
            def={unref(getShowFold)}
            disabled={!unref(getShowMultipleTab)}
            handler={layoutHandler}
          />

          <SwitchItem
            title={t('layout.setting.sidebar')}
            event={HandlerEnum.MENU_SHOW_SIDEBAR}
            def={unref(getShowMenu)}
            disabled={unref(getIsHorizontal)}
            handler={layoutHandler}
          />

          <SelectItem
            title={t('layout.setting.sidebarTheme')}
            event={HandlerEnum.MENU_THEME}
            def={unref(getMenuTheme)}
            options={getThemeOptions()}
            disabled={!unref(getShowMenu)}
            handler={layoutHandler}
          />
          <SwitchItem
            title={t('layout.setting.sidebarInverted')}
            event={HandlerEnum.MENU_INVERTED}
            def={unref(getInverted)}
            handler={layoutHandler}
            disabled={unref(getIsHorizontal)}
          />
          <SwitchItem
            title={t('layout.setting.header')}
            event={HandlerEnum.HEADER_SHOW}
            def={unref(getShowHeader)}
            handler={layoutHandler}
          />

          <SelectItem
            title={t('layout.setting.headerTheme')}
            event={HandlerEnum.HEADER_THEME}
            def={unref(getHeaderTheme)}
            options={getThemeOptions()}
            disabled={!unref(getShowHeader)}
            handler={layoutHandler}
          />

          <SwitchItem
            title="Logo"
            event={HandlerEnum.SHOW_LOGO}
            def={unref(getShowLogo)}
            disabled={unref(getIsMixSidebar)}
            handler={layoutHandler}
          />
          <SwitchItem
            title={t('layout.setting.footer')}
            event={HandlerEnum.SHOW_FOOTER}
            def={unref(getShowFooter)}
            handler={layoutHandler}
          />
          <SwitchItem
            title={t('layout.setting.fullContent')}
            event={HandlerEnum.FULL_CONTENT}
            def={unref(getFullContent)}
            handler={layoutHandler}
          />

          <SwitchItem
            title={t('layout.setting.grayMode')}
            event={HandlerEnum.GRAY_MODE}
            def={unref(getGrayMode)}
            handler={layoutHandler}
          />
        </div>
      );
    }

    function renderTransition() {
      return (
        <div>
          <SwitchItem
            title={t('layout.setting.progress')}
            event={HandlerEnum.OPEN_PROGRESS}
            def={unref(getOpenNProgress)}
            handler={globalHandler}
          />
          <SwitchItem
            title={t('layout.setting.switchLoading')}
            event={HandlerEnum.OPEN_PAGE_LOADING}
            def={unref(getOpenPageLoading)}
            handler={globalHandler}
          />

          <SwitchItem
            title={t('layout.setting.switchAnimation')}
            event={HandlerEnum.OPEN_ROUTE_TRANSITION}
            def={unref(getEnableTransition)}
            handler={globalHandler}
          />

          <SelectItem
            title={t('layout.setting.animationType')}
            event={HandlerEnum.ROUTER_TRANSITION}
            def={unref(getBasicTransition)}
            options={routerTransitionOptions}
            disabled={!unref(getEnableTransition)}
            handler={globalHandler}
          />
        </div>
      );
    }
    return () => (
      <NCard
        {...attrs}
        title={t('layout.setting.drawerTitle')}
        class="setting-drawer"
      >
        <NDivider>{() => t('layout.setting.navMode')}</NDivider>
        {renderSidebar()}
        <NDivider>{() => t('layout.setting.sysTheme')}</NDivider>
        {renderMainTheme()}
        <NDivider>{() => t('layout.setting.interfaceFunction')}</NDivider>
        {renderFeatures()}
        <NDivider>{() => t('layout.setting.interfaceDisplay')}</NDivider>
        {renderContent()}
        <NDivider>{() => t('layout.setting.animation')}</NDivider>
        {renderTransition()}
        <NDivider />
        <SettingFooter />
      </NCard>
    );
  }
});
