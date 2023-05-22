import UnoCSS from 'unocss/vite';
import { presetTypography, presetUno } from 'unocss';
import type { Theme } from 'unocss/preset-uno';

const theme = {
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1600px',
  },
};

export function configUnoCSSPlugin(isLib: boolean) {
  if (isLib) {
    return UnoCSS<Theme>({
      mode: 'dist-chunk',
      presets: [presetUno({ preflight: false }), presetTypography()],
      postcss: true,
      theme,
    });
  } else {
    return UnoCSS<Theme>({
      presets: [presetUno(), presetTypography()],
      theme,
    });
  }
}
