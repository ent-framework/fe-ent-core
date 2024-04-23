<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <NForm ref="formRef" class="p-4 enter-x" :model="formData" :rules="getFormRules">
      <NFormItem path="mobile" class="enter-x">
        <NInput
          v-model:value="formData.mobile"
          size="large"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </NFormItem>
      <NFormItem path="sms" class="enter-x">
        <EntCountDownInput
          v-model:value="formData.sms"
          size="large"
          class="fix-auto-fill"
          :placeholder="t('sys.login.smsCode')"
        />
      </NFormItem>

      <NFormItem class="enter-x">
        <NButton type="primary" size="large" block :loading="loading" @click="handleLogin">
          {{ t('sys.login.loginButton') }}
        </NButton>
        <NButton size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </NButton>
      </NFormItem>
    </NForm>
  </template>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref, unref } from 'vue';
  import { NButton, NForm, NFormItem, NInput } from 'naive-ui';
  import { EntCountDownInput } from 'fe-ent-core';
  import { useI18n } from 'fe-ent-core/es/hooks';
  import LoginFormTitle from './login-form-title.vue';
  import { LoginStateEnum, useFormRules, useFormValid, useLoginState } from './use-login';

  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    mobile: '',
    sms: ''
  });

  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE);

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
  }
</script>
