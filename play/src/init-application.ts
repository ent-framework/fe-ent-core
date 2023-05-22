import { useGlobalStoreWithOut } from 'fe-ent-core';

export async function initApplication() {
  // ! Need to pay attention to the timing of execution
  // ! 需要注意调用时机

  const globalStore = useGlobalStoreWithOut();
  globalStore.setBaseHomePath('/dashboard/workbench');
  // const { changePermissionMode } = usePermission();
  // await changePermissionMode('BACK');
  // 关闭multi-tab 和 keep-alive
  // const appStore = useAppStoreWithOut();
  // appStore.setProjectConfig({
  //   multiTabsSetting: {
  //     show: false,
  //   },
  //   openKeepAlive: false,
  // });
  // 内存回收
  // window.addEventListener('beforeunload', function () {
  //   // @ts-ignore
  //   if (window['IconifyProviders']) {
  //     window['IconifyProviders'] = null;
  //   }
  // });
}
