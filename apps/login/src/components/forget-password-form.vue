<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <NForm ref="formRef" class="p-4 enter-x" :model="formData" :rules="getFormRules">
      <NFormItem name="account" class="enter-x">
        <NInput
          v-model:value="formData.account"
          size="large"
          :placeholder="t('sys.login.userName')"
        />
      </NFormItem>

      <NFormItem name="mobile" class="enter-x">
        <NInput v-model:value="formData.mobile" size="large" :placeholder="t('sys.login.mobile')" />
      </NFormItem>
      <NFormItem name="sms" class="enter-x">
        <EntCountDownInput
          v-model:value="formData.sms"
          size="large"
          :placeholder="t('sys.login.smsCode')"
        />
      </NFormItem>

      <NFormItem class="enter-x">
        <NButton type="primary" size="large" block :loading="loading" @click="handleReset">
          {{ t('common.resetText') }}
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
  import { LoginStateEnum, useFormRules, useLoginState } from './use-login';

  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    mobile: '',
    sms: ''
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

  async function handleReset() {
    const form = unref(formRef);
    if (!form) return;
    await form.resetFields();
  }
</script>
