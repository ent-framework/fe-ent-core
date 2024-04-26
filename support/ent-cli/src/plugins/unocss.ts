import UnoCSS from 'unocss/vite';
import { presetTypography, presetUno } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';
import type { Theme } from 'unocss/preset-uno';

const theme = {
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1600px'
  }
};

export function configUnoCSSPlugin(isLib: boolean) {
  if (isLib) {
    return UnoCSS<Theme>({
      mode: 'dist-chunk',
      inspector: true,
      postcss: true,
      presets: [presetUno({ preflight: false }), presetTypography()],
      transformers: [transformerDirectives()],
      theme
    });
  } else {
    return UnoCSS<Theme>({
      presets: [presetUno({ preflight: false }), presetTypography()],
      transformers: [transformerDirectives()],
      theme
    });
  }
}
