import { ThemeEnum } from '../enums';
import type { ThemeSetting } from '../../store/types';

const defaultThemeSetting: ThemeSetting = {
  theme: ThemeEnum.LIGHT,
  name: 'default',
  themeOverrides: {
    common: {
      primaryColor: '#1677ff',
      successColor: '#52c41a',
      warningColor: '#faad14',
      errorColor: '#ff4d4f',
      infoColor: '#1677ff',
    },
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
        themeOverrides: {
          common: {
            primaryColor: '#51b8f1',
            successColor: '#58a732',
            warningColor: '#f0a818',
            errorColor: '#e55c5c',
            infoColor: '#d9d9d9',
          },
        },
      },
      {
        theme: ThemeEnum.LIGHT,
        name: 'Moody Sunset',
        themeOverrides: {
          common: {
            primaryColor: '#003f5c',
            successColor: '#58508d',
            warningColor: '#bc5090',
            errorColor: '#ff6361',
            infoColor: '#ffa600',
          },
        },
      },
      {
        theme: ThemeEnum.LIGHT,
        name: 'Celestial Sea',
        themeOverrides: {
          common: {
            primaryColor: '#809bce',
            successColor: '#95b8d1',
            warningColor: '#b8e0d4',
            errorColor: '#eac4d5',
            infoColor: '#d6eadf',
          },
        },
      },
    ];
  };
}
