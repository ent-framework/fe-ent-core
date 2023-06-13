import { useLayoutStoreWithOut } from 'fe-ent-layout';
import { useAppStoreWithOut } from '@ent-core/store';
import { MenuModeEnum, MenuTypeEnum } from '@ent-core/logics';

export async function initApplication() {
  // const { changePermissionMode } = usePermission();
  // await changePermissionMode('BACK');
  // 关闭multi-tab 和 keep-alive
  const appStore = useAppStoreWithOut();
  appStore.setProjectConfig({

  })
  const layoutStore = useLayoutStoreWithOut();
  layoutStore.setLayoutConfig({
    multiTabsSetting: {
      show: false,
    },
    menuSetting: {
      theme: 'light',
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
