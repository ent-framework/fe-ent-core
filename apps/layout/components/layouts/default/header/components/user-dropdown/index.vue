<template>
  <Dropdown placement="bottomLeft" :overlay-class-name="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <Text :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.displayName }}
        </Text>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem
          v-if="getUseLockPage"
          item-key="lock"
          :text="t('layout.header.tooltipLock')"
          icon="ion:lock-closed-outline"
        />
        <MenuItem
          item-key="logout"
          :text="t('layout.header.dropdownItemLoginOut')"
          icon="ion:power-outline"
        />
      </Menu>
    </template>
  </Dropdown>
  <LockAction @register="register" />
</template>
<script lang="ts">
  // components

  import { computed, defineComponent } from 'vue';
  import { Dropdown, Menu, Typography } from 'ant-design-vue';
  import { propTypes } from 'fe-ent-core/es/utils';
  import { useDesign, useI18n } from 'fe-ent-core/es/hooks';
  import { useModal } from 'fe-ent-core/es/components/modal';
  import { useUserStore } from 'fe-ent-core/es/store';
  import { useHeaderSetting } from '../../../../../../hooks';
  import headerImg from '../../../../../../assets/header.jpg';

  import LockAction from '../lock/lock-modal.vue';
  import MenuItem from './drop-menu-item.vue';

  type MenuEvent = 'logout' | 'lock';

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Dropdown,
      Menu,
      MenuItem,
      LockAction,
      Text: Typography.Text,
    },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
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

      function handleMenuClick(e: { key: MenuEvent }) {
        switch (e.key) {
          case 'logout':
            handleLoginOut();
            break;
          case 'lock':
            handleLock();
            break;
        }
      }

      return {
        prefixCls,
        t,
        getUserInfo,
        handleMenuClick,
        register,
        getUseLockPage,
      };
    },
  });
</script>
