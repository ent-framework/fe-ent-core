<template>
  <div
    :class="prefixCls"
    class="fixed inset-0 flex h-screen w-screen bg-black items-center justify-center"
  >
    <div
      v-show="showDate"
      :class="`${prefixCls}__unlock`"
      class="absolute top-0 left-1/2 flex pt-5 h-16 items-center justify-center sm:text-md xl:text-xl text-white flex-col cursor-pointer transform translate-x-1/2"
      @click="handleShowForm(false)"
    >
      <LockOutlined />
      <span>{{ t('sys.lock.unlock') }}</span>
    </div>

    <div class="flex w-screen h-screen justify-center items-center">
      <div :class="`${prefixCls}__hour`" class="relative mr-5 md:mr-20 w-2/5 h-2/5 md:h-4/5">
        <span>{{ hour }}</span>
        <span v-show="showDate" class="meridiem absolute left-5 top-5 text-md xl:text-xl">
          {{ meridiem }}
        </span>
      </div>
      <div :class="`${prefixCls}__minute w-2/5 h-2/5 md:h-4/5 `">
        <span> {{ minute }}</span>
      </div>
    </div>
    <transition name="fade-slide">
      <div v-show="!showDate" :class="`${prefixCls}-entry`">
        <div :class="`${prefixCls}-entry-content`">
          <div :class="`${prefixCls}-entry__header enter-x`">
            <img :src="userinfo.avatar || headerImg" :class="`${prefixCls}-entry__header-img`" />
            <p :class="`${prefixCls}-entry__header-name`">
              {{ userinfo.realName }}
            </p>
          </div>
          <div style="width: 100%">
            <InputPassword
              v-model:value="password"
              :placeholder="t('sys.lock.placeholder')"
              class="enter-x"
            />
          </div>
          <span v-if="errMsg" :class="`${prefixCls}-entry__err-msg enter-x`">
            {{ t('sys.lock.alert') }}
          </span>
          <div :class="`${prefixCls}-entry__footer enter-x`">
            <ent-button
              type="link"
              size="small"
              class="mt-2 mr-2 enter-x"
              :disabled="loading"
              @click="handleShowForm(true)"
            >
              {{ t('common.back') }}
            </ent-button>
            <ent-button
              type="link"
              size="small"
              class="mt-2 mr-2 enter-x"
              :disabled="loading"
              @click="goLogin"
            >
              {{ t('sys.lock.backToLogin') }}
            </ent-button>
            <ent-button class="mt-2" type="link" size="small" :loading="loading" @click="unLock()">
              {{ t('sys.lock.entry') }}
            </ent-button>
          </div>
        </div>
      </div>
    </transition>

    <div class="absolute bottom-5 w-full text-gray-300 xl:text-xl 2xl:text-3xl text-center enter-y">
      <div v-show="!showDate" class="text-5xl mb-4 enter-x">
        {{ hour }}:{{ minute }} <span class="text-3xl">{{ meridiem }}</span>
      </div>
      <div class="text-2xl">{{ year }}/{{ month }}/{{ day }} {{ week }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Input } from 'ant-design-vue';
  import { useLockStore, useUserStore } from 'fe-ent-core/lib/store';
  import { useDesign, useI18n } from 'fe-ent-core/lib/hooks';
  import { LockOutlined } from '@ant-design/icons-vue';
  import headerImg from '../../assets/header.jpg';
  import { useNow } from './use-now';
  import type { UserInfo } from 'fe-ent-core/lib/logics';

  const InputPassword = Input.Password;

  const password = ref('');
  const loading = ref(false);
  const errMsg = ref(false);
  const showDate = ref(true);

  const { prefixCls } = useDesign('lock-page');
  const lockStore = useLockStore();
  const userStore = useUserStore();

  const { hour, month, minute, meridiem, year, day, week } = useNow(true);

  const { t } = useI18n();

  const userinfo = computed((): UserInfo => {
    return userStore.getUserInfo || {};
  });
  /**
   * @description: unLock
   */
  async function unLock() {
    if (!password.value) {
      return;
    }
    const pwd = password.value;
    try {
      loading.value = true;
      const res = await lockStore.unLock(pwd);
      errMsg.value = !res;
    } finally {
      loading.value = false;
    }
  }

  function goLogin() {
    userStore.logout(true);
    lockStore.resetLockInfo();
  }

  function handleShowForm(show = false) {
    showDate.value = show;
  }
</script>
