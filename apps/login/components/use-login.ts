import { computed, ref, unref } from 'vue';
import { useI18n } from 'fe-ent-core/es/hooks';
import { useSessionStore } from 'fe-ent-core/es/store';
import type { Ref } from 'vue';
import type { Rule, RuleObject } from 'ant-design-vue/es/form/interface';
import type { Recordable } from 'fe-ent-core/es/types';
import type { FormInstance } from 'ant-design-vue/es/form';
export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

const currentState = ref<LoginStateEnum>(LoginStateEnum.LOGIN);

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  return { setLoginState, getLoginState, handleBackLogin };
}

export function useFormValid<T>(formRef: Ref<FormInstance>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }

  return { validForm };
}

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n();
  const sessionStore = useSessionStore();
  const getAccountFormRule = computed(() => createRule(t('sys.login.accountPlaceholder')));
  const getPasswordFormRule = computed(() => createRule(t('sys.login.passwordPlaceholder')));
  const getSmsFormRule = computed(() => createRule(t('sys.login.smsPlaceholder')));
  const getMobileFormRule = computed(() => createRule(t('sys.login.mobilePlaceholder')));
  const getTenantFormRule = computed(() => createRule(t('sys.login.tenantCodePlaceholder')));
  const getCaptchaFormRule = computed(() => createRule(t('sys.login.captchaPlaceholder')));

  const validatePolicy = async (_: RuleObject, value: boolean) => {
    return !value ? Promise.reject(t('sys.login.policyPlaceholder')) : Promise.resolve();
  };

  const validateConfirmPassword = (password: string) => {
    return async (_: RuleObject, value: string) => {
      if (!value) {
        return Promise.reject(t('sys.login.passwordPlaceholder'));
      }
      if (value !== password) {
        return Promise.reject(t('sys.login.diffPwd'));
      }
      return Promise.resolve();
    };
  };

  const getFormRules = computed((): { [k: string]: Rule | Rule[] } => {
    const accountFormRule = unref(getAccountFormRule);
    const passwordFormRule = unref(getPasswordFormRule);
    const smsFormRule = unref(getSmsFormRule);
    const mobileFormRule = unref(getMobileFormRule);
    const tenantFormRule = unref(getTenantFormRule);
    const captchaFormRule = unref(getCaptchaFormRule);

    const mobileRule = {
      sms: smsFormRule,
      mobile: mobileFormRule,
    };

    const loginStateEnum = unref(currentState);
    if (loginStateEnum === LoginStateEnum.REGISTER) {
      return {
        account: accountFormRule,
        password: passwordFormRule,
        confirmPassword: [
          { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
        ],
        policy: [{ validator: validatePolicy, trigger: 'change' }],
        ...mobileRule,
      };
    } else if (loginStateEnum === LoginStateEnum.RESET_PASSWORD) {
      return {
        account: accountFormRule,
        ...mobileRule,
      };
    } else if (loginStateEnum === LoginStateEnum.MOBILE) {
      return mobileRule;
    } else {
      const rules = {
        account: accountFormRule,
        password: passwordFormRule,
      };
      if (
        sessionStore.getSession.captcha &&
        sessionStore.getSession.captcha.toUpperCase() !== 'NONE'
      ) {
        rules['captcha'] = captchaFormRule;
      }
      if (sessionStore.getSession.inst === undefined) {
        rules['tenantCode'] = tenantFormRule;
      }
      return rules;
    }
  });
  return { getFormRules };
}

function createRule(message: string): RuleObject[] {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ];
}
