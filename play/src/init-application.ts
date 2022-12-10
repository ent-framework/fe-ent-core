import { useUserStoreWithout } from 'fe-ent-core/lib/store/user';
import { useI18n } from 'fe-ent-core/lib/locale';
import { initRequest } from 'fe-ent-core/lib/utils/http';
// 为了解耦 `packages/*` 下面各模块，不再相互依赖
// 如果模块相互依赖严重，则需要对外提供解耦方式，由调用方去进行参数传递
// 各个模块需要提供 `bridge` 文件作为解耦方式
async function initPackages() {
  const _initRequest = async () => {
    const apiUrl = '';
    const { t } = useI18n();
    await initRequest(() => {
      return {
        apiUrl,
        getTokenFunction: () => {
          const userStore = useUserStoreWithout();
          return userStore.getAccessToken;
        },
        errorFunction: null,
        noticeFunction: null,
        errorModalFunction: null,
        timeoutFunction: () => {
          const userStore = useUserStoreWithout();
          userStore.setAccessToken(undefined);
          userStore.logout(true);
        },
        unauthorized: (msg?: string) => {
          const userStore = useUserStoreWithout();
          userStore.setAccessToken(undefined);
          userStore.logout(true);
          return msg || t('sys.api.errMsg401');
        },
        handleErrorFunction: (msg, mode) => {},
      };
    });
  };

  await Promise.all([_initRequest()]);
}

export async function initApplication() {
  // ! Need to pay attention to the timing of execution
  // ! 需要注意调用时机
  await initPackages();
  // Initialize internal system configuration
  //initAppConfigStore()
}
