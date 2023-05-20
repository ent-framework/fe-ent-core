import { useUserStoreWithOut } from '@ent-core/store/modules/user';
import { useI18n } from '@ent-core/hooks/web';
import { initHttpBridge, initUserBridge } from '@ent-core/logics/bridge';
import { doLogout, getPermCode, getUserInfo, loginApi } from '@ent-core/logics/api/user';
import { getMenuList } from '@ent-core/logics/api/menu';
import { useAppStoreWithOut } from '@ent-core/store';
import { MenuModeEnum, MenuTypeEnum } from '@ent-core/logics';

// 为了解耦 `packages/*` 下面各模块，不再相互依赖
// 如果模块相互依赖严重，则需要对外提供解耦方式，由调用方去进行参数传递
// 各个模块需要提供 `bridge` 文件作为解耦方式
export async function initPackages() {
  const _initRequest = async () => {
    const apiUrl = '';
    const { t } = useI18n();
    await initHttpBridge(() => {
      return {
        apiUrl,
        getToken: () => {
          const userStore = useUserStoreWithOut();
          return userStore.getToken;
        },
        error: () => {},
        notice: () => {},
        errorModal: () => {},
        timeout: () => {
          const userStore = useUserStoreWithOut();
          userStore.setToken(undefined);
          userStore.logout(true);
        },
        unauthorized: (msg?: string) => {
          const userStore = useUserStoreWithOut();
          userStore.setToken(undefined);
          userStore.logout(true);
          return msg || t('sys.api.errMsg401');
        },
        handleError: (msg, mode) => {},
      };
    });
  };

  const _initUser = async () => {
    await initUserBridge(() => {
      return {
        loginApi,
        getUserInfo,
        getPermCode,
        doLogout,
        getMenuList,
      };
    });
  };

  await Promise.all([_initRequest(), _initUser()]);
}

export async function initApplication() {
  // ! Need to pay attention to the timing of execution
  // ! 需要注意调用时机
  await initPackages();

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
