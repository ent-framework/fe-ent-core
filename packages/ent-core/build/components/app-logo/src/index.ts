
  import { computed, defineComponent } from 'vue';
  import { NEl } from 'naive-ui';
  import { useDesign, useGlobSetting, useGo } from '../../../hooks';
  import { useUserStore } from '../../../store';
  import LogoImg from './logo.png';
  import type { CSSProperties } from 'vue';
  const props = {
    /**
     * 是否显示标题
     */
    showTitle: { type: Boolean, default: true },

    /**
     * 是否有背景色
     */
    noBackground: { type: Boolean, default: false }
  };

  export default defineComponent({
    name: 'EntAppLogo',
    components: { NEl },
    props,
    setup() {
      const { prefixCls } = useDesign('app-logo');
      const userStore = useUserStore();
      const { title, logoUrl, homePath } = useGlobSetting();

      const go = useGo();

      const getAppLogoClass = computed(() => [prefixCls]);

      const getTitleClass = computed(() => [`${prefixCls}__title`]);

      const getWrapStyle = computed((): CSSProperties => {
        if (!props.noBackground) {
          return {
            backgroundColor: 'var(--n-body-color)'
          };
        }

        return {};
      });
      function goHome() {
        go(userStore.getUserInfo?.homePath || homePath);
      }

      const logoImageURL = logoUrl || LogoImg;

      return {
        title,
        goHome,
        getAppLogoClass,
        getTitleClass,
        getWrapStyle,
        logoImageURL
      };
    }
  });
