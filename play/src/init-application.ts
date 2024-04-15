import { usePermission } from 'fe-ent-core/es/hooks/web/use-permission';
import { useLocale } from 'fe-ent-core/es/locales';
import localeEn from '/@/locale/en';
import localeZh from '/@/locale/zh-CN';
import { PermissionModeEnum } from 'fe-ent-core/es/logics';

export async function initApplication() {
  // ! Need to pay attention to the timing of execution
  // ! 需要注意调用时机
  const { changePermissionMode } = usePermission();
  //await changePermissionMode('BACK');
  await changePermissionMode(PermissionModeEnum.ROUTE_MAPPING);
  const { addMessages } = useLocale();
  // 添加翻译
  addMessages('en', localeEn);
  addMessages('zh_CN', localeZh);
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
