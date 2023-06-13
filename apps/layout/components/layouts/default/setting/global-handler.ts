import { useThemeSetting } from 'fe-ent-core/es/hooks';
import { useAppStore } from 'fe-ent-core/es/store';
import { HandlerEnum } from './enum';
import type { DeepPartial } from 'fe-ent-core/es/types';
import type { ProjectConfig } from 'fe-ent-core/es/store/types';

export function globalHandler(event: HandlerEnum, value: any) {
  const appStore = useAppStore();
  const config = handler(event, value);
  appStore.setProjectConfig(config);
}

function handler(event: HandlerEnum, value: any): DeepPartial<ProjectConfig> {
  const appStore = useAppStore();

  const { getGlobalTheme } = useThemeSetting();
  switch (event) {
    case HandlerEnum.CHANGE_THEME_TOKEN:
      return { themeSetting: value };

    case HandlerEnum.CHANGE_THEME:
      if (getGlobalTheme.value === value) {
        return {};
      }
      return {};

    // ============transition==================
    case HandlerEnum.OPEN_PAGE_LOADING:
      appStore.setPageLoading(false);
      return { transitionSetting: { openPageLoading: value } };

    case HandlerEnum.ROUTER_TRANSITION:
      return { transitionSetting: { basicTransition: value } };

    case HandlerEnum.OPEN_ROUTE_TRANSITION:
      return { transitionSetting: { enable: value } };

    case HandlerEnum.OPEN_PROGRESS:
      return { transitionSetting: { openNProgress: value } };
    // ============root==================
    default:
      return {};
  }
}
