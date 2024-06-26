<template>
  <EntModal
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
        <ent-button type="primary" block class="mt-2" @click="handleLock">
          {{ t('layout.header.lockScreenBtn') }}
        </ent-button>
      </div>
    </div>
    <template #action />
  </EntModal>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { EntForm, EntModal } from 'fe-ent-core';
  import { useDesign, useI18n } from 'fe-ent-core/es/hooks';
  import { useForm } from 'fe-ent-core/es/components/form';
  import { useModalInner } from 'fe-ent-core/es/components/modal';
  import { useUserStore } from 'fe-ent-core/es/store';
  import { useLockStore } from '../../../../../../store/lock';

  import headerImg from '../../../../../../assets/header.jpg';
  export default defineComponent({
    name: 'LockModal',
    components: { EntModal, EntForm },

    setup() {
      const { t } = useI18n();
      const { prefixCls } = useDesign('header-lock-modal');
      const userStore = useUserStore();
      const lockStore = useLockStore();

      const getRealName = computed(() => userStore.getUserInfo?.displayName);
      const [register, { closeModal }] = useModalInner();

      const [registerForm, { validate, resetFields }] = useForm({
        showActionButtonGroup: false,
        labelWidth: '30%',
        labelAlign: 'left',
        schemas: [
          {
            field: 'password',
            label: t('layout.header.lockScreenPassword'),
            component: 'InputPassword',
            required: true,
            gridItemProps: {
              span: 24
            }
          }
        ]
      });

      async function handleLock() {
        const values = (await validate()) as any;
        const password: string | undefined = values.password;
        closeModal();

        lockStore.setLockInfo({
          isLock: true,
          pwd: password
        });
        await resetFields();
      }

      const avatar = computed(() => {
        const avatar = userStore.getUserInfo?.avatar;
        return avatar || headerImg;
      });

      return {
        t,
        prefixCls,
        getRealName,
        register,
        registerForm,
        handleLock,
        avatar
      };
    }
  });
</script>
