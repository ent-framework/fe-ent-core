import { useAppStoreWithOut } from '@ent-core/store';
import { MenuModeEnum, MenuTypeEnum } from '@ent-core/logics';

export async function initApplication() {
  // const { changePermissionMode } = usePermission();
  // await changePermissionMode('BACK');
  // 关闭multi-tab 和 keep-alive
  const appStore = useAppStoreWithOut();
  appStore.setProjectConfig({
    multiTabsSetting: {
      show: false,
    },
    menuSetting: {
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
