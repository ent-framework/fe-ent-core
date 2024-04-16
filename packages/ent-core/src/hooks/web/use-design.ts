import { useAppProviderContext } from '../../components/app-provider';
export function useDesign(scope: string) {
  const values = useAppProviderContext();
  const prefixCls = values.prefixCls ? values.prefixCls : 'ent';
  return {
    // prefixCls: computed(() => `${values.prefixCls}-${scope}`),
    prefixCls: `${prefixCls}-${scope}`,
    prefixVar: prefixCls,
    // style,
  };
}
