<template>
  <EntModal
    :footer="null"
    :title="t('layout.header.lockScreen')"
    v-bind="$attrs"
    :class="prefixCls"
    @register="register"
  >
    <div :class="`${prefixCls}__entry`">
      <div :class="`${prefixCls}__header`">
        <img :src="avatar" :class="`${prefixCls}__header-img`" />
        <p :class="`${prefixCls}__header-name`">
          {{ getRealName }}
        </p>
      </div>

      <EntForm @register="registerForm" />

      <div :class="`${prefixCls}__footer`">
        <a-button type="primary" block class="mt-2" @click="handleLock">
          {{ t('layout.header.lockScreenBtn') }}
        </a-button>
      </div>
    </div>
  </EntModal>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useI18n } from '@ent-core/hooks/web/use-i18n';
  import { useDesign } from '@ent-core/hooks/web/use-design';
  import { EntModal, useModalInner } from '@ent-core/components/modal';
  import { EntForm, useForm } from '@ent-core/components/form';

  import { useUserStore } from '@ent-core/store/modules/user';
  import { useLockStore } from '@ent-core/store/modules/lock';
  import headerImg from '@ent-core/assets/images/header.jpg';
  export default defineComponent({
    name: 'LockModal',
    components: { EntModal, EntForm },

    setup() {
      const { t } = useI18n();
      const { prefixCls } = useDesign('header-lock-modal');
      const userStore = useUserStore();
      const lockStore = useLockStore();

      const getRealName = computed(() => userStore.getUserInfo?.realName);
      const [register, { closeModal }] = useModalInner();

      const [registerForm, { validateFields, resetFields }] = useForm({
        showActionButtonGroup: false,
        schemas: [
          {
            field: 'password',
            label: t('layout.header.lockScreenPassword'),
            component: 'InputPassword',
            required: true,
          },
        ],
      });

      async function handleLock() {
        const values = (await validateFields()) as any;
        const password: string | undefined = values.password;
        closeModal();

        lockStore.setLockInfo({
          isLock: true,
          pwd: password,
        });
        await resetFields();
      }

      const avatar = computed(() => {
        const { avatar } = userStore.getUserInfo;
        return avatar || headerImg;
      });

      return {
        t,
        prefixCls,
        getRealName,
        register,
        registerForm,
        handleLock,
        avatar,
      };
    },
  });
</script>
