<!--
 * @Author: Vben
 * @Description: logo component
-->
<template>
  <div class="anticon" :class="getAppLogoClass" @click="goHome">
    <img :src="LogoImg" />
    <div class="ml-2 truncate md:opacity-100" :class="getTitleClass" v-show="showTitle">
      {{ title }}
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, unref, defineComponent } from 'vue';
  import { useGlobSetting } from 'fe-ent-core/hooks/setting';
  import { useGo } from 'fe-ent-core/hooks/web/usePage';
  import { useMenuSetting } from 'fe-ent-core/hooks/setting/useMenuSetting';
  import { useDesign } from 'fe-ent-core/hooks/web/useDesign';
  import { PageEnum } from 'fe-ent-core/enums/pageEnum';
  import { useUserStore } from 'fe-ent-core/store/modules/user';
  import LogoImg from 'fe-ent-core/assets/images/logo.png';

  const props = {
    /**
     * The theme of the current parent component
     */
    theme: { type: String, validator: (v: string) => ['light', 'dark'].includes(v) },
    /**
     * Whether to show title
     */
    showTitle: { type: Boolean, default: true },
    /**
     * The title is also displayed when the menu is collapsed
     */
    alwaysShowTitle: { type: Boolean },
  };

  export default defineComponent({
    name: 'AppLogo',
    props,
    setup(props) {
      const { prefixCls } = useDesign('app-logo');
      const { getCollapsedShowTitle } = useMenuSetting();
      const userStore = useUserStore();
      const { title } = useGlobSetting();
      const go = useGo();

      const getAppLogoClass = computed(() => [
        prefixCls,
        props.theme,
        { 'collapsed-show-title': unref(getCollapsedShowTitle) },
      ]);

      const getTitleClass = computed(() => [
        `${prefixCls}__title`,
        {
          'xs:opacity-0': !props.alwaysShowTitle,
        },
      ]);

      function goHome() {
        go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
      }
      return {
        prefixCls,
        getCollapsedShowTitle,
        title,
        getAppLogoClass,
        getTitleClass,
        goHome,
        LogoImg,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;

    &.light {
      border-bottom: 1px solid @border-color-base;
    }

    &.collapsed-show-title {
      padding-left: 20px;
    }

    &.light &__title {
      color: @primary-color;
    }

    &.dark &__title {
      color: @white;
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
      line-height: normal;
    }
  }
</style>
