<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <div class="enter-x min-w-64 min-h-64">
      <NQrCode
        :value="qrCodeUrl"
        class="enter-x flex justify-center xl:justify-start"
        :width="280"
      />
      <NDivider class="enter-x">{{ t('sys.login.scanSign') }}</NDivider>
      <NButton size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </NButton>
    </div>
  </template>
</template>
<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { NButton, NDivider, NQrCode } from 'naive-ui';
  import { useI18n } from 'fe-ent-core/es/hooks';
  import LoginFormTitle from './login-form-title.vue';
  import { LoginStateEnum, useLoginState } from './use-login';

  const qrCodeUrl = 'https://vvbin.cn/next/login';

  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE);
</script>
