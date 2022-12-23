<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <EntAppLocalePicker
      class="absolute text-white top-4 right-4 enter-x xl:text-gray-600"
      :showText="false"
      v-if="!sessionTimeout && showLocale"
    />
    <EntAppDarkModeToggle class="absolute top-3 right-7 enter-x" v-if="!sessionTimeout" />

    <span class="-enter-x xl:hidden">
      <AppLogo :alwaysShowTitle="true" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <AppLogo class="-enter-x" />
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
            <LoginForm />
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
  import AppLogo from '@ent-core/layouts/default/components/app-logo.vue';
  import { EntAppLocalePicker, EntAppDarkModeToggle } from '@ent-core/components/application';
  import LoginForm from './login-form.vue';
  import ForgetPasswordForm from './forget-password-form.vue';
  import RegisterForm from './register-form.vue';
  import MobileForm from './mobile-form.vue';
  import QrCodeForm from './qr-code-form.vue';
  import { useGlobSetting } from '@ent-core/hooks/setting/use-glob-setting';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { useLocaleStore } from '@ent-core/store/modules/locale';
  import loginImg from '@ent-core/assets/svg/login-box-bg.svg';

  export default defineComponent({
    components: {
      AppLogo,
      EntAppLocalePicker,
      EntAppDarkModeToggle,
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
