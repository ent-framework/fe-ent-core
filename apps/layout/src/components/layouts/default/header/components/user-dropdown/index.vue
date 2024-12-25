<template>
  <NDropdown
    placement="bottom-start"
    :class="`${prefixCls}-dropdown-overlay`"
    :options="getOptions"
    @select="handleSelect"
  >
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img alt="" :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <NText :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.displayName }}
        </NText>
      </span>
    </span>
  </NDropdown>
  <LockAction @register="register" />
</template>
<script lang="ts">
  // components

  import { computed, defineComponent, h, unref } from 'vue';
  import { EntIcon } from 'fe-ent-core/es/components/icon';
  import { NDropdown, NText } from 'naive-ui';
  import { useDesign, useI18n } from 'fe-ent-core/es/hooks';
  import { useModal } from 'fe-ent-core/es/components/modal';
  import { useUserStore } from 'fe-ent-core/es/store';
  import { useHeaderSetting } from '../../../../../../hooks';
  import headerImg from '../../../../../../assets/header.jpg';
  import LockAction from '../lock/lock-modal.vue';
  import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface';

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      NDropdown,
      LockAction,
      NText
    },
    props: {
      theme: {
        type: String,
        required: true,
        validator: (value: string) => {
          // 定义允许的值
          const validThemes = ['dark', 'light'];
          // 检查传入的值是否有效
          return validThemes.includes(value);
        }
      }
    },
    setup() {
      const { prefixCls } = useDesign('header-user-dropdown');
      const { t } = useI18n();
      const { getUseLockPage } = useHeaderSetting();
      const userStore = useUserStore();

      const getUserInfo = computed(() => {
        const { displayName = '', avatar, desc } = userStore.getUserInfo || {};
        return { displayName, avatar: avatar || headerImg, desc };
      });

      const [register, { openModal }] = useModal();

      function handleLock() {
        openModal(true);
      }

      //  login out
      function handleLoginOut() {
        userStore.confirmLoginOut();
      }

      function handleSelect(key: string) {
        switch (key) {
          case 'logout':
            handleLoginOut();
            break;
          case 'lock':
            handleLock();
            break;
        }
      }

      const getOptions = computed((): DropdownMixedOption[] => {
        const isLockEnable = unref(getUseLockPage);
        const options: DropdownMixedOption[] = [];
        if (isLockEnable) {
          options.push({
            label: () => t('layout.header.tooltipLock'),
            icon: () => h(EntIcon, { icon: 'ion:lock-closed-outline' }),
            key: 'lock'
          });
        }
        options.push({
          label: () => t('layout.header.dropdownItemLoginOut'),
          icon: () => h(EntIcon, { icon: 'ion:power-outline' }),
          key: 'logout'
        });
        return options;
      });

      return {
        getOptions,
        prefixCls,
        t,
        getUserInfo,
        handleSelect,
        register,
        getUseLockPage
      };
    }
  });
</script>
