<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <NForm
    v-show="getShow"
    ref="formRef"
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    @keypress.enter="handleLogin"
  >
    <NFormItem v-if="getShowTenantCode" path="tenantCode" class="enter-x">
      <NInputGroup>
        <NInputGroupLabel size="large" class="login-input-label">{{
          t('sys.login.tenantCode')
        }}</NInputGroupLabel>
        <NInput
          v-model:value="formData.tenantCode"
          :placeholder="t('sys.login.tenantCodePlaceholder')"
          size="large"
          class="fix-auto-fill"
        />
      </NInputGroup>
    </NFormItem>
    <NFormItem path="account" class="enter-x">
      <NInputGroup>
        <NInputGroupLabel size="large" class="login-input-label">{{
          t('sys.login.userName')
        }}</NInputGroupLabel>
        <NInput
          v-model:value="formData.account"
          :placeholder="t('sys.login.accountPlaceholder')"
          size="large"
          class="fix-auto-fill"
        />
      </NInputGroup>
    </NFormItem>
    <NFormItem path="password" class="enter-x">
      <NInputGroup>
        <NInputGroupLabel size="large" class="login-input-label">{{
          t('sys.login.password')
        }}</NInputGroupLabel>
        <NInput
          v-model:value="formData.password"
          type="password"
          size="large"
          visibility-toggle
          class="fix-auto-fill"
          :placeholder="t('sys.login.passwordPlaceholder')"
        />
      </NInputGroup>
    </NFormItem>
    <NFormItem v-if="getShowCaptcha" path="captcha" class="enter-x">
      <NInputGroup>
        <NInputGroupLabel size="large" class="login-input-label">{{
          t('sys.login.captcha')
        }}</NInputGroupLabel>
        <NInput
          v-model:value="formData.captcha"
          class="fix-auto-fill captcha"
          size="large"
          style="width: calc(100% - 120px)"
          :placeholder="t('sys.login.captchaPlaceholder')"
        />
        <img
          id="canvas"
          alt="captcha"
          style="width: 120px"
          :src="captchaUrl"
          @click="onCaptchaClick"
        />
      </NInputGroup>
    </NFormItem>
    <NGrid class="enter-x">
      <NGridItem :span="12">
        <NFormItem>
          <!-- No logic, you need to deal with it yourself -->
          <NCheckbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </NCheckbox>
        </NFormItem>
      </NGridItem>
      <NGridItem :span="12">
        <NFormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <NButton type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </NButton>
        </NFormItem>
      </NGridItem>
    </NGrid>

    <NFormItem class="enter-x">
      <NButton type="primary" size="large" block :loading="loading" @click="handleLogin">
        {{ t('sys.login.loginButton') }}
      </NButton>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </NFormItem>
    <NGrid class="enter-x">
      <NGridItem v-if="mobileLoginEnable" :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mr-2">
        <NButton block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </NButton>
      </NGridItem>
      <NGridItem v-if="qrLoginEnable" :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mr-2">
        <NButton block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </NButton>
      </NGridItem>
      <NGridItem v-if="registerEnable" :md="7" :xs="24">
        <NButton block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </NButton>
      </NGridItem>
    </NGrid>

    <NDivider v-if="false" class="enter-x">{{ t('sys.login.otherSignIn') }}</NDivider>

    <div
      v-if="false"
      class="flex justify-evenly enter-x hidden"
      :class="`${prefixCls}-sign-in-way`"
    >
<!--      <GithubFilled />-->
<!--      <WechatFilled />-->
<!--      <AlipayCircleFilled />-->
<!--      <GoogleCircleFilled />-->
<!--      <TwitterCircleFilled />-->
    </div>
  </NForm>
</template>
<script lang="ts" setup>
  import { computed, ref, unref, watchEffect } from 'vue';

  import {
    NButton,
    NCheckbox,
    NDivider,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NInput,
    NInputGroup,
    NInputGroupLabel
  } from 'naive-ui';
  // import {
  //   AlipayCircleFilled,
  //   GithubFilled,
  //   GoogleCircleFilled,
  //   TwitterCircleFilled,
  //   WechatFilled
  // } from '@ant-design/icons-vue';

  import { useDesign, useGlobSetting, useI18n, useMessage } from 'fe-ent-core/es/hooks';
  import { useSessionStore, useUserStore } from 'fe-ent-core/es/store';
  import { useRouter } from 'vue-router';
  import { defHttp } from 'fe-ent-core/es/utils';
  import { LoginStateEnum, useFormRules, useFormValid, useLoginState } from './use-login';
  import LoginFormTitle from './login-form-title.vue';

  defineProps({
    mobileLoginEnable: {
      type: Boolean,
      default: true
    },
    qrLoginEnable: {
      type: Boolean,
      default: true
    },
    registerEnable: {
      type: Boolean,
      default: true
    }
  });
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const sessionStore = useSessionStore();
  const userStore = useUserStore();
  const router = useRouter();
  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();
  const globSetting = useGlobSetting();
  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);

  type formDataType = {
    tenantCode: string;
    account: string;
    password: string;
    captcha?: string;
  };
  const formData = ref<formDataType>({
    tenantCode: '',
    account: '',
    password: '',
    captcha: ''
  });

  const { validForm } = useFormValid(formRef);
  const getShowCaptcha = computed(
    () =>
      sessionStore.getSession.captcha && sessionStore.getSession.captcha.toUpperCase() !== 'NONE'
  );
  const getShowTenantCode = computed(() => {
    return sessionStore.getSession.inst === undefined;
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);
  const captchaUrl = ref();
  const getCaptcha = async () => {
    defHttp
      .get<string>({
        url: `${globSetting.userApiPrefix}/captcha`,
        params: {
          state: sessionStore.getSession.state,
          captcha: 'text'
        }
      })
      .then((data) => {
        captchaUrl.value = data;
      });
  };

  watchEffect(() => {
    if (getShowCaptcha.value) {
      getCaptcha();
    }
  });

  const onCaptchaClick = () => {
    getCaptcha();
  };
  async function handleLogin() {
    const warnings = await validForm();

    const redirect = decodeURIComponent(router.currentRoute.value.query.redirect as string);

    if (warnings && warnings.length) return;
    try {
      loading.value = true;
      await userStore.login({
        authType: 'normal',
        password: formData.value.password,
        username: formData.value.account,
        captcha: formData.value.captcha,
        tenantCode: formData.value.tenantCode,
        rememberMe: rememberMe.value,
        mode: 'none' //不要默认的错误提示
      });
      const userInfo = await userStore.getUserInfoAction();
      if (userInfo) {
        notification.success({
          title: t('sys.login.loginSuccessTitle'),
          content: `${t('sys.login.loginSuccessDesc')}: ${userInfo.displayName}`,
          duration: 3
        });
      }
      await userStore.afterLoginAction(true, redirect);
    } catch (error) {
      if (getShowCaptcha.value) {
        await getCaptcha();
      }
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.apiRequestFailed')
      });
    } finally {
      loading.value = false;
    }
  }
</script>
<style scoped lang="less">
  .login-input-label {
    display: block;
    width: 33%;
    text-align: center;
  }
</style>
