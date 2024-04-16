import { useLayoutStore } from 'fe-ent-layout';
import { useAppStore } from 'fe-ent-core/es/store';
import { MenuModeEnum, MenuTypeEnum, ThemeEnum } from 'fe-ent-core/es/logics';

export async function initApplication() {
  // const { changePermissionMode } = usePermission();
  // await changePermissionMode('BACK');
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
