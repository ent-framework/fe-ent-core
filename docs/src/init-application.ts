import { useLayoutStore } from 'fe-ent-layout';
import { useAppStore } from 'fe-ent-core/es/store';
import { MenuModeEnum, MenuTypeEnum, PermissionModeEnum, ThemeEnum } from 'fe-ent-core/es/logics';
import { usePermission } from 'fe-ent-core/es/hooks';

export async function initApplication() {
  const { changePermissionMode } = usePermission();
  await changePermissionMode(PermissionModeEnum.ROUTE_MAPPING);
  // 关闭multi-tab 和 keep-alive
  const appStore = useAppStore();
  appStore.setProjectConfig({});
  const layoutStore = useLayoutStore();
  layoutStore.setLayoutConfig({
    multiTabsSetting: {
      show: false,
    },
    menuSetting: {
      theme: ThemeEnum.LIGHT,
      split: true,
      mode: MenuModeEnum.INLINE,
      type: MenuTypeEnum.MIX,
    },
    openKeepAlive: false,
    headerSetting: {
      showNotice: false,
    },
  });
}
