import { presetTypography, presetUno } from 'unocss';
import UnoCSS from 'unocss/vite';
import { type Plugin } from 'vite';
export function UnoCSSPlugin(): Plugin {
  return UnoCSS({ presets: [presetUno(), presetTypography()] });
}
