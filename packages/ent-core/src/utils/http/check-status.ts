import { useMessage } from '../../hooks/web/use-message';
import { useI18n } from '../../hooks/web/use-i18n';
import { Factory } from '../../logics/factory';
import type { ErrorMessageMode } from '../../logics/types/axios';
// import router from '../../router';
// import { PageEnum } from '../../logics/enums/page-enum';

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message'
): void {
  const { t } = useI18n();
  const { createMessage, createErrorModal } = useMessage();
  const error = createMessage.error!;

  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      // userStore.setToken(undefined);
      // errMessage = msg || t('sys.api.errMsg401');
      // if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
      //   userStore.setSessionTimeout(true);
      // } else {
      //   userStore.logout(true);
      // }
      Factory.getHttpFactory().unauthorized();
      break;
    case 403:
      errMessage = msg || t('sys.api.errMsg403');
      break;
    // 404请求不存在
    case 404:
      errMessage = msg || t('sys.api.errMsg404');
      break;
    case 405:
      errMessage = msg || t('sys.api.errMsg405');
      break;
    case 408:
      errMessage = msg || t('sys.api.errMsg408');
      break;
    case 500:
      errMessage = msg || t('sys.api.errMsg500');
      break;
    case 501:
      errMessage = msg || t('sys.api.errMsg501');
      break;
    case 502:
      errMessage = msg || t('sys.api.errMsg502');
      break;
    case 503:
      errMessage = msg || t('sys.api.errMsg503');
      break;
    case 504:
      errMessage = msg || t('sys.api.errMsg504');
      break;
    case 505:
      errMessage = msg || t('sys.api.errMsg505');
      break;
    default:
  }
  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: t('sys.api.errorTip'), content: errMessage });
    } else if (errorMessageMode === 'message') {
      error(errMessage, { type: 'error' });
    }
  }
}
