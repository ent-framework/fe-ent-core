import { ThemeEnum } from '../enums';
import type { ThemeSetting } from '@ent-core/store/types';

const defaultThemeSetting: ThemeSetting = {
  theme: ThemeEnum.LIGHT,
  name: 'default',
  token: {
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    controlOutlineWidth: 0,
  },
};

export interface LayoutFactory {
  getDefaultThemeSetting: () => ThemeSetting;
  getThemeSettings: () => ThemeSetting[];
}

export class LayoutService implements LayoutFactory {
  getDefaultThemeSetting = () => {
    return defaultThemeSetting;
  };
  getThemeSettings = () => {
    return [
      defaultThemeSetting,
      {
        theme: ThemeEnum.LIGHT,
        name: 'Kola',
        token: {
          colorPrimary: '#51b8f1',
          colorSuccess: '#58a732',
          colorWarning: '#f0a818',
          colorError: '#e55c5c',
          colorInfo: '#d9d9d9',
          controlOutlineWidth: 0,
        },
      },
      {
        theme: ThemeEnum.LIGHT,
        name: 'Moody Sunset',
        token: {
          colorPrimary: '#003f5c',
          colorSuccess: '#58508d',
          colorWarning: '#bc5090',
          colorError: '#ff6361',
          colorInfo: '#ffa600',
          controlOutlineWidth: 0,
        },
      },
      {
        theme: ThemeEnum.LIGHT,
        name: 'Celestial Sea',
        token: {
          colorPrimary: '#809bce',
          colorSuccess: '#95b8d1',
          colorWarning: '#b8e0d4',
          colorError: '#eac4d5',
          colorInfo: '#d6eadf',
          controlOutlineWidth: 0,
        },
      },
    ];
  };
}
