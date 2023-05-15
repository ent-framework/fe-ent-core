import { defineComponent, getCurrentInstance } from 'vue';
import { Empty } from 'ant-design-vue';
import { useI18n } from '@ent-core/hooks/web/use-i18n';

/**
 * 如果路由设置了组件名称，从已注册的组件中查找并显示
 * @param componentName
 */
export const wrapperRoute = (componentName: string) => {
  return defineComponent({
    name: 'RouteWrapperComponent',
    setup(pr) {
      const instance = getCurrentInstance();
      if (!instance) {
        return;
      }
      const Component = instance.appContext.components[componentName] as ReturnType<
        typeof defineComponent
      >;
      if (Component) {
        return () => {
          return <Component />;
        };
      } else {
        const { t } = useI18n();
        const description = t('layout.notFound', [componentName]);
        return () => {
          return <Empty description={description} />;
        };
      }
    },
  });
};
