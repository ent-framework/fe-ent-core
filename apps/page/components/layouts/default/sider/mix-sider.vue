<template>
  <div :class="`${prefixCls}-dom`" :style="getDomStyle" />
  <div
    v-click-outside="handleClickOutside"
    :style="getWrapStyle"
    :class="[
      prefixCls,
      getMenuTheme,
      {
        open: openMenu,
        mini: getCollapsed,
      },
    ]"
    v-bind="getMenuEvents"
  >
    <EntAppLogo :show-title="false" :class="`${prefixCls}-logo`" />

    <LayoutTrigger :class="`${prefixCls}-trigger`" />

    <EntScrollContainer>
      <ul :class="`${prefixCls}-module`">
        <li
          v-for="item in menuModules"
          v-bind="getItemEvents(item)"
          :key="item.path"
          :class="[
            `${prefixCls}-module__item `,
            {
              [`${prefixCls}-module__item--active`]: item.path === activePath,
            },
          ]"
        >
          <SimpleMenuTag :item="item" collapse-parent dot />
          <EntIcon
            :class="`${prefixCls}-module__icon`"
            :size="getCollapsed ? 16 : 20"
            :icon="item.icon || (item.meta && item.meta.icon)"
          />
          <p :class="`${prefixCls}-module__name`">
            {{ t(item.name) }}
          </p>
        </li>
      </ul>
    </EntScrollContainer>

    <div ref="sideRef" :class="`${prefixCls}-menu-list`" :style="getMenuStyle">
      <div
        v-show="openMenu"
        :class="[
          `${prefixCls}-menu-list__title`,
          {
            show: openMenu,
          },
        ]"
      >
        <span class="text"> {{ title }}</span>
        <EntIcon
          :size="16"
          :icon="getMixSideFixed ? 'ri:pushpin-2-fill' : 'ri:pushpin-2-line'"
          class="pushpin"
          @click="handleFixedMenu"
        />
      </div>
      <EntScrollContainer :class="`${prefixCls}-menu-list__content`">
        <SimpleMenu
          :items="childrenMenus"
          :theme="getMenuTheme"
          mix-sider
          @menu-click="handleMenuClick"
        />
      </EntScrollContainer>
      <div v-show="getShowDragBar && openMenu" ref="dragBarRef" :class="`${prefixCls}-drag-bar`" />
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, onMounted, ref, unref, watch } from 'vue';
  import {
    ClickOutside,
    EntAppLogo,
    EntIcon,
    EntScrollContainer,
    SIDE_BAR_MINI_WIDTH,
    SIDE_BAR_SHOW_TIT_MINI_WIDTH,
    SimpleMenu,
    SimpleMenuTag,
    getChildrenMenus,
    getCurrentParentPath,
    getShallowMenus,
    listenerRouteChange,
    useDesign,
    useGlobSetting,
    useGo,
    useI18n,
    useMenuSetting,
    usePermissionStore,
  } from 'fe-ent-core';
  import AppLogo from '../components/app-logo.vue';
  import LayoutTrigger from '../trigger/index.vue';
  import { useDragLine } from './use-layout-sider';
  import type { RouteLocationNormalized } from 'vue-router';
  import type { CSSProperties } from 'vue';
  import type { ElRef, Menu, Nullable } from 'fe-ent-core';

  export default defineComponent({
    name: 'LayoutMixSider',
    components: {
      EntScrollContainer,
      EntAppLogo,
      SimpleMenu,
      EntIcon,
      LayoutTrigger,
      SimpleMenuTag,
    },
    directives: {
      ClickOutside,
    },
    setup() {
      const menuModules = ref<Menu[]>([]);
      const activePath = ref('');
      const childrenMenus = ref<Menu[]>([]);
      const openMenu = ref(false);
      const dragBarRef = ref<ElRef>(null);
      const sideRef = ref<ElRef>(null);
      const currentRoute = ref<Nullable<RouteLocationNormalized>>(null);

      const { prefixCls } = useDesign('layout-mix-sider');
      const go = useGo();
      const { t } = useI18n();
      const {
        getMenuWidth,
        getCanDrag,
        getCloseMixSidebarOnChange,
        getMenuTheme,
        getMixSideTrigger,
        getRealWidth,
        getMixSideFixed,
        mixSideHasChildren,
        setMenuSetting,
        getIsMixSidebar,
        getCollapsed,
      } = useMenuSetting();

      const { title } = useGlobSetting();
      const permissionStore = usePermissionStore();

      useDragLine(sideRef, dragBarRef, true);

      const getMenuStyle = computed((): CSSProperties => {
        return {
          width: unref(openMenu) ? `${unref(getMenuWidth)}px` : 0,
          left: `${unref(getMixSideWidth)}px`,
        };
      });

      const getIsFixed = computed(() => {
        /* eslint-disable-next-line */
        mixSideHasChildren.value = unref(childrenMenus).length > 0;
        const isFixed = unref(getMixSideFixed) && unref(mixSideHasChildren);
        if (isFixed) {
          /* eslint-disable-next-line */
          openMenu.value = true;
        }
        return isFixed;
      });

      const getMixSideWidth = computed(() => {
        return unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH;
      });

      const getDomStyle = computed((): CSSProperties => {
        const fixedWidth = unref(getIsFixed) ? unref(getRealWidth) : 0;
        const width = `${unref(getMixSideWidth) + fixedWidth}px`;
        return getWrapCommonStyle(width);
      });

      const getWrapStyle = computed((): CSSProperties => {
        const width = `${unref(getMixSideWidth)}px`;
        return getWrapCommonStyle(width);
      });

      const getMenuEvents = computed(() => {
        return !unref(getMixSideFixed)
          ? {
              onMouseleave: () => {
                setActive(true);
                closeMenu();
              },
            }
          : {};
      });

      const getShowDragBar = computed(() => unref(getCanDrag));

      onMounted(async () => {
        menuModules.value = await getShallowMenus();
      });

      // Menu changes
      watch(
        [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
        async () => {
          menuModules.value = await getShallowMenus();
        },
        {
          immediate: true,
        },
      );

      listenerRouteChange((route) => {
        currentRoute.value = route;
        setActive(true);
        if (unref(getCloseMixSidebarOnChange)) {
          closeMenu();
        }
      });

      function getWrapCommonStyle(width: string): CSSProperties {
        return {
          width,
          maxWidth: width,
          minWidth: width,
          flex: `0 0 ${width}`,
        };
      }

      // Process module menu click
      async function handleModuleClick(path: string, hover = false) {
        const children = await getChildrenMenus(path);
        if (unref(activePath) === path) {
          if (!hover) {
            if (!unref(openMenu)) {
              openMenu.value = true;
            } else {
              closeMenu();
            }
          } else {
            if (!unref(openMenu)) {
              openMenu.value = true;
            }
          }
          if (!unref(openMenu)) {
            setActive();
          }
        } else {
          openMenu.value = true;
          activePath.value = path;
        }

        if (!children || children.length === 0) {
          if (!hover) go(path);
          childrenMenus.value = [];
          closeMenu();
          return;
        }
        childrenMenus.value = children;
      }

      // Set the currently active menu and submenu
      async function setActive(setChildren = false) {
        const path = currentRoute.value?.path;
        if (!path) return;
        activePath.value = await getCurrentParentPath(path);
        // hanldeModuleClick(parentPath);
        if (unref(getIsMixSidebar)) {
          const activeMenu = unref(menuModules).find((item) => item.path === unref(activePath));
          const p = activeMenu?.path;
          if (p) {
            const children = await getChildrenMenus(p);
            if (setChildren) {
              childrenMenus.value = children;

              if (unref(getMixSideFixed)) {
                openMenu.value = children.length > 0;
              }
            }
            if (children.length === 0) {
              childrenMenus.value = [];
            }
          }
        }
      }

      function handleMenuClick(path: string) {
        go(path);
      }

      function handleClickOutside() {
        setActive(true);
        closeMenu();
      }

      function getItemEvents(item: Menu) {
        if (unref(getMixSideTrigger) === 'hover') {
          return {
            onMouseenter: () => handleModuleClick(item.path, true),
            onClick: async () => {
              const children = await getChildrenMenus(item.path);
              if (item.path && (!children || children.length === 0)) go(item.path);
            },
          };
        }
        return {
          onClick: () => handleModuleClick(item.path),
        };
      }

      function handleFixedMenu() {
        setMenuSetting({
          mixSideFixed: !unref(getIsFixed),
        });
      }

      // Close menu
      function closeMenu() {
        if (!unref(getIsFixed)) {
          openMenu.value = false;
        }
      }

      return {
        t,
        prefixCls,
        menuModules,
        handleModuleClick,
        activePath,
        childrenMenus,
        getShowDragBar,
        handleMenuClick,
        getMenuStyle,
        handleClickOutside,
        sideRef,
        dragBarRef,
        title,
        openMenu,
        getMenuTheme,
        getItemEvents,
        getMenuEvents,
        getDomStyle,
        handleFixedMenu,
        getMixSideFixed,
        getWrapStyle,
        getCollapsed,
      };
    },
  });
</script>
