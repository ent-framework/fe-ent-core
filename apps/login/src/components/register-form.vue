<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <NForm ref="formRef" class="p-4 enter-x" :model="formData" :rules="getFormRules">
      <NFormItem path="account" class="enter-x">
        <NInput
          v-model:value="formData.account"
          class="fix-auto-fill"
          size="large"
          :placeholder="t('sys.login.userName')"
        />
      </NFormItem>
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
      <NFormItem path="password" class="enter-x">
        <EntStrengthMeter
          v-model:value="formData.password"
          size="large"
          :placeholder="t('sys.login.password')"
        />
      </NFormItem>
      <NFormItem path="confirmPassword" class="enter-x">
        <NInput
          v-model:value="formData.confirmPassword"
          type="password"
          size="large"
          visibility-toggle
          :placeholder="t('sys.login.confirmPassword')"
        />
      </NFormItem>

      <NFormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <NCheckbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </NCheckbox>
      </NFormItem>

      <NButton
        type="primary"
        class="enter-x"
        size="large"
        block
        :loading="loading"
        @click="handleRegister"
      >
        {{ t('sys.login.registerButton') }}
      </NButton>
      <NButton size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </NButton>
    </NForm>
  </template>
</template>
<script lang="ts" setup>
  import { computed, defineComponent, reactive, ref, unref } from 'vue';
  import { NButton, NCheckbox, NForm, NFormItem, NInput } from 'naive-ui';
  import { EntCountDownInput, EntStrengthMeter } from 'fe-ent-core';
  import { useI18n } from 'fe-ent-core/es/hooks';
  import LoginFormTitle from './login-form-title.vue';
  import { LoginStateEnum, useFormRules, useFormValid, useLoginState } from './use-login';

  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    sms: '',
    policy: false
  });

  defineComponent({
    components: { EntStrengthMeter, EntCountDownInput }
  });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
  }
</script>
