<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    v-show="getShow"
    ref="formRef"
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        v-model:value="formData.account"
        size="large"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        v-model:value="formData.password"
        size="large"
        visibility-toggle
        :placeholder="t('sys.login.password')"
      />
    </FormItem>
    <FormItem v-if="captcha !== 'none'" name="captcha" class="enter-x">
      <InputGroup compact>
        <Input
          v-model:value="formData.captcha"
          class="fix-auto-fill"
          size="large"
          :placeholder="t('sys.login.captcha')"
          style="width: calc(100% - 200px)"
        />
        <img id="canvas" style="width: 120px" :src="captchaUrl" @click="onCaptchaClick" />
      </InputGroup>
    </FormItem>
    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block :loading="loading" @click="handleLogin">
        {{ t('sys.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>
    <ARow class="enter-x">
      <ACol v-if="mobileLoginEnable" :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mr-2">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol v-if="qrLoginEnable" :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mr-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol v-if="registerEnable" :md="7" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </ACol>
    </ARow>

    <Divider v-if="false" class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

    <div
      v-if="false"
      class="flex justify-evenly enter-x hidden"
      :class="`${prefixCls}-sign-in-way`"
    >
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </Form>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref, unref, watchEffect } from 'vue';

  import { Button, Checkbox, Col, Divider, Form, Input, Row } from 'ant-design-vue';
  import {
    AlipayCircleFilled,
    GithubFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
    WechatFilled,
  } from '@ant-design/icons-vue';

  import { useDesign, useGlobSetting, useI18n, useMessage } from 'fe-ent-core/es/hooks';
  import { useSessionStore, useUserStore } from 'fe-ent-core/es/store';
  import { useRouter } from 'vue-router';
  import { defHttp } from 'fe-ent-core/es/utils';
  import { LoginStateEnum, useFormRules, useFormValid, useLoginState } from './use-login';
  import LoginFormTitle from './login-form-title.vue';

  defineProps({
    mobileLoginEnable: {
      type: Boolean,
      default: true,
    },
    qrLoginEnable: {
      type: Boolean,
      default: true,
    },
    registerEnable: {
      type: Boolean,
      default: true,
    },
  });
  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const InputGroup = Input.Group;
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
    account: string;
    password: string;
    captcha?: string;
  };
  const formData = reactive<formDataType>({
    account: '',
    password: '',
    captcha: '',
  });

  const { validForm } = useFormValid<formDataType>(formRef);
  const captcha = computed(() => sessionStore.getSession.captcha);
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);
  const captchaUrl = ref();
  const getCaptcha = async () => {
    defHttp
      .get<string>({
        url: `${globSetting.userApiPrefix}/captcha`,
        params: {
          state: sessionStore.getSession.state,
          captcha: 'text',
        },
      })
      .then((data) => {
        captchaUrl.value = data;
      });
  };

  watchEffect(() => {
    if (captcha.value !== 'none') {
      getCaptcha();
    }
  });

  const onCaptchaClick = () => {
    getCaptcha();
  };
  async function handleLogin() {
    const data = await validForm();

    const redirect = decodeURIComponent(router.currentRoute.value.query.redirect as string);

    if (!data) return;
    try {
      loading.value = true;
      await userStore.login({
        authType: 'normal',
        password: data.password,
        username: data.account,
        captcha: data.captcha,
        rememberMe: rememberMe.value,
        mode: 'none', //不要默认的错误提示
      });
      const userInfo = await userStore.getUserInfoAction();
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.displayName}`,
          duration: 3,
        });
      }
      await userStore.afterLoginAction(true, redirect);
    } catch (error) {
      await getCaptcha();
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }
</script>
