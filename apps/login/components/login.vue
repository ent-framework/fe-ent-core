<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <div class="flex items-center absolute right-4 top-4">
      <EntLocalePicker
        v-if="!sessionTimeout && showLocale"
        class="text-white enter-x xl:text-gray-600"
        :show-text="false"
      />
    </div>
    <span class="-enter-x xl:hidden">
      <EntAppLogo :always-show-title="true" :no-background="true" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <EntAppLogo class="-enter-x" />
          <div class="my-auto">
            <img :alt="title" :src="loginImg" class="w-1/2 -mt-16 -enter-x" />
            <div class="mt-10 font-medium text-white -enter-x">
              <span class="inline-block mt-4 text-3xl"> {{ t('sys.login.signInTitle') }}</span>
            </div>
            <div class="mt-5 font-normal text-white text-md dark:text-gray-500 -enter-x">
              {{ t('sys.login.signInDesc') }}
            </div>
          </div>
        </div>
        <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
          <div
            :class="`${prefixCls}-form`"
            class="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
          >
            <LoginForm
              :mobile-login-enable="mobileLoginEnable"
              :qr-login-enable="qrLoginEnable"
              :register-enable="registerEnable"
            />
            <ForgetPasswordForm />
            <RegisterForm />
            <MobileForm />
            <QrCodeForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { EntAppLogo, EntDarkModeToggle, EntLocalePicker } from 'fe-ent-core';
  import { useDesign, useGlobSetting, useI18n } from 'fe-ent-core/es/hooks';
  import { useLocaleStore } from 'fe-ent-core/es/store';
  import loginImg from '../assets/login-box-bg.svg';
  import LoginForm from './login-form.vue';
  import ForgetPasswordForm from './forget-password-form.vue';
  import RegisterForm from './register-form.vue';
  import MobileForm from './mobile-form.vue';
  import QrCodeForm from './qr-code-form.vue';

  export default defineComponent({
    components: {
      EntAppLogo,
      EntLocalePicker,
      EntDarkModeToggle,
      LoginForm,
      ForgetPasswordForm,
      RegisterForm,
      MobileForm,
      QrCodeForm,
    },
    props: {
      sessionTimeout: {
        type: Boolean,
      },
      mobileLoginEnable: {
        type: Boolean,
        default: false,
      },
      qrLoginEnable: {
        type: Boolean,
        default: false,
      },
      registerEnable: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const globSetting = useGlobSetting();
      const { prefixCls } = useDesign('login');
      const { t } = useI18n();
      const localeStore = useLocaleStore();
      const showLocale = localeStore.getShowPicker;
      const title = computed(() => globSetting?.title ?? '');

      return {
        prefixCls,
        showLocale,
        title,
        loginImg,
        t,
      };
    },
  });
</script>
