import { useAppProviderContext } from '@ent-core/components/application';
export function useDesign(scope: string) {
  const values = useAppProviderContext();
  //const prefixCls = values.prefixCls ? values.prefixCls : 'vben';
  return {
    // prefixCls: computed(() => `${values.prefixCls}-${scope}`),
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
    // style,
  };
}
