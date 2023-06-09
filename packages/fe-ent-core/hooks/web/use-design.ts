import { useAppProviderContext } from '@ent-core/components/app-provider';
export function useDesign(scope: string) {
  const values = useAppProviderContext();
  const prefixCls = values.prefixCls ? values.prefixCls : 'vben';
  return {
    // prefixCls: computed(() => `${values.prefixCls}-${scope}`),
    prefixCls: `${prefixCls}-${scope}`,
    prefixVar: prefixCls,
    // style,
  };
}
